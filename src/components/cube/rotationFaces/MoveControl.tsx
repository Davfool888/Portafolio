import { Text, Float } from "@react-three/drei"
import * as THREE from "three"
import { useMemo, useState } from "react"

type MoveControlProps = {
    label: string;
    position: [number, number, number];
    rotation: [number, number, number];
    onMove: (move: string) => void;
}

export default function MoveControl({ label, position, rotation, onMove }: MoveControlProps) {
    // estado para ver que flecha brilla
    const [hovered, setHovered] = useState<string | null>(null);

    // geometria 3d para la flecha
    const arrowGeometry = useMemo(() => {
        const shape = new THREE.Shape();
        
        const A = 0.2; // inicio del arco
        const C = Math.PI - 0.2; // punta de la flecha
        const B = C - 0.3; // base de la punta
        
        const R_mid = 0.55;
        const R_out = 0.59;
        const R_in = 0.51;
        const R_head_out = 0.66;
        const R_head_in = 0.44;
        
        // dibujo de la flecha
        shape.absarc(0, 0, R_out, A, B, false);
        shape.lineTo(R_head_out * Math.cos(B), R_head_out * Math.sin(B));
        shape.lineTo(R_mid * Math.cos(C), R_mid * Math.sin(C));
        shape.lineTo(R_head_in * Math.cos(B), R_head_in * Math.sin(B));
        shape.lineTo(R_in * Math.cos(B), R_in * Math.sin(B));
        shape.absarc(0, 0, R_in, B, A, true);
        shape.lineTo(R_out * Math.cos(A), R_out * Math.sin(A));

        return new THREE.ExtrudeGeometry(shape, {
            depth: 0.02,
            bevelEnabled: true,
            bevelSegments: 4,
            steps: 1,
            bevelSize: 0.006,
            bevelThickness: 0.006
        });
    }, []);

    return (
        <group position={position} rotation={rotation}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3} >
                
                {/* disco con diseño acrilico */}
                <mesh>
                    <cylinderGeometry args={[0.75, 0.75, 0.04, 32]} />
                    <meshPhysicalMaterial
                        transparent
                        opacity={0.3}
                        transmission={0.9} 
                        roughness={0.05}
                        thickness={0.5}
                        color="#ffffff"
                    />
                </mesh>

                {/* letra de indicacion */}
                <Text
                    position={[0, 0.05, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    fontSize={0.35}
                    color="#ffffff"
                    fontWeight="bold"
                >
                    {label}
                </Text>

                {/* grupo horario */}
                <group 
                    onClick={(e) => { e.stopPropagation(); onMove(label); }}
                    onPointerOver={() => { setHovered('cw'); document.body.style.cursor = 'pointer'; }}
                    onPointerOut={() => { setHovered(null); document.body.style.cursor = 'auto'; }}
                >
                    <mesh 
                        geometry={arrowGeometry} 
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]} 
                        scale={[1, -1, 1]}
                        position={[0, 0.05, 0]}
                    >
                        <meshStandardMaterial 
                            color="#00FFC6" 
                            emissive="#00FFC6" 
                            emissiveIntensity={hovered === 'cw' ? 4 : 1.5}
                            roughness={0.2}
                            metalness={0.5}
                        />
                    </mesh>
                    
                    {/* hitbox */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.55, 0.05, 0]}>
                        <planeGeometry args={[0.4, 1.2]} />
                        <meshBasicMaterial visible={false} />
                    </mesh>
                </group>

                {/* grupo antihorario */}
                <group 
                    onClick={(e) => { e.stopPropagation(); onMove(`${label}'`); }}
                    onPointerOver={() => { setHovered('ccw'); document.body.style.cursor = 'pointer'; }}
                    onPointerOut={() => { setHovered(null); document.body.style.cursor = 'auto'; }}
                >
                    <mesh 
                        geometry={arrowGeometry} 
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]} 
                        position={[0, 0.05, 0]}
                    >
                        <meshStandardMaterial 
                            color="#FF7EB9" 
                            emissive="#FF7EB9" 
                            emissiveIntensity={hovered === 'ccw' ? 4 : 1.5}
                            roughness={0.2}
                            metalness={0.5}
                        />
                    </mesh>

                    {/* hitbox */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.55, 0.05, 0]}>
                        <planeGeometry args={[0.4, 1.2]} />
                        <meshBasicMaterial visible={false} />
                    </mesh>
                </group>

            </Float>
        </group>
    )
}