import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RubikCube from "../components/cube/RubikCube";

type MainSceneProps = {
    explode: boolean,
    isRotate?:boolean
}

export default function MainScene({explode, isRotate}:MainSceneProps) {
    return (
        <Canvas camera={{ position: [4, 4, 4], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            <RubikCube explode={explode}/>

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