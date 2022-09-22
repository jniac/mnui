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

let rotationSpeed = 1

getCube({
  onBeforeRender: cube => {
    cube.rotation.x += .01 * rotationSpeed
    rotationSpeed = mnui.range('cube/rotation speed', rotationSpeed, { min: 0, max: 4 }).value
  },
})


getCube({
  materialColor: 'red',
  onBeforeRender: cube => {
    rotationSpeed = mnui.range('cube/rotation speed 2', rotationSpeed, { min: 0, max: 4 }).value
    cube.rotation.y += .01 * rotationSpeed
  },
})

mnui.group('shader', () => {
  mnui.range('x')
  mnui.range('x')
  mnui.range('cube/foo/lol', { initialValue: 2 }).value
})

mnui.range('shader-2/position', { initialValue: 2 })
mnui.range('shader/position', { initialValue: 2 })
