import { useState } from 'react'
import './App.css'

import ExpandedCube from "./components/cube/ExpandedCube"
import RotationCube from './components/cube/RotationCube'
import RotationYellow from './components/cube/rotationFaces/RotationYellow'

import MainScene from './scenes/MainScene'

import { createCubeModel } from './logic/cubeModel'
import { rotateTopFace } from './logic/rubikEngine'


function App() {
  const [explode, setExplode] = useState(false)
  const [isRotate, setIsRotate] = useState(true)


  const [cubies, setCubies] = useState(createCubeModel())

  const [isAnimating, setIsAnimating] = useState(false)
  const [move, setMove] = useState<"U" | null>(null)

  const handleRotateTOp = () => {
    setCubies(prev => rotateTopFace(prev))
  }


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
        <RotationYellow onRotate={() => {
          if (isAnimating) return
          setMove("U")
          setIsAnimating(true)
        }} />
      </div>


    </div>
  )
}

export default App
