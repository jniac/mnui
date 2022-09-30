import { getMainCss } from '../style/main.css'

let root: HTMLDivElement | null = null
let customCss = ''

const rootProps = {
  alignRight: false,
  alignBottom: false,
}
const applyRootProps = () => {
  if (root) {
    root.classList.toggle('align-right', rootProps.alignRight)
    root.classList.toggle('align-bottom', rootProps.alignBottom)
  }
}

const createRoot = () => {
  root = document.createElement('div')
  root.id = 'mnui'
  root.className = 'root'
  document.body.appendChild(root)
  applyRootProps()

  const style = document.createElement('style')
  style.innerHTML = getMainCss(customCss)
  style.id = 'mnui-style'
  document.head.prepend(style)

  return root
}

export const getOrCreateRoot = () => root ?? createRoot()

export const setCustomStyle = (customStyle: string) => {
  customCss = customStyle
  const style = document.head.querySelector('#mnui-style')
  if (style) {
    style.innerHTML = getMainCss(customCss)
  }
}

export const setAlign = ({
  vertical = 'top' as 'top' | 'bottom',
  horizontal = 'left' as 'left' | 'right',
}) => {
  rootProps.alignRight = horizontal === 'right'
  rootProps.alignBottom = vertical === 'bottom'
  applyRootProps()
}

const destroyRoot = () => {
  if (root) {
    root.remove()
    document.head.querySelector('#mnui-style')?.remove()
    root = null
  }
}

export const destroyRootIfEmpty = () => {
  if (root) {
    if (root.childElementCount === 0) {
      destroyRoot()
    }
  }
}
