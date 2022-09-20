
export const toArray = <T>(value: ArrayLike<T>) => {
  const array = new Array(value.length) as T[]
  for (let i = 0, max = value.length; i < max; i++) {
    array[i] = value[i]
  }
  return array
}
