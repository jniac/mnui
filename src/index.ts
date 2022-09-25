
import { setCustomStyle } from './dom/root'

import { action } from './fields/action'
import { action as button } from './fields/action'
import { group } from './fields/group'
import { range } from './fields/range'
import { toggle } from './fields/toggle'
import { vector } from './fields/vector'
import { flipflop } from './fields/flipflop'

// NOTE: "button" here is an alias for "action".
// "button" is considered as too generic as a name, and can easily collides 
// other names, especially in CSS declaration.

export const mnui = {
  setCustomStyle,

  action,
  button,
  range,
  group,
  toggle,
  vector,
  flipflop,
}
