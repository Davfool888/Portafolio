import type { Cubie } from "./cubeModel"
import { Matrix4, Vector3 } from "three"

function getPositionFromMatrix(matrix: Matrix4): [number, number, number] {
  const pos = new Vector3().setFromMatrixPosition(matrix)

  return [
    Math.round(pos.x),
    Math.round(pos.y),
    Math.round(pos.z),
  ]
}


function rotateYColors(colors: Cubie["colors"]): Cubie["colors"] {
  return {
right: colors.right,
    front: colors.left,
    left: colors.front,
    back: colors.back,
    top: colors.top,
    bottom: colors.bottom,
  }
}



export function rotateTopFace(cubies: Cubie[]): Cubie[] {
  return cubies.map((cubie) => {
    if (cubie.position[1] !== 1) return cubie

    // 🔥 1. ROTACIÓN
    const rotation = new Matrix4().makeRotationAxis(
      new Vector3(0, 1, 0),
      Math.PI / 2
    )

    // 🔥 2. POSICIÓN ACTUAL COMO VECTOR
    const currentPos = new Vector3(...cubie.position)

    // 🔥 3. ROTAS LA POSICIÓN (ESTO ES CLAVE)
    const newPosVec = currentPos.clone().applyMatrix4(rotation)

    // 🔥 4. REDONDEO LIMPIO
    const newPosition: [number, number, number] = [
      Math.round(newPosVec.x),
      Math.round(newPosVec.y),
      Math.round(newPosVec.z),
    ]

    // 🔥 5. CREAS MATRIX DESDE CERO (NO CLONE)
    const newMatrix = new Matrix4().makeTranslation(
      newPosition[0],
      newPosition[1],
      newPosition[2]
    )

    return {
      ...cubie,
      position: newPosition,
      matrix: newMatrix,
      colors: cubie.colors // por ahora déjalos así
    }
  })
}