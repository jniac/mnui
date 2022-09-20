import { mnui } from '../../dist/index.js'

mnui.setStyle({
  root: {
    justifyContent: 'flex-end',
  },
})

mnui.group('hey', () => {
  mnui.button('hi', { initialValue: true }, 'switch')
  mnui.range('value', { initialValue: 3 }, [0, 10])
})
