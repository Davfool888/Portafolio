
type MoveType = "U" | "R" | "F" | "L" | "D" | "B" | "U'" | "R'" | "F'" | "L'" | "D'" | "B'" 

type MoveButtonProps = {
    label: MoveType
    onRotate: (move: MoveType)=> void
    
}

export default function MoveButton({ onRotate, label }: MoveButtonProps) {
    return (
        <>
            <button
                onClick={() => onRotate(label)}
                style={{
                    padding: "10px 20px",
                    background: label.includes("'") ? "#4b5563" : "#7c3aed",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer"
                }}
            >{label}

            </button >
        </>
    )
}