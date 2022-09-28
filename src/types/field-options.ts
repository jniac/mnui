
export type ValueMap = Readonly<[(x: number) => number, (x: number) => number]>

const identity = <T>(value: T) => value

export const isValueMap = (value: any): value is ValueMap => {
  return Array.isArray(value) && value.length === 2 && value.every(item => typeof item === 'function')
}

export const asValueMap = (value: any) => {
  if (isValueMap(value)) {
    return value
  }
  console.log('Oops.', value)
  throw new Error(`Invalid "map" values provided here.`)
}

export const ensureValueMap = (value: any) => {
  return asValueMap(value ?? [identity, identity])
}
