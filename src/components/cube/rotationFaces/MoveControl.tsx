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
    // Estado para gestionar cuál flecha está brillando
    const [hovered, setHovered] = useState<string | null>(null);

    // 1. Geometría de la flecha curva (TubeGeometry)
    const arrowCurveGeometry = useMemo(() => {
        const curve2D = new THREE.EllipseCurve(0, 0, 0.55, 0.55, 0, Math.PI / 1.5, false, 0);
        const points2D = curve2D.getPoints(32);
        // Mapeamos los puntos Vector2 a Vector3 paraTubeGeometry
        const points3D = points2D.map(p => new THREE.Vector3(p.x, p.y, 0));
        const curve3D = new THREE.CatmullRomCurve3(points3D);
        
        return new THREE.TubeGeometry(curve3D, 20, 0.025, 8, false); // Tubo delgado neón
    }, []);

    return (
        <group position={position} rotation={rotation}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3} >
                
                {/* A. DISCO ACRÍLICO (Base traslúcida) */}
                <mesh onClick={(e) => e.stopPropagation()}>
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

                {/* B. LETRA CENTRAL */}
                <Text
                    position={[0, 0.05, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    fontSize={0.35}
                    color="#ffffff"
                    fontWeight="bold"
                >
                    {label}
                </Text>

                {/* C. GRUPO HORARIO (Verde Menta Neón) */}
                <group 
                    position={[0, 0, 0]}
                    onClick={(e) => { e.stopPropagation(); onMove(label); }}
                    onPointerOver={() => { setHovered('cw'); document.body.style.cursor = 'pointer'; }}
                    onPointerOut={() => { setHovered(null); document.body.style.cursor = 'auto'; }}
                >
                    {/* Flecha visible */}
                    <mesh geometry={arrowCurveGeometry} rotation={[-Math.PI / 2, 0, -Math.PI / 4]} position={[0, 0.05, 0]}>
                        <meshStandardMaterial 
                            color="#00FFC6" 
                            emissive="#00FFC6" 
                            emissiveIntensity={hovered === 'cw' ? 5 : 2} // Feedback visual
                        />
                    </mesh>
                    {/* Punta de la flecha */}
                    <mesh position={[0.45, 0.05, 0.3]} rotation={[0, -Math.PI / 4, 0]}>
                        <coneGeometry args={[0.06, 0.12, 4]} />
                        <meshStandardMaterial color="#00FFC6" emissive="#00FFC6" emissiveIntensity={2} />
                    </mesh>
                    
                    {/* HITBOX INVISIBLE GRANDE (Para hacer clic fácil) */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.3, 0.03, 0.1]}>
                        <planeGeometry args={[0.8, 0.8]} />
                        <meshBasicMaterial visible={false} />
                    </mesh>
                </group>

                {/* D. GRUPO ANTI-HORARIO (Rosa Neón) */}
                <group 
                    position={[0, 0, 0]}
                    onClick={(e) => { e.stopPropagation(); onMove(`${label}'`); }}
                    onPointerOver={() => { setHovered('ccw'); document.body.style.cursor = 'pointer'; }}
                    onPointerOut={() => { setHovered(null); document.body.style.cursor = 'auto'; }}
                >
                    {/* Flecha visible */}
                    <mesh geometry={arrowCurveGeometry} rotation={[-Math.PI / 2, 0, Math.PI * 0.7]} position={[0, 0.05, 0]}>
                        <meshStandardMaterial 
                            color="#FF7EB9" 
                            emissive="#FF7EB9" 
                            emissiveIntensity={hovered === 'ccw' ? 5 : 2} // Feedback visual
                        />
                    </mesh>
                    {/* Punta de la flecha */}
                    <mesh position={[-0.45, 0.05, 0.3]} rotation={[0, Math.PI / 4, 0]}>
                        <coneGeometry args={[0.06, 0.12, 4]} />
                        <meshStandardMaterial color="#FF7EB9" emissive="#FF7EB9" emissiveIntensity={2} />
                    </mesh>

                    {/* HITBOX INVISIBLE GRANDE (Para hacer clic fácil) */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.3, 0.03, 0.1]}>
                        <planeGeometry args={[0.8, 0.8]} />
                        <meshBasicMaterial visible={false} />
                    </mesh>
                </group>

            </Float>
        </group>
    )
}