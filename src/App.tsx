import { useState } from 'react'
import './App.css'

import ExpandedCube from "./components/cube/ExpandedCube"
import RotationCube from './components/cube/RotationCube'
import RotationU from './components/cube/rotationFaces/MoveButton'
import MoveButton from './components/cube/rotationFaces/MoveButton'
import MainScene from './scenes/MainScene'

import { createCubeModel } from './logic/cubeModel'

export type MoveType = "U" | "R" | "F" | "L" | "D" | "B" | "U'" | "R'" | "F'" | "L'" | "D'" | "B'"

function App() {
  const [explode, setExplode] = useState(false)
  const [isRotate, setIsRotate] = useState(true)


  const [cubies, setCubies] = useState(createCubeModel())

  const [isAnimating, setIsAnimating] = useState(false)
  const [move, setMove] = useState<MoveType| null>(null)

 const handleMove = (m: MoveType) =>{
  if(isAnimating) return
  setMove(m)
  setIsAnimating(true)
 }
 const moveList: MoveType[] = ["U", "R", "F","B","D","L", "U'", "R'", "F'", "B'",  "D'",  "L'"]

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>

      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <MainScene
          cubies={cubies}
          explode={explode}
          isRotate={isRotate}
          move={move}
          isAnimating={isAnimating}
          setCubies={setCubies}
          setIsAnimating={setIsAnimating}
          setMove={setMove} />

      </div>


      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 10, display: "flex", flexDirection: "column", gap: "10px" }}>
        <ExpandedCube explode={explode} setExplode={setExplode} />
        <RotationCube isRotate={isRotate} setIsRotate={setIsRotate} />
        <hr style={{ border: "0.5px solid rgba(255,255,255,0.2)", width: "100%" }} />
        <div>
          {moveList.map((m)=>(
            <MoveButton
            key={m}
            label={m}
            onRotate={(selectedMove) => handleMove(selectedMove)}
            />
          ))}
        </div>

       
      </div>


    </div>
  )
}

export default App
