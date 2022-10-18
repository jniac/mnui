import { ensureValueMap, resolveValueArg, ValueArg, ValueMap } from '../types'
import { Field, FieldOptions } from '../core/Field'
import { createSlider } from '../elements/slider'
import { createSimpleInput } from '../elements/simple-input'
import { onDrag } from '../event/drag'

type RangeOptions = FieldOptions & {
  min: number
  max: number
  step: number
  map: ValueMap
}

type RangeOptionsArg = Partial<RangeOptions> | [number, number]

const resolveRangeOptions = (arg: RangeOptionsArg) => {
  if (Array.isArray(arg)) {
    const [min, max] = arg
    arg = {
      min,
      max,
      step: 0,
    }
  }
  const {
    min = 0,
    max = 1,
    step = 0,
    ...props
  } = arg
  return {
    min,
    max,
    step,
    ...props
  }
}

export const range = (
  path: string,
  valueArg: ValueArg<number> = undefined,
  optionsArg: RangeOptionsArg = {},
) => {
  const options = resolveRangeOptions(optionsArg)
  const onCreate = (field: Field<number>) => {
    const {
      min,
      max,
      step,
      map,
    } = options
    const [mapFromSrc, mapFromDst] = ensureValueMap(map)
    const { div, inputDiv } = field
    const { initialValue } = resolveValueArg(valueArg)
    div.classList.add('range')
    const simple = createSimpleInput(inputDiv)
    const slider = createSlider(inputDiv, { min, max, step })
    simple.input.onfocus = () => inputDiv.classList.add('focused')
    simple.input.onblur = () => inputDiv.classList.remove('focused')
    simple.input.oninput = () => {
      const value = Number.parseFloat(simple.input.value)
      field.setUserValue(mapFromDst(value))
    }
    let sliderOnInputValue = NaN
    slider.input.oninput = () => {
      sliderOnInputValue = Number.parseFloat(slider.input.value)
    }
    onDrag(slider.input, () => {
      if (Number.isFinite(sliderOnInputValue)) {
        field.setUserValue(sliderOnInputValue)
      }
    })
    field.init(initialValue, value => {
      simple.update(mapFromSrc(value))
      slider.update(value)
    })
  }

  return Field.updateOrCreate<number>(path, onCreate, valueArg, options)
}
