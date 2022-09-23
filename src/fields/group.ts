import { Group } from '../core/items'

export const group = (path: string, scopeCallback: () => {}) => {
  const group = Group.getOrCreate(path)
  group.within(scopeCallback)
  return group
}
