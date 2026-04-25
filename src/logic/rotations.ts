import type { Cubie } from "./cubeModel"
import { Matrix4, Vector3 } from "three"

function rotateY([x, y, z]: [number, number, number]): [number, number, number] {
    return [z, y, -x]
}


export function rotateTopFace(cubies: Cubie[]): Cubie[] {
    return cubies.map(cubie => {

        if (cubie.position[1] !== 1) return cubie

        const newPos = rotateY(cubie.position)

        const m = new Matrix4()

        m.makeTranslation(
            newPos[0],
            newPos[1],
            newPos[2]
        )

        const axis = new Vector3(0,1,0)
        m.premultiply(new Matrix4().makeRotationAxis(axis, Math.PI/2))

        return {
            ...cubie,
            position: newPos,
            matrix:m
        }
    })
}