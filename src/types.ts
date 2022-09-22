export type InputValueArg<T> = 
  | { value: T; initialValue?: T}
  | { initialValue: T }
  | [T, T]
  | T

export const resolveValueArg = <T>(arg: InputValueArg<T>, currentValue?: T): { value: T; initialValue: T}  => {
  if (Array.isArray(arg)) {
    const [initialValue, value] = arg
    return { value, initialValue }
  }
  if (arg && (typeof arg === 'object')) {
    if ('value' in arg) {
      const { value, initialValue = value } = arg as { value: T; initialValue?: T} 
      return { value, initialValue }
    } else {
      const { initialValue } = arg as { initialValue: T} 
      return { value: currentValue ?? initialValue, initialValue }
    }
  }
  return { value: arg, initialValue: arg }
}
