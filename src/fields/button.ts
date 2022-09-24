import { Field } from '../core/Field'

export const button = (
  path: string,
) => {

  const onCreate = (field: Field<boolean>) => {
    const { div, name } = field
    div.classList.add('button')
    div.innerHTML = `
      <div>
        <button>${name}</button>
      </div>
    `
    const button = div.querySelector('button') as HTMLButtonElement
    button.onclick = () => {
      field.setUserValue(!field.value)
    }
  }

  return Field.updateOrCreate<boolean>(path, onCreate, false)
}
