import { useState } from "react";
import { rotate } from "three/tsl";




export default function RotationCube({isRotate, setIsRotate}){


return (

    <>
    <button
    onClick={()=>setIsRotate(!isRotate)}
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

        {isRotate ? "Stop Rotate": "Rotate"}
    </button>
    </>
)
}