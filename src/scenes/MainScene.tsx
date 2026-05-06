import { OrbitControls, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import React, { useRef } from "react"
import RubikCube from "../components/cube/RubikCube"
import type { Cubie } from "../logic/cubeModel"
import MoveControl from "../components/cube/rotationFaces/MoveControl"
import type { MoveType } from "../types/cube.types"
import ScrollCubeController from "../components/cube/ScrollCubeController"

type MainSceneProps = {
    cubies: Cubie[]
    explode: boolean
    isRotate: boolean

    move: MoveType | null
    isAnimating: boolean

    setCubies: React.Dispatch<React.SetStateAction<Cubie[]>>
    setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>
    setMove: React.Dispatch<React.SetStateAction<MoveType | null>>

    projectIndex: number
    setProjectIndex: React.Dispatch<React.SetStateAction<number>>
    scrollElRef: React.MutableRefObject<HTMLElement | null>
    onScrollReady: () => void
    activeSection: string
}

export default function MainScene({ cubies, explode, isRotate, move, isAnimating, setCubies, setIsAnimating, setMove, projectIndex, setProjectIndex, scrollElRef, onScrollReady, activeSection }: MainSceneProps) {

    const executeMove = (move: string) => {
        if (isAnimating) return
        setMove(move as MoveType)
        setIsAnimating(true)
    }

    const controlsRef = useRef<any>(null)
    const scroll = useScroll()

    useFrame(() => {
        if (!scroll || !controlsRef.current) return
        const offset = scroll.offset

        if (scrollElRef.current !== scroll.el) {
            scrollElRef.current = scroll.el
            onScrollReady()
        }
        if (offset >= 0.2 && offset < 0.4) {
            controlsRef.current.enabled = false
        } else {
            controlsRef.current.enabled = true
        }
    })

    return (
        <>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            <ScrollCubeController cubies={cubies} projectIndex={projectIndex} setProjectIndex={setProjectIndex}>
                <RubikCube
                    explode={explode}
                    cubies={cubies}
                    move={move}
                    isAnimating={isAnimating}
                    setCubies={setCubies}
                    setIsAnimating={setIsAnimating}
                    setMove={setMove}
                />

                {activeSection === "play" && (
                    <>
                        <MoveControl
                            label="U"
                            position={[0, 2.5, 0]}
                            rotation={[0, 0, 0]}
                            onMove={executeMove}
                        />
                        <MoveControl
                            label="R"
                            position={[2.5, 0, 0]}
                            rotation={[0, 0, -Math.PI / 2]}
                            onMove={executeMove}
                        />
                        <MoveControl
                            label="D"
                            position={[0, -2.5, 0]}
                            rotation={[0, 0, Math.PI]}
                            onMove={executeMove}
                        />
                        <MoveControl
                            label="L"
                            position={[-2.5, 0, 0]}
                            rotation={[0, 0, Math.PI / 2]}
                            onMove={executeMove}
                        />
                        <MoveControl
                            label="F"
                            position={[0, 0, 2.5]}
                            rotation={[Math.PI / 2, 0, 0]}
                            onMove={executeMove}
                        />
                        <MoveControl
                            label="B"
                            position={[0, 0, -2.5]}
                            rotation={[-Math.PI / 2, 0, 0]}
                            onMove={executeMove}
                        />
                    </>

                )}
                {/* Controles 3d como buttoms */}


            </ScrollCubeController>

            {/* Controles para la camara */}
            <OrbitControls
                ref={controlsRef}
                rotateSpeed={0.35}
                enableZoom={false}
                panSpeed={0.5}

                enableDamping
                dampingFactor={0.08}

                minPolarAngle={0}
                maxPolarAngle={Math.PI}
                enablePan={false}
            />
        </>
    )
}