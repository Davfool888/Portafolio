import { Matrix4, Mesh } from "three"
import { RoundedBox } from "@react-three/drei"
import { useEffect, useMemo, useRef, useState } from "react"



type Props = {
    matrix: Matrix4
    colors: {
        right?: string
        left?: string
        top?: string
        bottom?: string
        front?: string
        back?: string
    }
}

export default function CubePiece({ matrix, colors = {} }: Props) {


    const ref = useRef<any>(null!)
    // useState Y Hover para seleccionar cubos de manera individual
    const [hovered, setHovered] = useState(false)
    const stickerOffset = 0.49

    const faceColors = useMemo(() => ({
        right: colors.right,
        left: colors.left,
        top: colors.top,
        bottom: colors.bottom,
        front: colors.front,
        back: colors.back,
    }), [colors])

    useEffect(()=>{
        if(!ref.current) return
            ref.current.matrixAutoUpdate = false
            ref.current.matrix.copy(matrix)
            ref.current.matrixWorldNeedsUpdate = true
        
    }, [matrix])




    return (
        <group ref={ref}  onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>


            {/* Color principal del cubo */}
            <RoundedBox args={[0.96, 0.96, 0.96]} radius={0.2} smoothness={4}>
                <meshStandardMaterial roughness={0.5} color={hovered ? "#c0dd30" : "#ffffff"} />
            </RoundedBox>

            {/* Color derecha o RIGHT */}
            {faceColors.right && (
                <mesh position={[stickerOffset, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <planeGeometry args={[0.6, 0.6]} />
                    <meshStandardMaterial color={faceColors.right} />
                </mesh>
            )}


            {faceColors.left && (
                <mesh position={[-stickerOffset, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
                    <planeGeometry args={[0.6, 0.6]} />
                    <meshStandardMaterial color={faceColors.left} />
                </mesh>
            )}

            {faceColors.top && (
                <mesh position={[0, stickerOffset, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[0.6, 0.6]} />
                    <meshStandardMaterial color={faceColors.top} />
                </mesh>
            )}

            {faceColors.bottom && (
                <mesh position={[0, -stickerOffset, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[0.6, 0.6]} />
                    <meshStandardMaterial color={faceColors.bottom} />
                </mesh>
            )}

            {faceColors.back && (
                <mesh position={[0, 0, -stickerOffset]} rotation={[0, Math.PI, 0]}>
                    <planeGeometry args={[0.6, 0.6]} />
                    <meshStandardMaterial color={faceColors.back} />
                </mesh>
            )}


            {faceColors.front && (
                <mesh position={[0, 0, stickerOffset]} >
                    <planeGeometry args={[0.6, 0.6]} />
                    <meshStandardMaterial color={faceColors.front} />
                </mesh>
            )}

        </group>
    )
}