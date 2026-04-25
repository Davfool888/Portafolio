import type { Cubie } from "../../../logic/cubeModel"
import { rotateTopFace } from "../../../logic/rubikEngine"

type RotationYellowProps = {
    onRotate: ()=> void
}

export default function RotationYellow({ onRotate }: RotationYellowProps) {
    return (
        <>
            <button
                onClick={onRotate}
                style={{
                    padding: "10px 20px",
                    background: "#7c3aed",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer"
                }}
            >RotateYellow

            </button >
        </>
    )
}