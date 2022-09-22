import { getOrCreateRoot } from '../dom/root'
import { getStoreItem, setStoreItem } from '../store'

const map = new Map<string, Item>()
const idMap = new Map<string, Item>()

const getIncrementalId = (id: string) => {
  let count = 1
  let incremetalId = ''
  do {
    incremetalId = `${id}_${count}`
    count++
  } while (idMap.has(incremetalId))
  return incremetalId
}

const getNewId = (path: string) => {
  const baseId = path.normalize('NFKC').replace(/\W/g, '_')
  return idMap.has(baseId) ? getIncrementalId(baseId) : baseId
}

class Item {
  #id: string
  get id() { return this.#id }

  #path: string
  get path() { return this.#path }

  #name: string
  get name() { return this.#name }

  #parent: Group | null
  get parent() { return this.#parent }

  constructor(path: string) {
    this.#path = path
    this.#parent = ensureParent(path)
    this.#name = this.#path.split('/').pop()!
    this.#id = getNewId(this.#path)
    map.set(this.#path, this)
    idMap.set(this.#id, this)
  }

  *allParents() {
    let item = this.#parent
    while (item) {
      yield item
      item = item.parent
    }
  }
}

const ensureParent = (path: string) => {
  const tokens = path.substring(1).split('/').slice(0, -1)
  let group = Group.current
  let currentPath = ''
  for (const token of tokens) {
    currentPath += `/${token}`
    const existingGroup = map.get(currentPath)
    if (existingGroup && existingGroup instanceof Group === false) {
      throw new Error(`Invalid group path: "${currentPath}" (${existingGroup.constructor.name}).\nCannot create "${path}"`)
    }
    group = existingGroup as Group ?? new Group(currentPath)
  }
  return group
}

const createDiv = (item: Item, className: string, html: string) => {
  const div = document.createElement('div')
  div.id = item.id
  div.className = className
  div.innerHTML = html
  const parent = item.parent?.contentDiv ?? getOrCreateRoot()
  parent.append(div)
  return div
}

export class Group extends Item {

  static getOrCreate(partialPath: string) {
    const path = `${Group.current?.path ?? ''}/${partialPath}`
    return map.get(path) as Group ?? new Group(path)
  }

  static #previous: Group | null = null
  static current: Group | null = null

  within(callback: () => void) {
    Group.#previous = Group.current
    Group.current = this
    callback()
    Group.current = Group.#previous
  }

  div: HTMLDivElement
  contentDiv: HTMLDivElement

  constructor(path: string) {
    super(path)
    
    this.div = createDiv(this, 'group', `
      <div class="label">
        <span>${this.name}</span>
      </div>
      <div class="content"></div>
    `)

    this.div.classList.toggle('collapsed', getStoreItem(`collapsed-${this.path}`, false))

    const label = this.div.querySelector('.label') as HTMLDivElement
    label.onclick = () => {
      this.div.classList.toggle('collapsed')
      setStoreItem(`collapsed-${this.path}`, this.div.classList.contains('collapsed'))
    }

    this.contentDiv = this.div.querySelector('.content') as HTMLDivElement
  }
}

export class Field<T> extends Item {

  static getOrCreate<T>(partialPath: string, onCreate: (field: Field<T>) => void) {
    const path = `${Group.current?.path ?? ''}/${partialPath}`
    const field = map.get(path) as Field<T>
    if (field) {
      return field
    } else {
      const field = new Field(path)
      onCreate(field)
      return field
    }
  }

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
  setValue(newValue: T) {
    this.#value = newValue
  }
  get value() { return this.getValue() }
}
