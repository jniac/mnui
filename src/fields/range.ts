import { inverseLerp } from '../math'
import { InputValueArg, resolveValueArg } from '../types'
import { Field } from '../core/Field'

export const range = (path: string, valueArg: InputValueArg<number> = 0, { min = 0, max = 1, step = 0 } = {}) => {
  
  const onCreate = (field: Field<number>) => {
    const { div, inputDiv } = field
    const { initialValue } = resolveValueArg(valueArg)
    div.classList.add('range')
    inputDiv.innerHTML = `
      <div class="range-overlay">
        <div class="track before"></div>
        <div class="thumb"></div>
        <div class="track after"></div>
      </div>
      <input type="range" step="${step === 0 ? 'any' : step}" min="${min}" max="${max}">
    `
    const input = inputDiv.querySelector('input') as HTMLInputElement
    const labelInfo = div.querySelector('.label .info') as HTMLDivElement
    field.init(initialValue, value => {
      input.value = value.toString()
      inputDiv.style.setProperty('--position', inverseLerp(min, max, value).toPrecision(4))
      labelInfo.innerHTML = `(${value.toPrecision(4)})`
    })
    input.oninput = () => {
      const value = Number.parseFloat(input.value)
      field.setUserValue(value)
    }
    labelInfo.onpointerenter = () => {
      if (field.value !== initialValue) {
        labelInfo.innerHTML = `(${initialValue.toPrecision(4)})`
      }
    }
    labelInfo.onpointerleave = () => {
      labelInfo.innerHTML = `(${field.getValue().toPrecision(4)})`
    }
    labelInfo.onclick = () => {
      field.setUserValue(initialValue)
    }
  }
  
  return Field.updateOrCreate<number>(path, onCreate, valueArg)
}
