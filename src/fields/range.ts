import { InputValueArg, resolveValueArg } from '../types'
import { Field } from '../core/Field'
import { createSlider } from '../dom/elements/slider'
import { createSimpleInput } from '../dom/elements/simple-input'

export const range = (
  path: string,
  valueArg: InputValueArg<number> = 0,
  {
    min = 0,
    max = 1,
    step = 0,
    localStorage = false,
  } = {},
) => {

  const onCreate = (field: Field<number>) => {
    const { div, inputDiv } = field
    const { initialValue } = resolveValueArg(valueArg)
    div.classList.add('range')
    const simple = createSimpleInput(inputDiv)
    const slider = createSlider(inputDiv, { min, max, step })
    simple.input.onfocus = () => inputDiv.classList.add('focused')
    simple.input.onblur = () => inputDiv.classList.remove('focused')
    simple.input.oninput = () => {
      const value = Number.parseFloat(simple.input.value)
      field.setUserValue(value)
    }
    slider.input.oninput = () => {
      const value = Number.parseFloat(slider.input.value)
      field.setUserValue(value)
    }
    field.useLocalStorage = localStorage
    field.init(initialValue, value => {
      simple.update(value)
      slider.update(value)
    })
  }

  return Field.updateOrCreate<number>(path, onCreate, valueArg)
}
