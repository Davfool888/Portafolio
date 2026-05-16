


type RotationCubeProps ={
    isRotate: boolean;
    setIsRotate: React.Dispatch<React.SetStateAction<boolean>>
}


export default function RotationCube({isRotate, setIsRotate}: RotationCubeProps){


return (

    <>
    <button
    onClick={()=>setIsRotate(prev => !prev)}
    style={{
          padding: "10px 30px",
          background: "#7c3aed",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer"
        }}
    >

        {isRotate ? "Stop Rotate": "Rotate"}
    </button>
    </>
)
}