import { mnui } from '../../dist/index.js'

mnui.setStyle({
  root: {
    justifyContent: 'flex-end',
  },
})

const someState = { x: 5 }

const render = () => {

  mnui.group('My Component', () => {
    const active = mnui.button('active', { initialValue: true }, 'switch').value
    document.querySelector('#value-x').style.color = active ? 'red' : 'unset'
    someState.x = mnui.range('x', someState.x, { min: 0, max: 10 }).value

    document.querySelector('#value-x').innerHTML = someState.x.toFixed(2)
  })
}

const loop = () => {
  requestAnimationFrame(loop)
  render()
}

requestAnimationFrame(loop)
