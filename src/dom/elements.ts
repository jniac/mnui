import { NameArg, resolveNameArg } from '../types'
import { frame } from './frame'

export let currentGroupContents: HTMLDivElement | null = null
export const setCurrentGroupContents = (value: HTMLDivElement | null) => {
  currentGroupContents = value
}

type FieldProps = {
  updateValue: (value: any) => void,
}

const noop = () => {}

export const fieldProps = new Map<HTMLDivElement, FieldProps>()

const createRoot = () => {
  const div = document.createElement(`div`)
  div.id = `mnui`
  div.innerHTML = `<div class="wrapper"></div>`
  document.body.append(div)
  return div
}

export const getRoot = () => {
  return (
    document.querySelector(`#mnui`) 
    ?? createRoot()
  ) as HTMLDivElement
}

export const getWrapper = () => {
  return getRoot().querySelector(`.wrapper`) as HTMLDivElement
}

export const getField = (name: NameArg) => {
  const { id } = resolveNameArg(name)
  return getWrapper().querySelector(`#${id}.field`) as HTMLDivElement
}

export const setStyle = ({
  root,
}: Partial<{
  root: Partial<CSSStyleDeclaration>
}> = {}) => {
  if (root) {
    const rootStyle = getRoot().style
    for (const key in root) {
      if (key.startsWith('--')) {
        rootStyle.setProperty(key, root[key]!)
      } else {
        rootStyle[key] = root[key]!
      }
    }
  }
}

export const createField = (id: string, className: string, innerHTML: string) => {
  const div = document.createElement(`div`)
  div.id = id
  div.className = `field ${className}`
  div.innerHTML = innerHTML
  const parent = currentGroupContents ?? getWrapper()
  parent.append(div)
  fieldProps.set(div, { updateValue: noop })
  return div
}

export const fieldHasChanged = (div: HTMLDivElement) => {
  // NOTE: one frame delay is allowed here, since we don't know which "animation frame"
  // will be called first (the one from mnui, or the app using mnui).
  return frame - Number.parseInt(div.dataset.frame ?? '0') <= 1
}


