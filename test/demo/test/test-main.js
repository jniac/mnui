import { mnui } from '../src/mnui.js'
import { scene } from '../src/three/stage.js'
import { getCube } from "../src/three/utils.js"

const cube = getCube()
scene.background.set('#dde8f3')

const someState = {
  active: true,
  scale: 1,
  position: { x: .03, y: .04, z: .05 },
}

mnui.setCustomStyle(`
  #mnui {
    --color: #005128;
    --background-color: #fff9;
  }
`)

cube.rotation.set(2 * Math.PI * Math.random(), 2 * Math.PI * Math.random(), 2 * Math.PI * Math.random())

const radianMap = [x => x * 180 / Math.PI, x => x * Math.PI / 180]
mnui.range('map test/angle', { initialValue: 0 }, { min: -Math.PI, max: Math.PI, map: radianMap })


let lol = 3
const renderLoop = () => {
  requestAnimationFrame(renderLoop)
  
  lol = mnui.range('getter test/lol', () => lol, [0, 10]).value
  lol = mnui.range('getter test/lol (value)', { value: () => lol }, [0, 10]).value
  mnui.range('getter test/lol (initial value)', { initialValue: () => lol }, [0, 10])

  mnui.group('cube', () => {
    someState.scale = mnui.range('scale', someState.scale, { min: 0, max: 1.5 }).value
    mnui.range('scale', someState.scale).onUserChange(value => {
      cube.scale.setScalar(value)
    })
    mnui.vector('position', someState.position)
    mnui.vector('rotation', cube.rotation, { keys: 'x,y,z', map: [x => x * 180 / Math.PI, x => x * Math.PI / 180], step: .05 })
    cube.rotation.y = mnui.range('ry', cube.rotation.y, { min: -Math.PI, max: Math.PI, map: radianMap }).value
  })

  cube.position.copy(someState.position)
}

mnui.toggle('cube/blue?', false).onUserChange(value => {
  cube.material.color.set(value ? 'blue' : 'red')
  cube.material.emissive.copy(cube.material.color)
})


requestAnimationFrame(renderLoop)
