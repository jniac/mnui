import { Field } from '../core/Field'
import { createSimpleButton } from '../dom/elements/simple-button'
import { InputValueArg, resolveValueArg } from '../types'

export const flipflop = (
  path: string,
  valueArg: InputValueArg<boolean> = { initialValue: false }
) => {

  const onCreate = (field: Field<boolean>) => {
    const { initialValue } = resolveValueArg(valueArg)
    const { div, name } = field
    div.classList.add('flipflop')
    div.innerHTML = ''
    const [name1, name2] = name.split(':')
    const { button } = createSimpleButton(div)
    button.onclick = () => {
      field.setUserValue(!field.value)
    }
    field.init(initialValue, value => {
      button.innerHTML = value ? name2 : name1
    })
  }

  return Field.updateOrCreate<boolean>(path, onCreate, valueArg)
}
