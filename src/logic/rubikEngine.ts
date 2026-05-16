
import type { Cubie } from "./cubeModel"
import { Matrix4 } from "three"


function rotatePosition(
  pos: [number, number, number],
  axis: "x" | "y" | "z",
  dir: 1 | -1
): [number, number, number] {
  const [x, y, z] = pos

  if (axis === "x") {
    return [x, dir * z, -dir * y]
  }

  if (axis === "y") {
    return [-dir * z, y, dir * x]
  }

  if (axis === "z") {
    return [dir * y, -dir * x, z]
  }

  return pos

}




export function rotateCubeFace(
  cubies: Cubie[],
  axis: "x" | "y" | "z",
  layerValue: number,
  direction: 1 | -1
): Cubie[] {

const rotationMatrix = new Matrix4()

let angle = (Math.PI / 2) * direction

if (axis === "x" || axis === "y" || axis === "z") angle = -angle
if (axis === "x") rotationMatrix.makeRotationX(angle)
if (axis === "y") rotationMatrix.makeRotationY(angle)
if (axis === "z") rotationMatrix.makeRotationZ(angle)

return cubies.map((cubie) => {

  const currentPosValue = axis === "x" ? cubie.position[0] :
    axis === "y" ? cubie.position[1] :
      cubie.position[2]

  if (Math.abs(currentPosValue - layerValue) > 0.01) {
    return cubie
  }

  const newPosition = rotatePosition(cubie.position, axis, direction)

  const newMatrix = cubie.matrix.clone()
  newMatrix.premultiply(rotationMatrix)
  newMatrix.setPosition(newPosition[0], newPosition[1], newPosition[2])




  return {
    ...cubie,
    position: newPosition,
    matrix: newMatrix
  }

})
}



