
const div = document.createElement('div')

export const createElement = <T extends HTMLElement = HTMLElement>(parent: HTMLElement, html: string) => {
  div.innerHTML = html
  const children: T[] = []
  while (div.firstElementChild) {
    const child = div.firstElementChild
    parent.append(child)
    children.push(child as T)
  }
  return children
}
