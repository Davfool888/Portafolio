import { useRef, useState  } from "react"
import { useFrame } from "@react-three/fiber"
import CubePiece from "./CubePiece"
import { Group, Matrix4, Vector3 } from "three"
import type { Cubie } from "../../logic/cubeModel"
import { rotateTopFace } from "../../logic/rubikEngine"

type RubikCubeProps = {
    cubies: Cubie[]
    explode: boolean
    isRotate: boolean

    move: "U" | null
    isAnimating: boolean

    setCubies: React.Dispatch<React.SetStateAction<Cubie[]>>
    setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>
    setMove: React.Dispatch<React.SetStateAction<"U" | null>>

}

export default function RubikCube({ cubies, explode, isRotate, move, isAnimating, setCubies, setIsAnimating, setMove  }: RubikCubeProps) {

    const [angle, setAngel] = useState(0)


    const groupRef = useRef<Group>(null!)
    const spread = explode ? 1.8 : 1


    useFrame(() =>{
        if(!isAnimating || move !== "U") return

        setAngel(prev => {
            const next= prev + 0.08
            if (next >= Math.PI / 2) {
                setCubies(prev => rotateTopFace(prev))
                setIsAnimating(false)
                setMove(null)
                return 0
            }
            return next

        })

       
    })

    return (
        <group ref={groupRef}>
            {cubies.map((c) => {
                let matrix = c.matrix.clone()
                if (explode) {
                    matrix.multiply(
                        new Matrix4().makeScale(spread, spread, spread)
                    )
                }

                if(isAnimating && move === "U" && c.position[1] === 1){
                    const rotation = new Matrix4().makeRotationAxis(
                        new Vector3(0,1,0),
                        angle
                    )
                    matrix = rotation.multiply(matrix)
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