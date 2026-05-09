import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import CubePiece from "./CubePiece"
import { Group, Matrix4, Vector3, Quaternion } from "three"
import type { Cubie } from "../../logic/cubeModel"
import type { MoveType } from "../../types/cube.types"
import { rotateCubeFace } from "../../logic/rubikEngine"



type RubikCubeProps = {
    cubies: Cubie[]
    explode: boolean

    move: MoveType | null
    isAnimating: boolean

    setCubies: React.Dispatch<React.SetStateAction<Cubie[]>>
    setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>
    setMove: React.Dispatch<React.SetStateAction<MoveType | null>>
}

export default function RubikCube({
    cubies,
    explode,
    move,
    isAnimating,
    setCubies,
    setIsAnimating,
    setMove
}: RubikCubeProps) {

    const [angle, setAngle] = useState(0)

    const groupRef = useRef<Group>(null!)
    const spread = explode ? 1.8 : 1

    // animacion visual
    useFrame((_state, delta) => {
        if (!isAnimating) return

        setAngle(prev => {
            const speed = 6 * delta
            const next = prev + speed
            return next >= Math.PI / 2 ? Math.PI / 2 : next
        })
    })

    // finalizacion de movimiento
    useEffect(() => {
        if (!isAnimating || angle < Math.PI / 2) return

        setCubies(prev => {
            const isInverse = move?.includes("'")
            const direction = isInverse ? -1 : 1
            const cleanMove = move?.replace("'", "")

            switch (cleanMove) {
                case "U": return rotateCubeFace(prev, "y", 1, direction)
                case "R": return rotateCubeFace(prev, "x", 1, direction)
                case "F": return rotateCubeFace(prev, "z", 1, direction)
                case "D": return rotateCubeFace(prev, "y", -1, (-direction as 1 | -1))
                case "L": return rotateCubeFace(prev, "x", -1, (-direction as 1 | -1))
                case "B": return rotateCubeFace(prev, "z", -1, (-direction as 1 | -1))
                // Rotaciones de las capas medias "2"
                case "M": return rotateCubeFace(prev, "x", 0, (-direction as 1 | -1))
                case "N": return rotateCubeFace(prev, "y", 0, (-direction as 1 | -1))
                case "W": return rotateCubeFace(prev, "z", 0, direction)
                default: return prev
            }
        })


        setIsAnimating(false)
        setMove(null)
        setAngle(0)

    }, [angle, isAnimating, move, setCubies, setIsAnimating, setMove])

    return (
        <group ref={groupRef}>
            {cubies.map((c) => {

                let matrix = c.matrix.clone()

                // funcion de explode (expandir)
                if (explode) {
                    matrix.multiply(
                        new Matrix4().makeScale(spread, spread, spread)
                    )
                }

                // Animacion visual, no real
                const isTop = c.position[1] === 1
                const isRight = c.position[0] === 1
                const isFront = c.position[2] == 1
                const isLeft = c.position[0] === -1
                const isDown = c.position[1] === -1
                const isBack = c.position[2] == -1
                // const para las capas medias
                const isMiddleX = c.position[0] === 0
                const isMiddleY = c.position[1] === 0
                const isMiddleZ = c.position[2] === 0

                if (isAnimating) {

                    const isInverse = move?.includes("'")

                    const animAngle = isInverse ? angle : -angle

                    if (move?.startsWith("U") && isTop) {
                        const q = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), animAngle)
                        const rot = new Matrix4().makeRotationFromQuaternion(q)
                        matrix = matrix.clone().premultiply(rot)
                    }

                    if (move?.startsWith("F") && isFront) {
                        const q = new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), animAngle)
                        const rot = new Matrix4().makeRotationFromQuaternion(q)
                        matrix = matrix.clone().premultiply(rot)
                    }

                    if (move?.startsWith("R") && isRight) {
                        const q = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), animAngle)
                        const rot = new Matrix4().makeRotationFromQuaternion(q)
                        matrix = matrix.clone().premultiply(rot)
                    }

                    if (move?.startsWith("L") && isLeft) {
                        const q = new Quaternion().setFromAxisAngle(new Vector3(-1, 0, 0), animAngle)
                        const rot = new Matrix4().makeRotationFromQuaternion(q)
                        matrix = matrix.clone().premultiply(rot)
                    }

                    if (move?.startsWith("D") && isDown) {
                        const q = new Quaternion().setFromAxisAngle(new Vector3(0, -1, 0), animAngle)
                        const rot = new Matrix4().makeRotationFromQuaternion(q)
                        matrix = matrix.clone().premultiply(rot)
                    }

                    if (move?.startsWith("B") && isBack) {
                        const q = new Quaternion().setFromAxisAngle(new Vector3(0, 0, -1), animAngle)
                        const rot = new Matrix4().makeRotationFromQuaternion(q)
                        matrix = matrix.clone().premultiply(rot)
                    }

                    if (move?.startsWith("M") && isMiddleX) {
                        const q = new Quaternion().setFromAxisAngle(new Vector3(-1, 0, 0), animAngle);
                        matrix = matrix.clone().premultiply(new Matrix4().makeRotationFromQuaternion(q));
                    }
                    if (move?.startsWith("N") && isMiddleY) {
                        const q = new Quaternion().setFromAxisAngle(new Vector3(0, -1, 0), animAngle);
                        matrix = matrix.clone().premultiply(new Matrix4().makeRotationFromQuaternion(q));
                    }
                    if (move?.startsWith("W") && isMiddleZ) {
                        const q = new Quaternion().setFromAxisAngle(new Vector3(0, 0, 1), animAngle);
                        matrix = matrix.clone().premultiply(new Matrix4().makeRotationFromQuaternion(q));
                    }


                }

                return (
                    <CubePiece
                        key={c.id}
                        matrix={matrix}
                        colors={c.colors}
                    />
                )
            })}
        </group>
    )
}