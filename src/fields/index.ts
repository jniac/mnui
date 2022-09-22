import { Group } from './items'
export { range } from './range'

export const group = (path: string, scopeCallback: () => {}) => {
  const group = Group.getOrCreate(path)
  group.within(scopeCallback)
  return group
}
