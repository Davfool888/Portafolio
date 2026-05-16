import { useEffect, useRef } from "react";
import { Group, MathUtils, Quaternion, Vector3, Euler, Matrix4 } from "three"
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { Cubie } from "../../logic/cubeModel";

type ScrollCubeControllerProps = {
    children: React.ReactNode
    cubies: Cubie[]
    projectIndex: number
    setProjectIndex: React.Dispatch<React.SetStateAction<number>>
}

export default function ScrollCubeController({ children, cubies, projectIndex, setProjectIndex }: ScrollCubeControllerProps) {

    const groupRef = useRef<Group>(null)
    const scroll = useScroll()


    const dragRot = useRef({ x: 0, y: 0 });
    const targetDragRot = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const lastMouse = useRef({ x: 0, y: 0 });

    const cameraVectors = useRef({
        screenRight: new Vector3(1, 0, 0),
        screenUp: new Vector3(0, 1, 0),
        alignQuat: new Quaternion(),
        targetNormal: new Vector3(0, 0, 1)
    })

    const handlePointerDown = (e: any) => {
        if (!scroll || scroll.offset < 0.2 || scroll.offset >= 0.4) return;
        isDragging.current = true;
        lastMouse.current = { x: e.clientX, y: e.clientY };
        document.body.style.cursor = 'grabbing';
        e.stopPropagation();
    };

    useEffect(() => {
        dragRot.current = { x: 0, y: 0 }
        targetDragRot.current = { x: 0, y: 0 }
    }, [projectIndex])


    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            if (!isDragging.current) return;
            const dx = e.clientX - lastMouse.current.x;
            const dy = e.clientY - lastMouse.current.y;
            lastMouse.current = { x: e.clientX, y: e.clientY };

            targetDragRot.current.x += dy * 0.01;
            targetDragRot.current.y += dx * 0.01;
        };

        const handlePointerUp = () => {
            if (!isDragging.current) return;
            isDragging.current = false;
            document.body.style.cursor = 'auto';

            // alineacion magnetica
            const snapX = Math.round(targetDragRot.current.x / (Math.PI / 2)) * (Math.PI / 2);
            const snapY = Math.round(targetDragRot.current.y / (Math.PI / 2)) * (Math.PI / 2);

            const qX = new Quaternion().setFromAxisAngle(cameraVectors.current.screenRight, snapX)
            const qY = new Quaternion().setFromAxisAngle(cameraVectors.current.screenUp, snapY)
            const dragQ = qY.multiply(qX)

            const finalQuat = cameraVectors.current.alignQuat.clone().premultiply(dragQ)

            const faces = [
                { id: "0_1_0", normal: new Vector3(0, 1, 0), index: 0 },
                { id: "0_-1_0", normal: new Vector3(0, -1, 0), index: 1 },
                { id: "0_0_1", normal: new Vector3(0, 0, 1), index: 2 },
                { id: "0_0_-1", normal: new Vector3(0, 0, -1), index: 3 },
                { id: "-1_0_0", normal: new Vector3(-1, 0, 0), index: 4 },
                { id: "1_0_0", normal: new Vector3(1, 0, 0), index: 5 }
            ]

            let bestIndex = projectIndex
            let maxDot = -Infinity

            faces.forEach(face => {
                const centerCubie = cubies.find(c => c.id === face.id)
                if (centerCubie) {
                    const localNormal = face.normal.clone().transformDirection(centerCubie.matrix).normalize()
                    const worldNormal = localNormal.clone().applyQuaternion(finalQuat).normalize()
                    const dot = worldNormal.dot(cameraVectors.current.targetNormal)

                    if (dot > maxDot) {
                        maxDot = dot
                        bestIndex = face.index
                    }
                }
            })

            if (bestIndex !== projectIndex && setProjectIndex) {
                setProjectIndex(bestIndex)
            } else {
                targetDragRot.current.x = snapX
                targetDragRot.current.y = snapY
            }
        };

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [projectIndex, cubies, setProjectIndex]);

    useFrame((state, delta) => {
        if (!groupRef.current || !scroll) return

        const offset = scroll.offset

        let targetX = 0
        let targetY = 0
        let targetZ = 0
        let targetScale = 1
        const targetQuat = new Quaternion()

        // home
        if (offset < 0.2) {
            const progress = offset / 0.2
            targetX = 2.5
            targetY = 1.15
            targetZ = 0
            targetScale = 0.70
            targetQuat.setFromEuler(new Euler(0, progress * Math.PI * 0.5, 0))

            // projects
        } else if (offset < 0.4) {
            const progress = (offset - 0.2) / 0.2

            // que llegue a la posicion rapido (en el 30% del scroll)
            const moveProgress = Math.min(progress / 0.3, 1.0)
            targetX = MathUtils.lerp(2.0, 0, moveProgress)
            targetY = MathUtils.lerp(0.5, 0, moveProgress)
            targetZ = 0

            let targetPieceId = "0_1_0"
            let faceNormal = new Vector3(0, 1, 0)
            let faceTop = new Vector3(0, 0, 1)

            if (projectIndex === 0) {
                targetPieceId = "0_1_0"
                faceNormal.set(0, 1, 0)
                faceTop.set(0, 0, 1)
            } else if (projectIndex === 1) {
                targetPieceId = "0_-1_0"
                faceNormal.set(0, -1, 0)
                faceTop.set(0, 0, -1)
            } else if (projectIndex === 2) {
                targetPieceId = "0_0_1"
                faceNormal.set(0, 0, 1)
                faceTop.set(0, 1, 0)
            } else if (projectIndex === 3) {
                targetPieceId = "0_0_-1"
                faceNormal.set(0, 0, -1)
                faceTop.set(0, 1, 0)
            } else if (projectIndex === 5) {
                targetPieceId = "1_0_0"
                faceNormal.set(1, 0, 0)
                faceTop.set(0, 1, 0)
            } else if (projectIndex === 4) {
                targetPieceId = "-1_0_0"
                faceNormal.set(-1, 0, 0)
                faceTop.set(0, 1, 0)
            }

            const targetCenter = cubies.find(c => c.id == targetPieceId)
            const alignQuat = new Quaternion()

            let screenRight = new Vector3(1, 0, 0)
            let screenUp = new Vector3(0, 1, 0)

            if (targetCenter) {
                const localNormal = faceNormal.clone().transformDirection(targetCenter.matrix).normalize()
                const localZ = faceTop.clone().transformDirection(targetCenter.matrix).normalize()
                const localX = new Vector3().crossVectors(localNormal, localZ).normalize()

                const targetNormal = state.camera.position.clone().sub(groupRef.current.position).normalize()
                const cameraUp = new Vector3(0, 1, 0).applyQuaternion(state.camera.quaternion).normalize()

                screenRight = new Vector3().crossVectors(cameraUp, targetNormal).normalize()
                const yAxis = targetNormal.clone()
                screenUp = new Vector3().crossVectors(screenRight, yAxis).normalize()

                const targetMatrix = new Matrix4().makeBasis(screenRight, yAxis, screenUp)
                const whiteMatrix = new Matrix4().makeBasis(localX, localNormal, localZ)

                const alingMatrix = targetMatrix.multiply(whiteMatrix.invert())
                alignQuat.setFromRotationMatrix(alingMatrix)

                cameraVectors.current.screenRight.copy(screenRight);
                cameraVectors.current.screenUp.copy(screenUp);
                cameraVectors.current.alignQuat.copy(alignQuat);
                cameraVectors.current.targetNormal.copy(targetNormal);
            } else {
                alignQuat.setFromEuler(new Euler(0.5, Math.PI * 0.5, 0))
            }

            const startQuat = new Quaternion().setFromEuler(new Euler(0, Math.PI * 0.5, 0));
            const endQuat = new Quaternion().setFromEuler(new Euler(0.5, Math.PI * 1.5, 0));

            if (progress < 0.3) {
                targetQuat.copy(startQuat).slerp(alignQuat, progress / 0.3);
                targetScale = MathUtils.lerp(0.75, 0.8, progress / 0.3);


                targetDragRot.current.x = 0;
                targetDragRot.current.y = 0;
                dragRot.current.x = 0;
                dragRot.current.y = 0;
            } else if (progress < 0.8) {

                dragRot.current.x = MathUtils.damp(dragRot.current.x, targetDragRot.current.x, 6, delta);
                dragRot.current.y = MathUtils.damp(dragRot.current.y, targetDragRot.current.y, 6, delta);

                const qX = new Quaternion().setFromAxisAngle(screenRight, dragRot.current.x);
                const qY = new Quaternion().setFromAxisAngle(screenUp, dragRot.current.y);
                const dragQ = qY.multiply(qX);

                targetQuat.copy(alignQuat).premultiply(dragQ);
                targetScale = 0.8;
            } else {

                targetQuat.copy(alignQuat).slerp(endQuat, (progress - 0.8) / 0.2);
                targetScale = MathUtils.lerp(0.8, 1, (progress - 0.8) / 0.2);
            }

            // about
        } else if (offset < 0.6) {
            const progress = (offset - 0.4) / 0.2
            targetX = -5
            targetY = -1
            targetZ = 2
            targetScale = 1
            targetQuat.setFromEuler(new Euler(MathUtils.lerp(0.5, 0, progress), Math.PI * 1.5 + progress * Math.PI, 0))
            dragRot.current.x = 0;
            dragRot.current.y = 0;
            targetDragRot.current.x = 0;
            targetDragRot.current.y = 0;
            // contact
        } else if (offset < 0.8) {
            const progress = (offset - 0.6) / 0.2
            targetX = 2.5
            targetY = 0
            targetZ = 0
            targetScale = 0.85
            targetQuat.setFromEuler(new Euler(0, Math.PI * 2.5 + progress * Math.PI * 0.5, 0))

            // play
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

        const currentScale = MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta)
        groupRef.current.scale.setScalar(currentScale)

        groupRef.current.quaternion.slerp(targetQuat, 4 * delta)
    })

    return (
        <group ref={groupRef} onPointerDown={handlePointerDown}>
            {children}
        </group>
    )

}