import { Field, FieldOptions } from '../core/Field'
import { onNextFrame } from '../core/time'
import { createSimpleButton } from '../elements/simple-button'

export const action = (
  path: string,
  options: Omit<FieldOptions, 'useLocalStorage'> = {},
) => {

  const onCreate = (field: Field<boolean>) => {
    const { div, name } = field
    div.classList.add('action')
    div.innerHTML = ''
    const { button } = createSimpleButton(div)
    button.innerHTML = name
    button.onclick = () => {
      field.setUserValue(true)
      onNextFrame(() => {
        field.setUpdateValue(false)
      })
    }
  }

  return Field.updateOrCreate<boolean>(path, onCreate, false, options)
}
