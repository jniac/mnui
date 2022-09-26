import { Field } from '../core/Field'
import { nextFrameAdd } from '../core/time'
import { createSimpleButton } from '../dom/elements/simple-button'

export const action = (
  path: string,
) => {

  const onCreate = (field: Field<boolean>) => {
    const { div, name } = field
    div.classList.add('action')
    div.innerHTML = ''
    const { button } = createSimpleButton(div)
    button.innerHTML = name
    button.onclick = () => {
      field.setUserValue(true)
      nextFrameAdd(() => {
        field.setValue(false, {
          triggerUserChange: false,
        })
      })
    }
  }

  return Field.updateOrCreate<boolean>(path, onCreate, false, false)
}
