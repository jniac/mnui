
type PotentialFunctionWrap<T> = Exclude<T, Function> | (() => T)

export type ValueArg<T> = 
  | { value: PotentialFunctionWrap<T>; initialValue?: PotentialFunctionWrap<T>}
  | { initialValue: PotentialFunctionWrap<T> }
  | [PotentialFunctionWrap<T>, PotentialFunctionWrap<T>]
  | PotentialFunctionWrap<T>
  | undefined

const unwrapPotentialFunction = <T>(value: PotentialFunctionWrap<T>): T => {
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
    return { value: unwrapPotentialFunction(value), initialValue: unwrapPotentialFunction(initialValue) }
  }

  if (valueArg && (typeof valueArg === 'object') && valueArg.constructor === Object) {
    if ('value' in valueArg) {
      const { value, initialValue = value } = valueArg as { value: PotentialFunctionWrap<T>; initialValue?: PotentialFunctionWrap<T> } 
      return { value: unwrapPotentialFunction(value), initialValue: unwrapPotentialFunction(initialValue) }
    } else if ('initialValue' in valueArg) {
      const { initialValue } = valueArg as { initialValue: PotentialFunctionWrap<T> } 
      return { value: currentValue ?? unwrapPotentialFunction(initialValue), initialValue: unwrapPotentialFunction(initialValue) }
    }
  }

  const unwrapped = unwrapPotentialFunction((valueArg ?? currentValue ?? 0) as PotentialFunctionWrap<T>)
  return { value: unwrapped, initialValue: unwrapped }
}
