import { InputValueArg, resolveValueArg } from '../types'
import { Field } from './Field'

const getSvg = ({
  width = 32,
  height = 16,
} = {}) => {
  return `
    <div class="toggle-overlay">
      <svg width="${width}" height="${height}">
        <mask id="mask">
          <rect width="${width}" height="${height}" fill="white" />
          <circle cx="${height / 2}" cy="${height / 2}" r="${height / 2 - 1}" fill="black" />
        </mask>
        <rect width="${width}" height="${height}" rx="${height / 2}" mask="url(#mask)" />
      </svg>
    </div>
  `
}

export const toggle = (path: string, valueArg: InputValueArg<boolean> = true) => {

  const onCreate = (field: Field<boolean>) => {
    const { div, inputDiv } = field
    const { initialValue } = resolveValueArg(valueArg)
    const width = 24, height = 14
    div.classList.add('toggle')
    inputDiv.innerHTML = `
      ${getSvg({ width, height })}
      <input type="checkbox">
    `
    const svg = inputDiv.querySelector('svg') as SVGSVGElement
    const circle = inputDiv.querySelector('svg circle') as SVGCircleElement
    field.init(initialValue, value => {
      svg.style.opacity = value ? '1' : '.5'
      circle.setAttributeNS(null, 'cx', (value ? width - height / 2 : height / 2).toString())
    })
    inputDiv.onclick = () => {
      field.setValue(!field.value, { triggerChange: true })
    }
  }

  return Field.updateOrCreate<boolean>(path, onCreate, valueArg)
}
