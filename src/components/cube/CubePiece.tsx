import { RoundedBox } from "@react-three/drei"
import * as THREE from "three"
import { useMemo } from "react"

type CubePieceProps = {
    matrix: THREE.Matrix4
    colors: {
        right?: string;
        left?: string;
        top?: string;
        bottom?: string;
        front?: string;
        back?: string;
    }
}

export default function CubePiece({ matrix, colors }: CubePieceProps) {
    // Const para el desarrollo de los stikeres
    const BASE_SIZE = 0.94 // 
    const STICKER_SIZE = 0.78
    const STICKER_THICKNESS = 0.04
    const OFFSET = 0.48 

    // efecto de materiales
    const bodyMaterial = (
        <meshPhysicalMaterial 
            color="#f0f2f5"       
            metalness={0.05}
            roughness={0.2}       
            transmission={0.6}   
            thickness={1}         
            transparent={true}
            opacity={0.9}
        />
    )

    const stickerGeometry = useMemo(() => {
        const shape = new THREE.Shape()
        const s = STICKER_SIZE / 2
        const r = 0.25 // 

        shape.moveTo(-s + r, -s)
        shape.lineTo(s - r, -s)
        shape.absarc(s - r, -s + r, r, Math.PI * 1.5, 0, false)
        shape.lineTo(s, s - r)
        shape.absarc(s - r, s - r, r, 0, Math.PI * 0.5, false)
        shape.lineTo(-s + r, s)
        shape.absarc(-s + r, s - r, r, Math.PI * 0.5, Math.PI, false)
        shape.lineTo(-s, -s + r)
        shape.absarc(-s + r, -s + r, r, Math.PI, Math.PI * 1.5, false)

        return new THREE.ExtrudeGeometry(shape, {
            depth: STICKER_THICKNESS,
            bevelEnabled: true,
            bevelThickness: 0.03, 
            bevelSize: 0.03,
            bevelSegments: 8
        })
    }, [])

    const Sticker = ({ color, position, rotation }: { color: string, position: [number, number, number], rotation: [number, number, number] }) => (
        <mesh position={position} rotation={rotation} geometry={stickerGeometry}>
        
            <meshPhysicalMaterial 
                color={color} 
                emissive={color}     
                emissiveIntensity={0.6} 
                roughness={0.1} 
                metalness={0.1}
                transmission={0.3}    
                transparent={true}
            />
        </mesh>
    )

    return (
        <group matrix={matrix} matrixAutoUpdate={false}>
            <RoundedBox args={[BASE_SIZE, BASE_SIZE, BASE_SIZE]} radius={0.18} smoothness={10}>
                {bodyMaterial}
            </RoundedBox>
            {colors.top && <Sticker color={colors.top} position={[0, OFFSET, 0]} rotation={[-Math.PI / 2, 0, 0]} />}
            {colors.bottom && <Sticker color={colors.bottom} position={[0, -OFFSET, 0]} rotation={[Math.PI / 2, 0, 0]} />}
            {colors.front && <Sticker color={colors.front} position={[0, 0, OFFSET]} rotation={[0, 0, 0]} />}
            {colors.back && <Sticker color={colors.back} position={[0, 0, -OFFSET]} rotation={[0, Math.PI, 0]} />}
            {colors.right && <Sticker color={colors.right} position={[OFFSET, 0, 0]} rotation={[0, Math.PI / 2, 0]} />}
            {colors.left && <Sticker color={colors.left} position={[-OFFSET, 0, 0]} rotation={[0, -Math.PI / 2, 0]} />}
        </group>
    )
}