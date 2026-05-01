import { useRef } from "react";
import { Group, MathUtils, Quaternion, Vector3, Euler } from "three"
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Cubie } from "../../logic/cubeModel";


export default function ScrollCubeController({ children, cubies }: { children: React.ReactNode, cubies: Cubie[] }) {

    const groupRef = useRef<Group>(null)
    const scroll = useScroll()

    useFrame((state, delta) => {
        if (!groupRef.current || !scroll) return

        const offset = scroll.offset

        let targetX = 0
        let targetY = 0
        let targetZ = 0
        const targetQuat = new Quaternion()

        // HOME
        if (offset < 0.2) {
            const progress = offset / 0.2
            targetX = 2.5
            targetY = 0
            targetZ = 0
            targetQuat.setFromEuler(new Euler(0, progress * Math.PI * 0.5, 0))

        // WORK
        } else if (offset < 0.4) {
            const progress = (offset - 0.2) / 0.2

            // Hacemos que llegue a su posición final más rápido (en el primer 30% del scroll de la sección)
            const moveProgress = Math.min(progress / 0.3, 1.0)
            targetX = MathUtils.lerp(2.5, -2.5, moveProgress)
            targetY = 0
            targetZ = 0

            const whiteCenter = cubies.find(c => c.id === "0_1_0");
            const alignQuat = new Quaternion();
            
            if (whiteCenter) {
                const localNormal = new Vector3(0, 1, 0).transformDirection(whiteCenter.matrix).normalize();
                const targetNormal = state.camera.position.clone().sub(groupRef.current.position).normalize();
                alignQuat.setFromUnitVectors(localNormal, targetNormal);
            } else {
                alignQuat.setFromEuler(new Euler(0.5, Math.PI * 0.5, 0));
            }

            const startQuat = new Quaternion().setFromEuler(new Euler(0, Math.PI * 0.5, 0));
            const endQuat = new Quaternion().setFromEuler(new Euler(0.5, Math.PI * 1.5, 0));
            
            if (progress < 0.3) {
                // Blend from HOME to alignQuat while moving
                targetQuat.copy(startQuat).slerp(alignQuat, progress / 0.3);
            } else if (progress < 0.8) {
                // Pause completely (position and rotation) for a longer time
                targetQuat.copy(alignQuat);
            } else {
                // Blend from alignQuat to ABOUT rotation
                targetQuat.copy(alignQuat).slerp(endQuat, (progress - 0.8) / 0.2);
            }

        // ABOUT
        } else if (offset < 0.6) {
            const progress = (offset - 0.4) / 0.2
            targetX = MathUtils.lerp(-2.5, 0, progress)
            targetY = 0
            targetZ = MathUtils.lerp(0, -2, progress)
            targetQuat.setFromEuler(new Euler(MathUtils.lerp(0.5, 0, progress), Math.PI * 1.5 + progress * Math.PI, 0))

        // CONTACT
        } else if (offset < 0.8) {
            const progress = (offset - 0.6) / 0.2
            targetX = 0
            targetY = MathUtils.lerp(0, -1.5, progress)
            targetZ = MathUtils.lerp(-2, 0, progress)
            targetQuat.setFromEuler(new Euler(0, Math.PI * 2.5 + progress * Math.PI * 0.5, 0))

        // PLAY
        } else {
            const progress = (offset - 0.8) / 0.2
            targetX = MathUtils.lerp(0, 0, progress)
            targetY = MathUtils.lerp(-1.5, 0, progress)
            targetZ = MathUtils.lerp(0, 0, progress)
            targetQuat.setFromEuler(new Euler(0, MathUtils.lerp(Math.PI * 3, Math.PI * 3.5, progress), 0))
        }

        groupRef.current.position.x = MathUtils.damp(groupRef.current.position.x, targetX, 4, delta)
        groupRef.current.position.y = MathUtils.damp(groupRef.current.position.y, targetY, 4, delta)
        groupRef.current.position.z = MathUtils.damp(groupRef.current.position.z, targetZ, 4, delta)

        groupRef.current.quaternion.slerp(targetQuat, 4 * delta)
    })

    return (
        <group ref={groupRef}>
            {children}
        </group>
    )

}