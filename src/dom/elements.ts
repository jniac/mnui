import { NameArg, resolveNameArg } from '../types'
import { currentGroupContent } from './group'

type DivProps = {
  updateValue: (value: any) => void,
}

const noop = () => {}
export const divProps = new Map<HTMLDivElement, DivProps>()

const createUiDiv = () => {
  const div = document.createElement(`div`)
  div.id = `mnui`
  div.innerHTML = `<div class="wrapper"></div>`
  document.body.append(div)
  return div
}

export const getUiRootDiv = () => {
  return (
    document.querySelector(`#mnui`) 
    ?? createUiDiv()
  ) as HTMLDivElement
}

export const getUiWrapperDiv = () => {
  return getUiRootDiv().querySelector(`.wrapper`) as HTMLDivElement
}

export const getUiInputDiv = (name: NameArg) => {
  const { id } = resolveNameArg(name)
  return getUiWrapperDiv().querySelector(`#${id}`) as HTMLDivElement
}

export const setStyle = ({
  root,
}: Partial<{
  root: Partial<CSSStyleDeclaration>
}> = {}) => {
  if (root) {
    Object.assign(getUiRootDiv().style, root)
  }
}

export const createDiv = (id: string, className: string, innerHTML: string) => {
  const div = document.createElement(`div`)
  div.id = id
  div.className = `input ${className}`
  div.innerHTML = innerHTML
  const parent = currentGroupContent ?? getUiWrapperDiv()
  parent.append(div)
  divProps.set(div, { updateValue: noop })
  return div
}


