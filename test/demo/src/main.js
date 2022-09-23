import { THREE } from './three/THREE.js'
import { getCube, getPlane } from './three/utils.js'
import { vertexShader } from './glsl/vertex.glsl.js'
import { mnui } from '../../../dist/index.js'

const fragmentShader = `

  precision mediump float;
  precision mediump int;

  varying vec3 vPosition;
  varying vec4 vColor;
  varying vec2 vUv;

  uniform vec3 uColor;
  
  void main()	{
    gl_FragColor.rgb = uColor;
    gl_FragColor.a = 1.0;
  }

`

const uniforms = {
  uColor: { value: new THREE.Color('blue') },
}

getPlane({ 
  height: 8,
  aspect: 2.5,
  material: new THREE.RawShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
  })
})

let autoRotate = true
let autoMove = true
let rotationSpeed = 1
let positionTime = 0

getCube({
  onUpdate: cube => {
    mnui.group('painful cube', () => {
      Object.assign(window, { cube })

      autoMove = mnui.toggle('auto move', autoMove).value
      autoRotate = mnui.toggle('auto rotate', autoRotate).value
      autoRotate = mnui.toggle('auto rotate 2', autoRotate).value
      rotationSpeed = mnui.range('rotation speed', rotationSpeed, { min: 0, max: 4 }).value
      rotationSpeed = mnui.range('rotation speed 2', rotationSpeed, { min: 0, max: 4 }).value

      if (autoMove) {
        positionTime += 1 / 60
        cube.position.y += Math.cos(positionTime) * .01
      }
      if (autoRotate) {
        cube.rotation.x += .01 * rotationSpeed
      }

      mnui.vector('position', cube.position, { step: .1 })
      mnui.vector('position (-1,1) with a very long name', cube.position, { min: -1, max: 1, step: .05 })
      mnui.vector('rotation raw', cube.rotation)
      mnui.vector('rotation map', cube.rotation, { keyMap: { '_x': 'x', '_y': 'y', '_z': 'z' } })
      mnui.vector('rotation degree', cube.rotation, { 
        step: .1,
        keys: ['x', 'y', 'z'],
        map: [
          x => x * 180 / Math.PI, 
          x => x * Math.PI / 180,
        ],
      })
    })
  },
})


getCube({
  materialColor: 'red',
  onUpdate: cube => {
    if (autoRotate) {
      cube.rotation.y += .01 * rotationSpeed
    }
  },
})

mnui.group('shader', () => {
  mnui.range('x')
  mnui.range('x')
  mnui.range('cube/foo/lol', { initialValue: 2 }).value
})

mnui.range('shader-2/position', { initialValue: 2 })
mnui.range('shader/position', { initialValue: 2 })
