import { THREE } from './THREE.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color('#ccc')
const camera = new THREE.PerspectiveCamera(75)
const renderer = new THREE.WebGLRenderer({
  antialias: true,
})
document.body.appendChild(renderer.domElement)

const updateSize = () => {
  const width = window.innerWidth, height = window.innerHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

updateSize()

const sun = new THREE.DirectionalLight()
sun.position.set(10, 20, 3)
scene.add(sun)

camera.position.set(0, 0, 5)

const animate = () => {
  requestAnimationFrame(animate)

  renderer.render(scene, camera)
}

animate()

window.addEventListener('resize', () => {
  updateSize()
})

Object.assign(window, {
  camera,
  renderer,
  scene,
})

export {
  camera,
  scene,
  renderer,
}