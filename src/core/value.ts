
export const isEquivalent = (a: any, b: any): boolean => {
  const typeA = typeof a
  const typeB = typeof b
  if (typeA !== typeB) {
    return false
  }
  if (typeA !== 'object') {
    return a === b
  }
  for (const key in a) {
    if (a.hasOwnProperty(key)) {
      if (isEquivalent(a[key], b[key]) === false) {
        return false
      }
    }
  }
  return true
}

export const copyValueTo = <T>(source: T, destination: T): T => {
  if (typeof source === 'object') {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        destination[key] = source[key]
      }
    }
  }
  return destination
}

export const cloneValue = <T>(value: T): T => {
  if (typeof value === 'object') {
    // @ts-ignore
    const clone = new value.constructor()
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        clone[key] = value[key]
      }
    }
    return clone
  }
  return value
}
