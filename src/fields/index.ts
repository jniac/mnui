import { InputValueArg } from '../types'
import { Field, Group } from './items'

export const range = (path: string, value: InputValueArg<number>) => {
  return Field.getOrCreate<number>(path)
}

export const group = (path: string, scopeCallback: () => {}) => {
  const group = Group.getOrCreate(path)
  group.within(scopeCallback)
  return group
}
