import React, { useState } from "react";
import { rotate } from "three/tsl";



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
        position: "absolute",
          top: 20,
          left: 10,
          zIndex: 10,
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