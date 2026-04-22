import { Mesh } from "three"
import { RoundedBox } from "@react-three/drei"
import { useRef, useState } from "react"
import { color } from "three/tsl"


type Props = {
    position: [number, number, number]
}

export default function CubePiece({ position }: Props) {
    const ref = useRef<Mesh>(null!)

    const [x, y, z] = position

    // useState Y Hover para seleccionar cubos de manera individual
    const [hovered, setHovered] = useState(false)
    const colors = {
        right: x === 1 ? "#FF6B6B" : null,
        left: x === -1 ? "#FF8C42" : null,
        top: y === 1 ? "#919191" : null,
        bottom: y === -1 ? "#FFD93D" : null,
        front: z === 1 ? "#6BCB77" : null,
        back: z === -1 ? "#4D96FF" : null,
    }

    const stickerOffset = 0.49

    return (
        <group ref={ref} position={position} onPointerOver={()=>setHovered(true)} onPointerOut={()=>setHovered(false)}>


            {/* Color principal del cubo */}
            <RoundedBox args={[0.96, 0.96, 0.96]} radius={0.2} smoothness={4}>
                <meshStandardMaterial  roughness={0.5} color={hovered ? "#c0dd30" : "#ffffff"}/>
            </RoundedBox>

            {/* Color derecha o RIGHT */}
            {colors.right && (
                <mesh position={[stickerOffset, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <planeGeometry args={[0.6, 0.6]} />
                    <meshStandardMaterial color={colors.right} />
                </mesh>
            )}


            {colors.left && (
                <mesh position={[-stickerOffset, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                    <planeGeometry args={[0.6, 0.6]} />
                    <meshStandardMaterial color={colors.left} />
                </mesh>
            )}

            {colors.top && (
                <mesh position={[0, stickerOffset, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[0.6, 0.6]} />
                    <meshStandardMaterial color={colors.top} />
                </mesh>
            )}

            {colors.bottom && (
                <mesh position={[0, -stickerOffset, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[0.6, 0.6]} />
                    <meshStandardMaterial color={colors.bottom} />
                </mesh>
            )}

            {colors.back && (
                <mesh position={[0, 0, -stickerOffset]} rotation={[0, Math.PI, 0]}>
                    <planeGeometry args={[0.6, 0.6]} />
                    <meshStandardMaterial color={colors.back} />
                </mesh>
            )}


            {colors.front && (
                <mesh position={[0, 0, stickerOffset]} >
                    <planeGeometry args={[0.6, 0.6]} />
                    <meshStandardMaterial color={colors.front} />
                </mesh>
            )}

        </group>
    )
}