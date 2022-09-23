import { THREE } from '../src/three/THREE.js'
import { getPlane } from '../src/three/utils.js'
import { vertexShader } from '../src/glsl/vertex.glsl.js'
import { glsl_utils, glsl_easings, glsl_iq_noise } from '../src/glsl/utils/index.js'
import { mnui } from '../../../dist/index.js'
import { camera } from '../src/three/stage.js'

const fragmentShader = /* glsl */`

precision mediump float;
precision mediump int;

${glsl_utils}
${glsl_easings}
${glsl_iq_noise}

vec4 transparent = vec4(0.0, 0.0, 0.0, 0.0);
vec4 black = vec4(0.0, 0.0, 0.0, 1.0);
vec4 white = vec4(1.0, 1.0, 1.0, 1.0);
vec4 red = vec4(1.0, 0.0, 0.0, 1.0);
vec4 yellow = vec4(1.0, 1.0, 0.0, 1.0);
vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);

uniform float uTime;
uniform vec4 uSize;
uniform vec4 uParam1;
uniform vec4 uTransform1;

varying vec3 vPosition;
varying vec4 vColor;

float limited(float x) {
  return x / (x + 1.0);
}

float shadowRamp(float x) {
  return easeOut6(x / 2.0);
}

vec2 applyTransform2D(vec2 p, vec4 transform) {
  p /= transform.xy;
  p -= transform.zw;
  return p;
}

float checker(vec2 uv, float size) {
  float x = positiveModulo(uv.x, size * 2.0);
  float y = positiveModulo(uv.y, size * 2.0);
  return x < size == y < size ? 1.0 : 0.0;
}

float sinRamp(vec2 uv) {
  float x1 = (uv.y * 8.0);
  float x2= x1 - sin(uv.x * 8.0);

  const float a = 0.02;
  x2 /= 4.0;

  if (x2 < a) {
    return smoothstep(0.0, a, x2);
  } else {
    x1 = (x1 - a) / (1.0 - a);
    x2 = (x2 - a) / (1.0 - a);
    float x3 = easeOut6(x2 / 1.0); // sin distance
    float x4 = x1 / 8.0; // flat distance
    return clamp01(1.0 - x3 * mix(x4, 1.0, 0.5));
  }
}

void main()	{

  vec2 uv = vPosition.xy * 4.0 * vec2(uSize.z, 1.0) + uParam1.xy;
  uv = applyTransform2D(uv, uTransform1);
  uv.x += iq_noise3(vec3(uv * 0.4, 0.0));
  uv.y += iq_noise3(vec3(uv * 0.4, 0.0));
  float x = checker(uv, 1.0);
  gl_FragColor.rgb = vec3(1.0 - sinRamp(uv));
  gl_FragColor.rgb *= x > 0.0 ? 1.0 : 0.97;
  gl_FragColor.a = 1.0;
}

`

const uniforms = {
  uTime: { value: 0 },
  uSize: { value: new THREE.Vector4(window.innerWidth, window.innerHeight, window.innerWidth / window.innerHeight) },
  uParam1: { value: new THREE.Vector4() },
  uTransform1: { value: new THREE.Vector4(1, 1, 0, 0) },
}

camera.position.set(0, 0, 1)

getPlane({ 
  height: 8,
  aspect: 2.5,
  material: new THREE.RawShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
  })
})

mnui.vector('transform', uniforms.uTransform1.value, { step: .1, localStorage: true })
