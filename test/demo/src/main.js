import { THREE } from './three/THREE.js'
import { getCube, getPlane } from './three/utils.js'
import { vertexShader } from './glsl/vertex.glsl.js'

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
  aspect: 2,
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
    cube.rotation.y += .01
  },
})

