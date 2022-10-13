
import { setCustomStyle, setAlign } from './core/root'

import { action } from './fields/action'
import { color } from './fields/color'
import { group } from './fields/group'
import { range } from './fields/range'
import { toggle } from './fields/toggle'
import { vector } from './fields/vector'
import { flipflop } from './fields/flipflop'

// NOTE: "button" here is an alias for "action".
// "button" is considered as too generic as a name, and can easily collides 
// other names, especially in CSS declaration.
import { action as button } from './fields/action'

// utils
import { onDrag } from './event/drag'
import { onFrame, onNextFrame } from './core/time'

export type { Field } from './core/Field'

export const mnui = {
  
  setCustomStyle: (...args: Parameters<typeof setCustomStyle>) => {
    setCustomStyle(...args)
    return mnui
  },
  setAlign: (...args: Parameters<typeof setAlign>) => {
    setAlign(...args)
    return mnui
  },

  action,
  button,
  color,
  range,
  group,
  toggle,
  vector,
  flipflop,

  utils: {
    onFrame,
    onNextFrame,
    onDrag,
  },
}
