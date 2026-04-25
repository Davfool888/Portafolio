import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RubikCube from "../components/cube/RubikCube";
import type { Cubie } from "../logic/cubeModel"

type MainSceneProps = {
    cubies: Cubie[]
    explode: boolean
    isRotate: boolean

    move: "U" | null
    isAnimating: boolean

    setCubies: React.Dispatch<React.SetStateAction<Cubie[]>>
    setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>
    setMove: React.Dispatch<React.SetStateAction<"U" | null>>
}

export default function MainScene({ cubies, explode, isRotate, move, isAnimating, setCubies, setIsAnimating, setMove }: MainSceneProps) {
    return (
        <Canvas camera={{ position: [4, 4, 4], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            <RubikCube
                explode={explode}
                isRotate={isRotate}
                cubies={cubies}
                move={move}
                isAnimating={isAnimating}
                setCubies={setCubies}
                setIsAnimating={setIsAnimating}
                setMove={setMove} />

            <OrbitControls
                rotateSpeed={0.35}
                zoomSpeed={0.6}
                panSpeed={0.5}

                enableDamping
                dampingFactor={0.08}

                minPolarAngle={0}
                maxPolarAngle={Math.PI}
                enablePan={false}
            />

        </Canvas>
    )
}