import { Matrix4, Vector3 } from "three"
import type { Cubie } from "./cubeModel"
import { positionViewDirection } from "three/src/nodes/TSL.js"


export class CubeEngine {
    cubies: Cubie[]

    constructor(cubies: Cubie[]){
        this.cubies = cubies
    }

    getToLayer(){
        return this.cubies.filter(c =>{
            const pos = new Vector3().setFromMatrixPosition(c.matrix)
            return Math.round(pos.y) == 1
        })
    }

    rotateTopFace(){
        const axis = new Vector3(0,1,0)
        const angle = Math.PI/2

        const rotationMatrix = new Matrix4().makeRotationAxis(axis, angle)

        this.getToLayer().forEach(cube =>{
            cube.matrix.premultiply(rotationMatrix)

            const pos = new Vector3()
            pos.setFromMatrixPosition(cube.matrix)

            pos.x = Math.round(pos.x)
            pos.y = Math.round(pos.y)
            pos.z = Math.round(pos.z)

            cube.matrix.setPosition(pos)
        })
    }
}