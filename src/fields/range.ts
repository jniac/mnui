import { InputValueArg, resolveValueArg } from '../types'
import { Field } from '../core/Field'
import { createSlider } from '../dom/elements/slider'
import { createSimpleInput } from '../dom/elements/simple-input'

type RangeOptions = {
  min: number
  max: number
  step: number
  localStorage: boolean
}

type RangeOptionsArg = Partial<RangeOptions> | [number, number]

const resolveRangeOptions = (arg: RangeOptionsArg) => {
  if (Array.isArray(arg)) {
    const [min, max] = arg
    arg = {
      min,
      max,
      step: 0,
      localStorage: false,
    }
  }
  const {
    min = 0,
    max = 1,
    step = 0,
    localStorage = false,
  } = arg
  return {
    min,
    max,
    step,
    localStorage,
  }
}

export const range = (
  path: string,
  valueArg: InputValueArg<number> = 0,
  options: RangeOptionsArg = {},
) => {

  const onCreate = (field: Field<number>) => {
    const {
      min,
      max,
      step,
      localStorage,
    } = resolveRangeOptions(options)
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
