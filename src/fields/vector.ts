import { clamp } from '../math'
import { InputValueArg, resolveValueArg } from '../types'
import { Field } from '../core/Field'
import { onDrag } from '../event/drag'
import { createSimpleInputWithLabel } from '../dom/elements/simple-input-with-label'

type Vector = Record<string, number>

const identity = <T>(value: T) => value

const cleanNumberInputString = (value: string) => {
  value = value.replace(/[^\d\.]/g, '')
  const dotIndex = value.indexOf('.')
  const secondDotIndex = value.indexOf('.', dotIndex + 1)
  if (secondDotIndex !== -1) {
    value = value.slice(0, secondDotIndex)
  }
  return value
}

const resolveKeys = (keys: string[] | string) => {
  if (Array.isArray(keys)) {
    return keys
  } else {
    return keys.split(/\s*,\s*/)
  }
}

export const vector = (
  path: string, 
  valueArg: InputValueArg<Vector>, 
  { 
    min = -Infinity, 
    max = Infinity, 
    step = 1,
    keys = null as string[] | string | null,
    keyMap = {} as Record<string, string>,
    map = [identity, identity] as [(x: number) => number, (x: number) => number],
    localStorage = false,
  } = {},
) => {
  
  const onCreate = (field: Field<Vector>) => {
    const { div, inputDiv } = field
    const { initialValue } = resolveValueArg(valueArg)
    div.classList.add('vector')
    keys ??= Object.keys(initialValue).filter(key => typeof initialValue[key] === 'number')
    const subFields = resolveKeys(keys).map(key => {
      const id = `${field.id}-${key}`
      const { div: subDiv, input, label } = createSimpleInputWithLabel(inputDiv, id, keyMap[key] ?? key)
      subDiv.classList.add('vector-property')
      input.onpointerenter = () => subDiv.classList.add('hovered')
      input.onpointerleave = () => subDiv.classList.remove('hovered')
      input.onfocus = () => subDiv.classList.add('focused')
      input.onblur = () => subDiv.classList.remove('focused')
      input.oninput = () => {
        const cleanString = cleanNumberInputString(input.value)
        if (cleanString !== input.value) {
          input.value = cleanString
        }
        const subValue = clamp(map[1](Number.parseFloat(cleanString)), min, max)
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
    field.useLocalStorage = localStorage
    field.init(initialValue, value => {
      for (const { key, input } of subFields) {
        // NOTE: Do not update focused input!
        if (document.activeElement !== input) {
          input.value = map[0](value[key]).toString()
        }
      }
    })
  }
  
  return Field.updateOrCreate<Vector>(path, onCreate, valueArg)
}
