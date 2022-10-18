import { mnui } from "../src/mnui.js"
import { scene } from "../src/three/stage.js"
import { getCube, getSphere } from "../src/three/utils.js"

scene.background.set("#dde8f3")

const cube = getCube()
const sphere = getSphere()

sphere.position.copy(cube.position)
sphere.position.y += 1

const someState = {
  active: true,
  scale: 1,
  position: { x: 0.03, y: 0.04, z: 0.05 },
}

mnui.setAlign('bottom-right')

mnui.setCustomStyle(`
  #mnui {
    --color: #005128;
    --background-color: #fff9;
  }
`)

cube.rotation.set(2 * Math.PI * Math.random(), 2 * Math.PI * Math.random(), 2 * Math.PI * Math.random())

const radianMap = [x => x * 180 / Math.PI, x => x * Math.PI / 180]
mnui.range('map test/angle', { initialValue: 0 }, { min: -Math.PI, max: Math.PI, map: radianMap })

mnui.range('cube/scale', 1, { min: 0, max: 1.5 }).onUserChange((value) => {
  cube.scale.setScalar(value)
})

let lol = 3
const renderLoop = () => {
  requestAnimationFrame(renderLoop)

  lol = mnui.range('getter test/lol', () => lol, [0, 10]).value
  lol = mnui.range('getter test/lol (value)', { value: () => lol }, [0, 10]).value
  mnui.range('getter test/lol (initial value)', { initialValue: () => lol }, [0, 10])

  mnui.group('cube', () => {
    someState.scale = mnui.range('scale', someState.scale).value
    mnui.vector('position', someState.position)
    mnui.vector('rotation', cube.rotation, { keys: 'x,y,z', map: [x => x * 180 / Math.PI, x => x * Math.PI / 180], step: .05 })
    cube.rotation.y = mnui.range('ry', cube.rotation.y, { min: -Math.PI, max: Math.PI, map: radianMap }).value
  })

  cube.position.copy(someState.position)

  sphere.scale.setScalar(mnui.range('cube/scale').value)
  sphere.position.copy(cube.position)
  sphere.position.y += 1
}

mnui.toggle('cube/blue?', false).onUserChange(value => {
  cube.material.color.set(value ? 'blue' : 'red')
  cube.material.emissive.copy(cube.material.color)
})

requestAnimationFrame(renderLoop)
