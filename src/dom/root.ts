import styleCss from './style/main.css'

let root: HTMLDivElement | null = null

const createRoot = () => {
  root = document.createElement('div')
  root.id = 'mnui'
  root.className = 'root'
  document.body.appendChild(root)

  const style = document.createElement('style')
  style.innerHTML = styleCss
  style.id = 'mnui-style'
  document.head.append(style)

  return root
}

export const getOrCreateRoot = () => root ?? createRoot()
