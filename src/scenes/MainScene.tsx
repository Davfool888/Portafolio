import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import RubikCube from "../components/cube/RubikCube"
import type { Cubie } from "../logic/cubeModel"
import MoveControl from "../components/cube/rotationFaces/MoveControl" 
import type { MoveType } from "../App"



type MainSceneProps = {
    cubies: Cubie[]
    explode: boolean
    isRotate: boolean

    move: MoveType | null
    isAnimating: boolean

    setCubies: React.Dispatch<React.SetStateAction<Cubie[]>>
    setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>
    setMove: React.Dispatch<React.SetStateAction<MoveType| null>>
}

export default function MainScene({ cubies, explode, isRotate, move, isAnimating, setCubies, setIsAnimating, setMove }: MainSceneProps) {
    
    const executeMove = (move: string) => {
        if(isAnimating) return
        setMove(move as MoveType)
        setIsAnimating(true)
    }
    
    return (
        <Canvas camera={{ position: [4, 4, 4], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            <RubikCube
                explode={explode}
                cubies={cubies}
                move={move}
                isAnimating={isAnimating}
                setCubies={setCubies}
                setIsAnimating={setIsAnimating}
                setMove={setMove} />


                {/* Controles 3d como buttoms */}

                 <MoveControl 
                label="U"
                position={[0, 2.5, 0]}
                rotation={[0,0,Math.PI ]}
                onMove={executeMove}
                />

                <MoveControl 
                label="R"
                position={[2.5, 0, 0]}
                rotation={[0,0,-Math.PI / 2]}
                onMove={executeMove}
                />

                <MoveControl 
                label="D"
                position={[0, -2.5, 0]}
                rotation={[0,0,Math.PI ]}
                onMove={executeMove}
                />

                 <MoveControl 
                label="L"
                position={[-2.5, 0,0]}
                rotation={[0,0, Math.PI / 2 ]}
                onMove={executeMove}
                />


                 <MoveControl 
                label="F"
                position={[0, 0,2.5]}
                rotation={[Math.PI / 2 ,0,0 ]}
                onMove={executeMove}
                />


                   <MoveControl 
                label="B"
                position={[0, 0,-2.5]}
                rotation={[-Math.PI / 2 ,0,0 ]}
                onMove={executeMove}
                />


{/* Controles para la camara */}

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