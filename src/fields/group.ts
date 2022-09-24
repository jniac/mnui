import { Group } from '../core/items'

export const group = (path: string, scopeCallback: () => void) => {
  const group = Group.getOrCreate(path)
  group.within(scopeCallback)
  return group
}
