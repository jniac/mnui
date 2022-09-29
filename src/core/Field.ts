import { resolveValueArg, ValueArg } from '../types'
import { Item, Group, map, createDiv } from './items'
import { cloneValue, isEquivalent, copyValueTo } from './value'
import { getStoreItem, setStoreItem } from '../store'
import { frame } from './time'

type Callback<T> = (value: T, field: Field<T>) => void

const defaultFieldOptions   = {
  order: 0,
  useLocalStorage: false,
  ignoreUserNaN: true,
  userEpsilon: 1e-9,
}

export type FieldOptions = typeof defaultFieldOptions

export class Field<T> extends Item implements FieldOptions {

  static updateOrCreate<T>(
    partialPath: string,
    onCreate: (field: Field<T>) => void,
    valueArg: ValueArg<T>,
    options: Partial<FieldOptions> = {},
  ) {
    const path = `${Group.current?.path ?? ''}/${partialPath}`
    const field = map.get(path) as Field<T>
    if (field) {
      field.applyOptions(options)
      if (field.hasChanged === false) {
        const { value } = resolveValueArg(valueArg, field.value)
        field.setValue(value, { triggerUserChange: false })
      }
      return field
    } else {
      const field = new Field<T>(path)
      field.applyOptions(options)
      onCreate(field)
      return field
    }
  }

  #value!: T
  #initialValueObjectRef!: T
  #isObject!: boolean
  #frame = -1
  #updateView: ((value: T) => void) = () => {}
  #onUserChangeSet = new Set<Callback<T>>()
  
  div: HTMLDivElement
  inputDiv: HTMLDivElement

  order = defaultFieldOptions.order
  useLocalStorage = defaultFieldOptions.useLocalStorage
  ignoreUserNaN = defaultFieldOptions.ignoreUserNaN
  userEpsilon = defaultFieldOptions.userEpsilon

  constructor(path: string) {
    super(path)

    this.div = createDiv(this, 'item field', `
      <div class="label">
        <span class="name">${this.name}</span>
        <span class="info"></span>
      </div>
      <div class="input"></div>
    `)

    const labelName = this.div.querySelector('.label .name') as HTMLDivElement
    labelName.onpointerenter = () => {
      this.div.classList.add('field-focus')
      for (const parent of this.allParents()) {
        parent.div.classList.add('field-focus')
      }
    }
    labelName.onpointerleave = () => {
      this.div.classList.remove('field-focus')
      for (const parent of this.allParents()) {
        parent.div.classList.remove('field-focus')
      }
    }

    const inputDiv = this.div.querySelector('.input') as HTMLDivElement
    inputDiv.onpointerenter = () => {
      inputDiv.classList.add('hovered')
    }
    inputDiv.onpointerleave = () => {
      inputDiv.classList.remove('hovered')
    }
    this.inputDiv = inputDiv

    this.onDestroy(() => {
      this.div.remove()
    })
  }

  applyOptions(options: Partial<FieldOptions>) {
    Object.assign(this, options)
    this.div.style.setProperty('order', this.order.toString())
  }

  getValue() { return this.#value }
  
  cloneValue() { return cloneValue(this.#value) }

  setValue(newValue: T, { triggerUserChange }: { triggerUserChange: boolean }): boolean {
    if (isEquivalent(newValue, this.#value)) {
      return false
    }
    if (this.#isObject) {
      // If value is an object, update the original value reference:
      copyValueTo(newValue, this.#value)
      copyValueTo(newValue, this.#initialValueObjectRef)
    } else {
      this.#value = newValue
    }
    this.#updateView(this.#value)
    if (triggerUserChange) {
      this.#frame = frame
      for (const callback of this.#onUserChangeSet) {
        callback(this.#value, this)
      }
    }
    return true
  }

  /**
   * Sets the new value from the user interaction. Since the user has interracted
   * (and the new value is different from the current one) the field will trigger 
   * change callbacks (and will store to the local storage, if relevant).
   * 
   * Also here some filters can be applied: based on some options ("ignoreUserNaN", 
   * "userEpsilon" etc.) the user value can be ignored.
   */
  setUserValue(newValue: T) {
    if (typeof newValue === 'number') {
      if (this.ignoreUserNaN && Number.isNaN(newValue)) {
        return false
      }
      if (Math.abs(newValue - (this.value as number)) < this.userEpsilon) {
        return false
      }
    }
    const changed = this.setValue(newValue, { triggerUserChange: true })
    if (this.useLocalStorage) {
      setStoreItem(`${this.id}-value`, this.#value)
    }
    return changed
  }

  /**
   * Sets the program current value. The user is not behind the new value. 
   * Change callbacks must not be called (neither the local storage option).
   */
  setUpdateValue(newValue: T) {
    return this.setValue(newValue, { triggerUserChange: false })
  }

  getHasChanged() {
    const delta = frame - this.#frame
    return delta <= 1
  }

  init(value: T, updateView: (value: T) => void) {
    this.#value = cloneValue(value)
    this.#initialValueObjectRef = value
    this.#isObject = typeof value === 'object'
    this.#updateView = updateView
    if (this.useLocalStorage) {
      const storeValue = getStoreItem(`${this.id}-value`, this.#value)
      this.setValue(storeValue, { triggerUserChange: false })
    }
    updateView(this.#value!)
  }

  onUserChange(callback: Callback<T>) {
    this.#onUserChangeSet.add(callback)
    return this
  }

  get frame() { return this.#frame }
  get value() { return this.cloneValue() }
  get isObject() { return this.#isObject }
  get hasChanged() { return this.getHasChanged() }
}
