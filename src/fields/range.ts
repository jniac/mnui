import { inverseLerp } from '../math'
import { InputValueArg, resolveValueArg } from '../types'
import { Field } from './items'

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
    const label = div.querySelector('.label') as HTMLDivElement
    const labelInfo = div.querySelector('.label .info') as HTMLDivElement
    const updateValue = (newValue: number) => {
      input.value = newValue.toString()
      inputDiv.style.setProperty('--position', inverseLerp(min, max, newValue).toPrecision(4))
      labelInfo.innerHTML = `(${newValue.toPrecision(4)})`
      field.setValue(newValue)
    }
    input.oninput = () => {
      updateValue(Number.parseFloat(input.value))
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
      updateValue(initialValue)
    }
    updateValue(initialValue)
  }
  return Field.getOrCreate<number>(path, onCreate)
}
