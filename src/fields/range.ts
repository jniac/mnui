import { fieldProps, frame, createField, getField, fieldHasChanged } from '../dom'
import { resolveValueArg, InputResult, InputValueArg, resolveNameArg, NameArg } from '../types'

type Step = number | 'any'

type Props = Partial<{ min: number, max: number, step: Step, decimals: number }>

type PropsArg = Props | [number, number, Step?, number?]

const resolvePropsArg = (arg: PropsArg = {}): Required<Props> => {
  if (Array.isArray(arg)) {
    const [min, max, step, decimals] = arg
    return resolvePropsArg({ min, max, step, decimals })
  }
  const {
    min = 0,
    max = 1,
    step = 'any',
    decimals = 2
  } = arg
  return {
    min,
    max,
    step,
    decimals,
  }
}

const create = (
  name: NameArg, 
  valueArg: InputValueArg<number>, 
  props?: PropsArg,
): InputResult<number> => {
  const { id, displayName } = resolveNameArg(name)
  const { value, initialValue } = resolveValueArg(valueArg)
  const { min, max, step, decimals } = resolvePropsArg(props)
  const format = (n: number) => n.toFixed(decimals)
  const div = createField(id, 'range', /* html */`
    <div class="label">
      <div class="name">${displayName}</div>
      <div class="value">(${format(value)})</div>
    </div>
    <div class="input">
      <input type="range" min="${min}" max="${max}" step="${step}" value="${value}"></input>
    </div>
  `)
  div.dataset.frame = frame.toString()
  const input = div.querySelector('input')!
  const nameDiv = div.querySelector('.name') as HTMLDivElement
  const valueDiv = div.querySelector('.value') as HTMLDivElement
  const updateValue = (value: number, { triggerChange = false } = {}) => {
    input.value = value.toString()
    valueDiv.innerHTML = format(value)
    if (triggerChange) {
      div.dataset.frame = frame.toString()
    }
  }
  input.oninput = () => {
    const value = Number.parseFloat(input.value)
    updateValue(value, { triggerChange: true })
  }
  nameDiv.onclick = () => {
    updateValue(initialValue, { triggerChange: true })
  }
  fieldProps.get(div)!.updateValue = updateValue
  
  return { value, hasChanged: false, input }
}

export const range = (
  name: string, 
  valueArg: InputValueArg<number>, 
  props: PropsArg = {},
 ): InputResult<number> => {
  const div = getField(name)
  if (div) {
    const input = div.querySelector('input')!
    const hasChanged = fieldHasChanged(div)
    const currentValue = Number.parseFloat(input.value)
    const value = hasChanged ? currentValue : resolveValueArg(valueArg, currentValue).value
    fieldProps.get(div)!.updateValue(value)
    return { input, value, hasChanged }
  }
  return create(name, valueArg, props)
}