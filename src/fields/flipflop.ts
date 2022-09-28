import { Field, FieldOptions } from '../core/Field'
import { createSimpleButton } from '../elements/simple-button'
import { ValueArg, resolveValueArg } from '../types'

const resolveNames = (str: string) => {
  const tokens = str.split(':')
  switch (tokens.length) {
    case 2: return tokens
    case 1: return [`${str} (off)`, `${str} (on)`]
    default: return ['oops', 'oops']
  }
}

export const flipflop = (
  path: string,
  valueArg: ValueArg<boolean> = { initialValue: false },
  options: FieldOptions = {},
) => {

  const onCreate = (field: Field<boolean>) => {
    const { initialValue } = resolveValueArg(valueArg)
    const { div, name } = field
    div.classList.add('flipflop')
    div.innerHTML = ''
    const [name1, name2] = resolveNames(name)
    const { button } = createSimpleButton(div)
    button.onclick = () => {
      field.setUserValue(!field.value)
    }
    field.init(initialValue, value => {
      button.innerHTML = value ? name2 : name1
    })
  }

  return Field.updateOrCreate<boolean>(path, onCreate, valueArg, options)
}
