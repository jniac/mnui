import { createElement } from '../core/html'

export const createSimpleInput = (parent: HTMLElement) => {
  const [div] = createElement(parent, `
    <div class="simple-input">
      <input value="0" />
    </div>
  `)
  const input = div.querySelector('input') as HTMLInputElement
  input.onfocus = () => div.classList.add('focused')
  input.onblur = () => div.classList.remove('focused')
  const update = (value: number) => {
    if (document.activeElement !== input) {
      input.value = value.toPrecision(3)
    }
  }
  return { input, update }
}