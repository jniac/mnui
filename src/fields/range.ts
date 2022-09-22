import { inverseLerp } from '../math'
import { InputValueArg, resolveValueArg } from '../types'
import { Field } from './Field'

const updateValues = new Map<Field<number>, (value: number) => void>();

export const range = (path: string, valueArg: InputValueArg<number> = 0, { min = 0, max = 1, step = 0 } = {}) => {
  
  const onCreate = (field: Field<number>) => {
    const { initialValue } = resolveValueArg(valueArg)
    const { div, inputDiv } = field
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
    const updateValue = (value: number) => {
      input.value = value.toString()
      inputDiv.style.setProperty('--position', inverseLerp(min, max, value).toPrecision(4))
      labelInfo.innerHTML = `(${value.toPrecision(4)})`
    }
    updateValues.set(field, updateValue)
    input.oninput = () => {
      const value = Number.parseFloat(input.value)
      updateValue(value)
      field.setValue(value, { triggerChange: true })
    }
    labelInfo.onpointerenter = () => {
      console.log(field.value, initialValue)
      if (field.value !== initialValue) {
        labelInfo.innerHTML = `(${initialValue.toPrecision(4)})`
      }
    }
    labelInfo.onpointerleave = () => {
      labelInfo.innerHTML = `(${field.getValue().toPrecision(4)})`
    }
    labelInfo.onclick = () => {
      updateValue(initialValue)
      field.setValue(initialValue, { triggerChange: true })
    }
    updateValue(initialValue)
    field.setValue(initialValue, { triggerChange: false })
  }
  
  const field = Field.getOrCreate<number>(path, onCreate)

  if (field.hasChanged === false) {
    const { value } = resolveValueArg(valueArg)
    if (field.setValue(value, { triggerChange: false })) {
      updateValues.get(field)!(value)
    }
  }

  return field
}
