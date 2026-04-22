import { useState } from 'react'
import './App.css'
import ExpandedCube from "./components/cube/ExpandedCube"
import RotationCube from './components/cube/RotationCube'
import MainScene from './scenes/MainScene'

function App() {
  const [explode, setExplode] = useState(false)
  const [isRotate, setIsRotate] = useState(true)
  return(
  <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
  
  <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
  <MainScene explode={explode} isRotate={isRotate}/>
  <ExpandedCube  isRotate={isRotate}/>
  </div>

  <div style={{ position: "absolute", top: 50, left: 20, zIndex: 10 }}>
    <RotationCube isRotate={isRotate} setIsRotate={setIsRotate} />
  </div>

  
</div>
)}

export default App
