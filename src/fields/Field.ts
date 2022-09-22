import { InputValueArg, resolveValueArg } from '../types'
import { Item, Group, map, createDiv } from './items'

let frame = 0
const frameLoop = () => {
  requestAnimationFrame(frameLoop)
  frame++
}
requestAnimationFrame(frameLoop)

const isEquivalent = (a: any, b: any): boolean => {
  const typeA = typeof a
  const typeB = typeof b
  if (typeA !== typeB) {
    return false
  }
  if (typeA !== 'object') {
    return a === b
  }
  for (const key of Object.keys(a)) {
    if (isEquivalent(a[key], b[key]) === false) {
      return false
    }
  }
  return true
}

const cloneValue = <T>(value: T): T => {
  if (typeof value === 'object') {
    // @ts-ignore
    const clone = new value.constructor()
    for (const key in value) {
      clone[key] = value[key]
    }
    return clone
  }
  return value
}

const noop = () => {}

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

  #frame = 0
  get frame() { return this.#frame }

  div: HTMLDivElement
  inputDiv: HTMLDivElement

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

    this.inputDiv = this.div.querySelector('.input') as HTMLDivElement
  }

  #value?: T
  getValue() { return this.#value as T }
  setValue(newValue: T, { triggerChange }: { triggerChange: boolean }): boolean {
    if (isEquivalent(newValue, this.#value)) {
      return false
    }
    this.#value = cloneValue(newValue)
    this.#updateView(this.#value)
    if (triggerChange) {
      this.#frame = frame
    }
    return true
  }
  get value() { return this.getValue() }

  getHasChanged() { return this.#frame === frame }
  get hasChanged() { return this.getHasChanged() }

  #updateView: (value: T) => void = noop
  init(value: T, updateView: (value: T) => void) {
    this.#value = value
    this.#updateView = updateView
    updateView(this.#value!)
  }
}
