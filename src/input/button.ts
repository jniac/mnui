import { createDiv, divProps, frame, getUiInputDiv } from '../dom'
import { NameArg, InputResult, InputValueArg, resolveNameArg, resolveValueArg } from '../types'

type ButtonType = 'classic' | 'switch'

const create = (
  name: NameArg,
  switchOn: InputValueArg<boolean> = false,
  type: ButtonType = 'classic',
): InputResult<boolean> => {
  const { id, displayName } = resolveNameArg(name)
  let { value } = resolveValueArg(switchOn)
  const div = createDiv(id, `button ${type}`, /* html */`
    <button>${displayName}</button>
  `)
  const button = div.querySelector('button')!
  const updateValue = (newValue: boolean, { forceUpdate = false, triggerChange = false } = {}) => {
    if (value !== newValue || forceUpdate) {
      value = newValue
      div.dataset.switchState = newValue ? 'on' : 'off'
      div.classList.toggle('switch-on', newValue)
      div.classList.toggle('switch-off', !newValue)
      if (type === 'switch') {
        button.innerHTML = `${displayName} (${newValue ? 'on' : 'off'})`
      }
      if (triggerChange) {
        div.dataset.frame = frame.toString()
      }
    }
  }
  button.onclick = () => {
    const currentValue = div.dataset.switchState === 'on'
    updateValue(!currentValue, { triggerChange: true })
  }
  updateValue(value, { forceUpdate: true })
  divProps.get(div)!.updateValue = updateValue
  return { value, hasChanged: false, button }
}

export const button = (
  name: NameArg,
  valueArg?: InputValueArg<boolean>,
  type: ButtonType = valueArg === undefined ? 'classic' : 'switch',
): InputResult<boolean> => {
  const div = getUiInputDiv(name)
  if (div) {
    const button = div.querySelector('button')
    const hasChanged = Number.parseInt(div.dataset.frame ?? '0') === frame - 1
    const currentValue = div.dataset.switchState === 'on'
    const value = hasChanged ? currentValue : resolveValueArg(valueArg ?? false, currentValue).value
    divProps.get(div)!.updateValue(value)
    return { value, hasChanged, button }
  }
  return create(name, valueArg, type)
}
