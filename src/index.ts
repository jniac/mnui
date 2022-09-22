import { range } from './fields/range'
import { button } from './fields/button'
import { buttons } from './fields/buttons'
import { group, setStyle } from './dom'

export const mnui = {
  setStyle: (value: Parameters<typeof setStyle>[0]) => {
    setStyle(value)
    return mnui as typeof mnui
  },
  range,
  button,
  buttons,
  group,
}
