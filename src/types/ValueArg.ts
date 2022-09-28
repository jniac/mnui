
type Wrap<T> = Exclude<T, Function> | (() => T)

export type ValueArg<T> = 
  | { value: Wrap<T>; initialValue?: Wrap<T>}
  | { initialValue: Wrap<T> }
  | [Wrap<T>, Wrap<T>]
  | Wrap<T>

const unwrap = <T>(value: Wrap<T>): T => {
  const result = typeof value === 'function' 
    ? (value as () => T)() 
    : value

  if (typeof result === 'function') {
    throw new Error(`Value could not be a function once resolved.`)
  }

  return result
}

/**
 * Wow, this is trick. Since any value (the current value, or the initial one) could 
 * be a function (getter) instead of a plain value (primitive or object with constructor 
 * (eg. Vector3)), we have here to carefully unwrap any resolved value declaration.
 * 
 * This is not very legible.
 */
export const resolveValueArg = <T>(valueArg: ValueArg<T>, currentValue?: T): { value: T; initialValue: T }  => {
  if (Array.isArray(valueArg)) {
    const [initialValue, value] = valueArg
    return { value: unwrap(value), initialValue: unwrap(initialValue) }
  }

  if (valueArg && (typeof valueArg === 'object') && valueArg.constructor === Object) {
    if ('value' in valueArg) {
      const { value, initialValue = value } = valueArg as { value: Wrap<T>; initialValue?: Wrap<T> } 
      return { value: unwrap(value), initialValue: unwrap(initialValue) }
    } else if ('initialValue' in valueArg) {
      const { initialValue } = valueArg as { initialValue: Wrap<T> } 
      return { value: currentValue ?? unwrap(initialValue), initialValue: unwrap(initialValue) }
    }
  }

  const unwrapped = unwrap(valueArg as Wrap<T>)
  return { value: unwrapped, initialValue: unwrapped }
}
