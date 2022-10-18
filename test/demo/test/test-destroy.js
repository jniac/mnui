import { mnui } from '../src/mnui.js'

mnui.range('fifou/lol/cube/scale')
mnui.button('fifou/lol/cube/destroy').onUserChange(() => {
  mnui.range('fifou/lol/cube/scale').destroy()
  mnui.button('fifou/lol/cube/destroy').destroy()
})
