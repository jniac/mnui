import { scene, camera, renderer } from './stage.js'
import { THREE } from './THREE.js'

export const applyTransform = (target = new THREE.Object3D(), {
  parent = target.parent ?? scene,
  x = target.position.x,
  y = target.position.y,
  z = target.position.z,
  rotationX = target.rotation.x * 180 / Math.PI,
  rotationY = target.rotation.y * 180 / Math.PI,
  rotationZ = target.rotation.z * 180 / Math.PI,
  onUpdate = null,
  onBeforeRender = null,
  onAfterRender = null,
}) => {
  target.position.set(x, y, z)
  target.rotation.set(rotationX * Math.PI / 180, rotationY * Math.PI / 180, rotationZ * Math.PI / 180)
  if (onUpdate) {
    target.onUpdate = () => onUpdate(target, camera, renderer)
  }
  if (onBeforeRender) {
    target.onBeforeRender = () => onBeforeRender(target, camera, renderer)
  }
  if (onAfterRender) {
    target.onAfterRender = () => onAfterRender(target, camera, renderer)
  }
  parent?.add(target)
  return target
}

export const getEmissiveMaterial = ({
  color = 'red',
  intensity = .4,
}) => {
  return new THREE.MeshPhysicalMaterial({
    color: color,
    emissive: color,
    emissiveIntensity: intensity,
  })
}

export const getCube = ({
  size = 1,
  width = size,
  height = size,
  depth = size,
  materialColor = 'red',
  material = getEmissiveMaterial({
    color: materialColor,
  }),
  ...transformProps
} = {}) => {
  const geometry = new THREE.BoxGeometry(width, height, depth)
  return applyTransform(new THREE.Mesh(geometry, material), transformProps)
}

export const getSphere = ({
  diameter = 1,
  radius = diameter / 2,
  materialColor = '#06f',
  detail = 4,
  material = getEmissiveMaterial({
    color: materialColor,
  }),
  ...transformProps
} = {}) => {
  const geometry = new THREE.IcosahedronGeometry(radius, detail)
  return applyTransform(new THREE.Mesh(geometry, material), transformProps)
}

export const getPlane = ({
  size = NaN,
  aspect = NaN,
  width = NaN,
  height = NaN,
  materialColor = '#fc0',
  material = getEmissiveMaterial({
    color: materialColor,
  }),
  ...transformProps
} = {}) => {
  if (Number.isNaN(size) && Number.isFinite(aspect)) {
    if (Number.isNaN(width) && Number.isNaN(height)) {
      size = 1
    }
    else if (Number.isFinite(height)) {
      width = height * aspect
    } else {
      height = width / aspect
    }
  }
  if (Number.isFinite(size) && Number.isFinite(aspect) && Number.isNaN(width) && Number.isNaN(height)) {
    width = Math.sqrt(size * size * aspect)
    height = Math.sqrt(size * size / aspect)
  }
  const geometry = new THREE.PlaneGeometry(width, height)
  return applyTransform(new THREE.Mesh(geometry, material), transformProps)
}
