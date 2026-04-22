import { useState } from "react";
import MainScene from "../../scenes/MainScene";


type ExpandedCubeProps ={
    isRotate:boolean
}

export default function ExpandedCube({isRotate}: ExpandedCubeProps){
    const [explode, setExplode] = useState(false)
    

    return(
        <>
        <button
        
        onClick={() => setExplode(!explode)}
        style={{
            position: "absolute",
          top: 20,
          left: 20,
          zIndex: 10,
          padding: "10px 20px",
          background: "#7c3aed",
          color: "white",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer"
        }}
        >

            {explode ? "Unir Cubo": "Separar cubo"}

        </button>

        <MainScene explode={explode}/>
        </>
    )
}