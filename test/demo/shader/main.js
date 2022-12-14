import { THREE } from '../src/three/THREE.js'
import { getPlane } from '../src/three/utils.js'
import { glsl_utils, glsl_easings } from '../src/glsl/utils/index.js'
import { mnui } from '../src/mnui.js'
import { camera, renderer } from '../src/three/stage.js'

const vertexShader = /* glsl */`

  precision mediump float;
  precision mediump int;

  attribute vec4 color;

  varying vec3 vPosition;
  varying vec4 vColor;
  varying vec2 vUv;

  void main()	{

    vPosition = position;
    vColor = color;
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

  }

`

const fragmentShader = /* glsl */`

precision mediump float;
precision mediump int;

${glsl_utils}
${glsl_easings}

// https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

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
uniform vec4 uShadow;
uniform vec4 uOffset1;
uniform float uAliasThreshold;
uniform float uZoom;
uniform vec3 uColor;
uniform float uGrainIntensity;

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

bool checker(vec2 uv, float size) {
  float x = positiveModulo(uv.x, size * 2.0);
  float y = positiveModulo(uv.y, size * 2.0);
  return x < size == y < size;
}

// Why returning a vec2 here instead of a float? Is it a distance or not?
// Yes, but a special one that has 2 values, a "flat" distance, "strait", which
// represents a distance from a strait line, and a "sin" distance, "curve" which
// represents a distance from a curvy line. The flat distance commands the shadow 
// on great distance, the sin distance on short distance.
vec2 sinDistance(vec2 uv) {
  float strait = -(uv.y * 8.0);
  float curveBase = strait - 1.0;
  float curve = curveBase - sin(uv.x * 5.5) * 0.25 + sin(uv.x * 2.1) * 0.5 + sin(uv.x * 1.1) * 0.75;
  return vec2(strait, curve);
}

float shadowRamp(vec2 dist) {
  float strait = dist.x;
  float curve = dist.y;
  float a = fwidth(strait) * 0.5 * uAliasThreshold;
  if (curve < a) {
    float x = smoothstep(0.0, a, curve) * (uShadow.z + uShadow.w) / 2.0;
    return x;
  } else {
    strait = (strait - a) / (1.0 - a);
    curve = (curve - a) / (1.0 - a);
    float xStr = easeOut6(curve / uShadow.y); // sin distance
    float xCrv = easeOut3(strait / uShadow.x); // flat distance
    xCrv = mix(1.0, xCrv, uShadow.z);
    xStr = mix(1.0, xStr, uShadow.w);
    return clamp01(1.0 - xStr * xCrv);
  }
}

vec2 getUv2(in vec2 uv, in float i) {
  vec2 uv2 = uv;
  float z = 0.3 * sin(uTime * 0.1 + uv.x + uv.y);
  uv2.x += noise(vec3(uv * 0.4 + i * uOffset1.z, z)) + i * uOffset1.x;
  uv2.y += noise(vec3(uv * 0.4 + i * uOffset1.w, z)) + i * uOffset1.y;
  return uv2;
}

float grain(in vec2 uv) {
  float x = noise(vec3(uv * 1000.1, uTime));
  return mix(1.0 - uGrainIntensity, 1.0 + uGrainIntensity, x);
}

void main()	{
  vec2 uv = vPosition.xy * uZoom * 4.0 * vec2(uSize.z, 1.0) + uParam1.xy;
  uv = applyTransform2D(uv, uTransform1);
  vec2 uv2 = getUv2(uv, 0.0);
  vec2 dist = sinDistance(uv2);
  float shadow = 1.0;
  shadow *= 1.0 - shadowRamp(dist);
  vec3 color = vec3(1.0, 0.0, 0.0);
  for (float i = 0.0; i < 4.0; i += 1.0) {
    vec2 uv2 = getUv2(uv, i + 1.0);
    vec2 dist2 = sinDistance(uv2);
    if (dist.y > 0.0) {
      float newShadow = clamp01(1.0 - shadowRamp(dist2));
      // NOTE: "50" here is a not responsive...
      float edge = clamp01(dist.y * 50.0);
      shadow *= mix(1.0, newShadow, edge);
      // shadow *= edge;
      // color = mod(i, 2.0) == 1.0 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 1.0);
      dist = dist2;
    }
  }
  // gl_FragColor.rgb = vec3(shadow * 0.1);
  gl_FragColor.rgb = uColor * shadow * grain(uv);

  // gl_FragColor.rgb += checker(uv, .1) ? 0.1 : -0.1;
  gl_FragColor.a = 1.0;
}

`

const uniforms = {
  uTime: { value: 0 },
  uZoom: { value: .3 },
  uSize: { value: new THREE.Vector4(window.innerWidth, window.innerHeight, window.innerWidth / window.innerHeight) },
  uParam1: { value: new THREE.Vector4() },
  uTransform1: { value: new THREE.Vector4(1.7, 1.6, 45.7, 0.64) },
  uShadow: { value: new THREE.Vector4(7, 1, 1, .66) },
  uOffset1: { value: new THREE.Vector4(20, .1, 1, 1) },
  uColor: { value: new THREE.Color('#524c60') },
  uGrainIntensity: { value: .05 },
  uAliasThreshold: { value: 5 },
}

camera.position.set(0, 0, 1)

getPlane({ 
  height: 8,
  aspect: 2.5,
  material: new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
  })
})

const localStorage = mnui.toggle('shader/localStorage (save)', { initialValue: false }, { localStorage: true }).onUserChange(value => {
  for (const item of mnui.group('shader').children()) {
    item.localStorage = value
  }
}).value

mnui.utils.onFrame(({ time }) => {
  uniforms.uTime.value = time
  mnui.group('shader', () => {
    mnui.range('zoom', uniforms.uZoom.value, [0, 5])
      .onUserChange(value => uniforms.uZoom.value = value)
    mnui.vector('transform', uniforms.uTransform1.value, { step: .1, localStorage })
    mnui.vector('shadow (length, alpha)', uniforms.uShadow.value, { min: 0, step: .1, localStorage })
    mnui.vector('offset', uniforms.uOffset1.value, { step: .1, localStorage })
    uniforms.uAliasThreshold.value = 
      mnui.range('alias threshold', uniforms.uAliasThreshold.value, { min: 0, max: 10, localStorage }).value
    mnui.color('color', uniforms.uColor)
    uniforms.uGrainIntensity.value = 
      mnui.range('grain intensity', uniforms.uGrainIntensity).value
  })
})

mnui.utils.onDrag(renderer.domElement, info => {
  uniforms.uTransform1.value.z += info.positionDelta.x * .006 * uniforms.uZoom.value
  uniforms.uTransform1.value.w += -info.positionDelta.y * .006 * uniforms.uZoom.value
})

const getSerializedUniforms = () => {
  const format = x => x.toFixed(1)
  return `
const uniforms = {
  uTime: { value: 0 },
  uZoom: { value: ${uniforms.uZoom.value} },
  uSize: { value: new THREE.Vector4(window.innerWidth, window.innerHeight, window.innerWidth / window.innerHeight) },
  uParam1: { value: new THREE.Vector4() },
  uTransform1: { value: new THREE.Vector4(${uniforms.uTransform1.value.toArray().map(format).join(', ')}) },
  uShadow: { value: new THREE.Vector4(${uniforms.uShadow.value.toArray().map(format).join(', ')}) },
  uOffset1: { value: new THREE.Vector4(${uniforms.uOffset1.value.toArray().map(format).join(', ')}) },
  uColor: { value: new THREE.Color('#${uniforms.uColor.value.getHexString()}') },
  uGrainIntensity: { value: ${uniforms.uGrainIntensity.value}} },
  uAliasThreshold: { value: ${uniforms.uAliasThreshold.value} },
}`.trim()
}

mnui.action('shader/show values', { order: 10 }).onUserChange(() => {
  const wnd = window.open('about:blank')
  wnd.document.write(`<pre>${getSerializedUniforms()}</pre>`)
})
