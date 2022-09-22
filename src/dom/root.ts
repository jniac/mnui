import { mainCss } from './style/main.css'

let root: HTMLDivElement | null = null

const createRoot = () => {
  root = document.createElement('div')
  root.id = 'mnui'
  root.className = 'root'
  document.body.appendChild(root)

  const style = document.createElement('style')
  style.innerHTML = mainCss
  style.id = 'mnui-style'
  document.head.prepend(style)

  return root
}

export const getOrCreateRoot = () => root ?? createRoot()
