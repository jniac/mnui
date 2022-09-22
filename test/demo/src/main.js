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

getCube({
  onBeforeRender: cube => {
    cube.rotation.x += .01
  },
})

getCube({
  materialColor: 'red',
  onBeforeRender: cube => {
    const { value:speed } = mnui.range('cube/rotation speed', { initialValue: 1 }, { min: 0, max: 4 })
    cube.rotation.y += .01 * speed
  },
})

mnui.group('shader', () => {
  mnui.range('x')
  mnui.range('x')
  mnui.range('cube/foo/lol', { initialValue: 2 }).value
})

mnui.range('shader-2/position', { initialValue: 2 })
mnui.range('shader/position', { initialValue: 2 })
