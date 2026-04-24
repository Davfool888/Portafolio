import { useRef } from "react";
import CubePiece from "./CubePiece";
import { Group } from "three"
import { useFrame } from "@react-three/fiber"


type RubikCubeProps = {
    explode: boolean,
    isRotate:boolean
}

export default function RubikCube({explode, isRotate}: RubikCubeProps) {


    const groupRef = useRef<Group>(null!)
    const pieces = []

    const spread = explode ? 1.8 : 1


    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
                pieces.push(
                    <CubePiece
                        key={`${x}-${y}-${z}`}
                        position={[x * spread, y * spread, z * spread]}

                    />
                )
            }
        }
    }

    useFrame(()=>{
        if(!groupRef.current || !isRotate) return
            groupRef.current.rotation.y += 0.002
            groupRef.current.rotation.x += 0.001
    })

    return (
        <group ref={groupRef}>
            {pieces}
        </group>
    )
}