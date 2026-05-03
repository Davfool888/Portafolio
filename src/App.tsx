import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { ScrollControls, Scroll } from "@react-three/drei"

import HomeSection from "./components/home/HomeSection"
import Navbar from "./components/layauot/Navbar"
import WorkSection from "./components/home/WorkSection"
import AboutSection from "./components/home/AboutSection"
import ContactSection from "./components/home/ContactSection"
import PlaySection from "./components/home/PlaySection"

import MainScene from "./scenes/MainScene"

import { createCubeModel } from "./logic/cubeModel"
import type { MoveType } from "./types/cube.types"


function App() {

  // Secciones de mi navbar
  const sections = ["home", "work", "about", "contact", "play"]

  // Estado para mover los colores de los index del navbar y asi saber en que seccion se esta posicionado
  const [activeSection, setActiveSection] = useState("home")

  // estado para expandir el cubo
  const [explode, setExplode] = useState(false)
  // estado para girar el cubo, no utilizado en este momento
  const [isRotate, setIsRotate] = useState(true)

  const [cubies, setCubies] = useState(createCubeModel())
  // estado para la animacion de movimiento dle cubo, no movimiento real
  const [isAnimating, setIsAnimating] = useState(false)
  const [move, setMove] = useState<MoveType | null>(null)

  // Estado para mover mi cubo a medida de que se mueve los diferente projectos
  const [projectIndex, setProjectIndex] = useState(0)

  const scrollToSection = (id: string) => {

    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }



  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#f8f3ff] via-[#fff5f7] to-[#f0fdf9]">

      {/* Luces (Fondo fijo) */}
      <div className="fixed top-20 left-10 w-40 h-40 rounded-full bg-[#c471ed]/20 blur-3xl pointer-events-none" />
      <div className="fixed bottom-40 right-20 w-48 h-48 rounded-full bg-[#ff6b9d]/20 blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 left-1/3 w-32 h-32 rounded-full bg-[#4ecdc4]/15 blur-2xl pointer-events-none" />

      {/* Navbar arriba */}
      <div className="fixed top-0 left-0 w-full z-50 pointer-events-auto">
        <Navbar
          sections={sections}
          onNavigate={scrollToSection}
          activeSection={activeSection}
        />
      </div>

      {/* 3D Canvas Global */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [4, 4, 4], fov: 50 }}>
          <ScrollControls pages={5} damping={0.2}>

            <MainScene
              cubies={cubies}
              explode={explode}
              isRotate={isRotate}
              move={move}
              isAnimating={isAnimating}
              setCubies={setCubies}
              setIsAnimating={setIsAnimating}
              setMove={setMove}
              projectIndex={projectIndex}
              setProjectIndex={setProjectIndex}
            />

            <Scroll html style={{ width: '100vw' }}>
              <div className="pointer-events-auto">
                <HomeSection setActiveSection={setActiveSection} />
                <WorkSection setActiveSection={setActiveSection} projectIndex={projectIndex} setProjectIndex={setProjectIndex}/>
                <AboutSection setActiveSection={setActiveSection} />
                <ContactSection setActiveSection={setActiveSection} />
                <PlaySection setActiveSection={setActiveSection} />
              </div>
            </Scroll>

          </ScrollControls>
        </Canvas>
      </div>

    </div>
  )
}

export default App