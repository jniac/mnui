import { InputValueArg, resolveValueArg } from '../types'
import { Item, Group, map, createDiv } from './items'
import { cloneValue, isEquivalent, copyValueTo } from './value'
import { getStoreItem, setStoreItem } from '../store'

let frame = 0
const frameLoop = () => {
  requestAnimationFrame(frameLoop)
  frame++
}
requestAnimationFrame(frameLoop)

export class Field<T> extends Item {

  static updateOrCreate<T>(
    partialPath: string,
    onCreate: (field: Field<T>) => void,
    valueArg: InputValueArg<T>,
  ) {
    const path = `${Group.current?.path ?? ''}/${partialPath}`
    const field = map.get(path) as Field<T>
    if (field) {
      if (field.hasChanged === false) {
        const { value } = resolveValueArg(valueArg)
        field.setValue(value, { triggerChange: false })
      }
      return field
    } else {
      const field = new Field<T>(path)
      onCreate(field)
      return field
    }
  }

  #value!: T
  #initialValueObjectRef!: T
  #isObject!: boolean
  #frame = 0
  #updateView: ((value: T) => void) = () => {}
  
  div: HTMLDivElement
  inputDiv: HTMLDivElement

  useLocalStorage = false

  constructor(path: string) {
    super(path)

    this.div = createDiv(this, 'field', `
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
  }

  getValue() { return this.#value }
  
  cloneValue() { return cloneValue(this.#value) }

  setValue(newValue: T, { triggerChange }: { triggerChange: boolean }): boolean {
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
    if (triggerChange) {
      this.#frame = frame
    }
    return true
  }

  setUserValue(newValue: T) {
    const changed = this.setValue(newValue, { triggerChange: true })
    if (this.useLocalStorage) {
      setStoreItem(`${this.id}-value`, this.#value)
    }
    return changed
  }

  getHasChanged() { return this.#frame === frame }

  init(value: T, updateView: (value: T) => void) {
    this.#value = cloneValue(value)
    this.#initialValueObjectRef = value
    this.#isObject = typeof value === 'object'
    this.#updateView = updateView
    if (this.useLocalStorage) {
      const storeValue = getStoreItem(`${this.id}-value`, this.#value)
      this.setValue(storeValue, { triggerChange: false })
    }
    updateView(this.#value!)
  }

  get frame() { return this.#frame }
  get value() { return this.cloneValue() }
  get isObject() { return this.#isObject }
  get hasChanged() { return this.getHasChanged() }
}
