import { createElement } from '../html'

export const createSimpleButton = (parent: HTMLElement) => {
  const [div] = createElement(parent, `
    <div class="simple-button">
      <button></button>
    </div>
  `)
  const button = div.querySelector('button') as HTMLButtonElement
  return { button }
}
