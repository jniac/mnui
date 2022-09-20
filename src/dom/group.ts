import { NameArg, resolveNameArg } from '../types'
import { getUiWrapperDiv } from './elements'

const getLocalState = (): Record<string, any> => {
  const str = localStorage.getItem('ui-group')
  return str ? JSON.parse(str) : {}
}
const localState = getLocalState()
const updateLocalState = (props: any) => {
  Object.assign(localState, props)
  localStorage.setItem('ui-group', JSON.stringify(localState))
}

export let currentGroupContent: HTMLDivElement | null = null

export const createGroup = (name: NameArg) => {
  const { id, displayName } = resolveNameArg(name)
  const div = document.createElement(`div`)
  div.id = id
  div.className = `group`
  div.innerHTML = `
    <div class="name">${displayName}</div>
    <div class="contents"></div>
  `

  const collapsedKey = `${id}-collapsed`
  let collapsed = localState[collapsedKey] ?? false
  div.classList.toggle('collapsed', collapsed)

  const divName = div.querySelector('.name') as HTMLDivElement
  divName.onclick = () => {
    collapsed = !collapsed
    updateLocalState({ [collapsedKey]: collapsed })
    div.classList.toggle('collapsed', collapsed)
  }
  const parent = currentGroupContent ?? getUiWrapperDiv()
  parent.append(div)
  return div
}

export const group = (name: NameArg, callback: () => void) => {
  const { id } = resolveNameArg(name)
  const previousGroupContent = currentGroupContent
  currentGroupContent = (
    getUiWrapperDiv().querySelector(`div#${id}.group .contents`))
    ?? (createGroup(name).querySelector('.contents')) as HTMLDivElement
  callback()
  currentGroupContent = previousGroupContent
}
