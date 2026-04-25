


type ExpandedCubeProps ={
    explode:boolean
    setExplode: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ExpandedCube({explode, setExplode}: ExpandedCubeProps){
  
    

    return(
        <>
        <button
        
        onClick={() => setExplode(prev => !prev)}
        style={{
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

        </>
    )
}