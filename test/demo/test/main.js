import { mnui } from "../../../dist/index.js"
import { getCube } from "../src/three/utils.js"

const cube = getCube()

cube.onUpdate = () => {
  cube.position.x = mnui.range("position.x", cube.position.x).value
}
