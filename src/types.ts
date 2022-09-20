
export type Identifier = { displayName: string, id: string }
export type NameArg = string | Identifier

export const resolveNameArg = (arg: NameArg): Identifier => {
  let displayName = '', id = ''
  if (typeof arg === 'string') {
    displayName = arg
    id = arg
  } else {
    displayName = arg.displayName
    id = arg.id    
  }
  id = id.replace(/\W/g, '_')
  return { displayName, id }
}

export type InputValueArg<T> = 
  | { value: T, initialValue?: T } 
  | { initialValue: T }
  | [T, T] 
  | T

export type InputResult<T> = {
  value: T
  hasChanged: boolean
  [key: string]: any
}

export const resolveValueArg = <T>(arg: InputValueArg<T>, currentValue?: T): { value: T, initialValue: T } => {
  if (Array.isArray(arg)) {
    const [initialValue, value] = arg
    return { value, initialValue }
  }
  if (arg && (typeof arg === 'object')) {
    if ('value' in arg) {
      const { value, initialValue = value } = arg as { value: T, initialValue?: T }
      return { value, initialValue }
    } else {
      const { initialValue } = arg as { initialValue: T }
      return { value: currentValue ?? initialValue, initialValue }
    }
  }
  return { value: arg, initialValue: arg }
}
