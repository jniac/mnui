import { createElement } from '../core/html'
import { createSimpleInput } from './simple-input'

export const createSimpleInputWithLabel = (
  parent: HTMLElement, 
  id: string, 
  label: string,
) => {
  const [div] = createElement(parent, `
    <div class="simple-input-with-label">
      <div class="label">
        <label for="${id}">${label}</label>
      </div>
    </div>
  `)
  const { input, update } = createSimpleInput(div)
  input.id = id
  return { 
    div, 
    input,
    label: div.querySelector('.label') as HTMLDivElement, 
    update,
  }
}
