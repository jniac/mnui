import { clamp, inverseLerp } from '../math'
import { InputValueArg, resolveValueArg } from '../types'
import { Field } from '../core/Field'
import { onDrag } from '../event/drag'

type Vector = Record<string, number>

const cleanNumberInputString = (value: string) => {
  value = value.replace(/[^\d\.]/g, '')
  const dotIndex = value.indexOf('.')
  const secondDotIndex = value.indexOf('.', dotIndex + 1)
  if (secondDotIndex !== -1) {
    value = value.slice(0, secondDotIndex)
  }
  return value
}

export const vector = (path: string, valueArg: InputValueArg<Vector>, { min = -Infinity, max = Infinity, step = 1 } = {}) => {
  
  const onCreate = (field: Field<Vector>) => {
    const { div, inputDiv } = field
    const { initialValue } = resolveValueArg(valueArg)
    div.classList.add('vector')
    const keys = Object.keys(initialValue).filter(key => typeof initialValue[key] === 'number')
    const subFields = keys.map(key => {
      const id = `${field.id}-${key}`
      const subDiv = document.createElement('div')
      subDiv.classList.add('vector-property')
      subDiv.innerHTML = `
        <div class="vector-label">
          <label for="${id}">${key}</label>
        </div>
        <div class="vector-input">
          <input id="${id}" value="${initialValue[key]}">
        </div>
      `
      const label = subDiv.querySelector('.vector-label') as HTMLInputElement
      const input = subDiv.querySelector('input') as HTMLInputElement
      inputDiv.append(subDiv)
      input.oninput = () => {
        const cleanString = cleanNumberInputString(input.value)
        if (cleanString !== input.value) {
          input.value = cleanString
        }
        const subValue = clamp(Number.parseFloat(cleanString), min, max)
        const value = field.cloneValue()
        value[key] = subValue
        field.setUserValue(value)
      }
      onDrag(label, info => {
        const value = field.cloneValue()
        const delta = info.positionDelta.x * (info.shiftKey ? 10 : info.altKey ? .1 : 1) * step
        value[key] = clamp(value[key] + delta, min, max)
        field.setUserValue(value)
      })
      return { key, input }
    })
    field.init(initialValue, value => {
      for (const { key, input } of subFields) {
        input.value = value[key].toString()
      }
    })
  }
  
  return Field.updateOrCreate<Vector>(path, onCreate, valueArg)
}
