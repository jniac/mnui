import { mnui } from "../../../dist/index.js"
import { scene } from '../src/three/stage.js'
import { getCube } from "../src/three/utils.js"

const cube = getCube()
scene.background.set('#dde8f3')

const someState = {
  active: true,
  x: 5,
  position: { x: .3, y: .4, z: .5 },
}

mnui.setCustomStyle(`
  #mnui {
    --color: #005128;
    --background-color: #fff9;
  }
`)

const renderLoop = () => {
  requestAnimationFrame(renderLoop)

  mnui.group('My Component', () => {
    someState.active = mnui.toggle('active', someState.active).value
    someState.x = mnui.range('x', someState.x, { min: 0, max: 10 }).value
    mnui.vector('position', someState.position)
    mnui.vector('rotation', cube.rotation, { keys: 'x,y,z', map: [x => x * 180 / Math.PI, x => x * Math.PI / 180], step: .05 })
  })

  cube.position.copy(someState.position)
}

requestAnimationFrame(renderLoop)
