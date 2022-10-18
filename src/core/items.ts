import { destroyRootIfEmpty, getOrCreateRoot } from './root'
import { getStoreItem, setStoreItem } from '../store'

export const map = new Map<string, Item>()
const idMap = new Map<string, Item>()

const cleanPath = (str: string) => {
  return str
    .replace(/^\/+/, '')
    .replace(/\/+$/, '')
    .replace(/\/{2,}/, '/')
}

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

let itemCount = 0
const SECURITY_MAX_ITEM_COUNT = 200

export class Item {
  #id: string
  get id() { return this.#id }

  #path: string
  get path() { return this.#path }

  #name: string
  get name() { return this.#name }

  #parent: Group | null
  get parent() { return this.#parent }

  #children: Item[] = [];
  *children() { yield* this.#children }

  #destroyed = false
  get destroyed() { return this.#destroyed }
  destroy: () => void
  #onDestroySet = new Set<() => void>()
  onDestroy(callback: () => void) {
    this.#onDestroySet.add(callback)
  }

  constructor(path: string) {
    this.#path = '/' + cleanPath(path)
    this.#parent = ensureParent(this.#path)
    if (this.#parent) {
      this.#parent!.#children.push(this)
    }
    this.#name = this.#path.split('/').pop()!
    this.#id = getNewId(this.#path)
    map.set(this.#path, this)
    idMap.set(this.#id, this)

    itemCount++

    if (itemCount > SECURITY_MAX_ITEM_COUNT) {
      throw new Error(`Too many instances (> ${SECURITY_MAX_ITEM_COUNT}) of Item (group/field). Something is probably wrong.`)
    }

    // NOTE: destroy has to be binded to 'this'
    this.destroy = () => {
      if (this.#destroyed === false) {
        const parent = this.#parent
        const isRootChild = parent === null
        this.#destroyed = true
        for (const callback of this.#onDestroySet) {
          callback()
        }
        for (const child of this.#children) {
          child.destroy()
        }
        this.#parent = null
        this.#children = []
        map.delete(this.#path)
        idMap.delete(this.#id)

        itemCount--

        if (isRootChild) {
          destroyRootIfEmpty()
        } else {
          parent.#removeDestroyedChild(this)
        }
      }
    }
  }

  #removeDestroyedChild(child: Item) {
    this.#children.splice(this.#children.indexOf(child), 1)
    if (this.#children.length === 0) {
      // NOTE: Unnecessary check, since destroy() already does the same check, 
      // but still there to remind that here the "item" could already be destroyed
      // (the parent destroying its children).
      if (this.#destroyed === false) {
        this.destroy()
      }
    }
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

export const createDiv = (item: Item, className: string, html: string) => {
  const div = document.createElement('div')
  div.id = item.id
  div.className = className
  div.innerHTML = html
  const parent = item.parent?.contentDiv ?? getOrCreateRoot()
  parent.append(div)
  return div
}





let current: Group | null = null
export class Group extends Item {

  static getOrCreate(partialPath: string) {
    const path = `${Group.current?.path ?? ''}/${partialPath}`
    return map.get(path) as Group ?? new Group(path)
  }

  static get current() { return current }

  within(callback: () => void) {
    const previous = current
    current = this
    callback()
    current = previous
  }

  div: HTMLDivElement
  contentDiv: HTMLDivElement

  constructor(path: string) {
    super(path)

    this.div = createDiv(this, 'item group', `
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

    this.onDestroy(() => {
      this.div.remove()
    })
  }
}


