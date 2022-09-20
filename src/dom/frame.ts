
export let frame = 0
const loop = () => {
  requestAnimationFrame(loop)
  frame++
}
requestAnimationFrame(loop)
