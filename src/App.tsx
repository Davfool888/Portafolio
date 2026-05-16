import { useEffect, useState, useRef} from "react"
import { Canvas } from "@react-three/fiber"
import { ScrollControls, Scroll } from "@react-three/drei"

import HomeSection from "./components/home/HomeSection"

import Navbar from "./components/layauot/Navbar"
import FloatingTags from "./components/ui/FloatingTags"

import WorkSection from "./components/home/WorkSection"
import AboutSection from "./components/home/AboutSection"
import ContactSection from "./components/home/ContactSection"
import PlaySection from "./components/home/PlaySection"

import MainScene from "./scenes/MainScene"

import { createCubeModel } from "./logic/cubeModel"
import type { MoveType } from "./types/cube.types"

import { checkerboardPattern, checkerboardPatternInverse, interChangeCubeMid, interChangeCubeMidInverse, turntwofortwo, turntwofortwoInverse, Tpatron, TpatronInverse } from "./data/cubePatterns"



const ABOUT_PATTERNS: [MoveType[], MoveType[]][] = [
  [checkerboardPattern, checkerboardPatternInverse],
  [interChangeCubeMid, interChangeCubeMidInverse],
  [turntwofortwo, turntwofortwoInverse],
  [Tpatron, TpatronInverse],
]

function App() {

  // Secciones de mi navbar
  const sections = ["home", "work", "about", "contact", "play"]

  // Estado para mover los colores de los index del navbar y asi saber en que seccion se esta posicionado
  const [activeSection, setActiveSection] = useState("home")
  // Estado de scroll
  const [scrollReady, setScrollReady] = useState(false)

  // estado para expandir el cubo

  // estado para girar el cubo, no utilizado en este momento
  const [isRotate, setIsRotate] = useState(true)

  const [cubies, setCubies] = useState(createCubeModel())
  const [isAnimating, setIsAnimating] = useState(false)
  const [move, setMove] = useState<MoveType | null>(null)

  // Estado para mover mi cubo a medida de que se mueve los diferente projectos
  const [projectIndex, setProjectIndex] = useState(0)

  // estado para patrones del cubo se ejecuten cuando lleguen al WorkSection
  const [patternQueue, setPatternQueue] = useState<MoveType[]>([])
  // estado para intercambiar los patrones del cubo cada 10s
  const [aboutPatternIndex, setAboutPatternIndex] = useState(0)
  const [aboutPhase, setAboutPhase] = useState<"idle" | "playing" | "undoing">("idle")

  // Nuevos estados para sincronizacion de transiciones con cube moves, historyStack para llevar un registros de los movimientos ejecutados en home y isUndoing, para saber si el cubo esta viajando en el tiempo hacia atras

  const [mainTitleToggle, setMainTitleToggle] = useState(false)
  const [skillsCarouselIndex, setSkillsCarouselIndex] = useState(0)
 const isReversePatternRef = useRef(false)
 
  useEffect(() => {
  if (activeSection !== "home") return

  const injectPattern = () => {

    if (!isReversePatternRef.current) {
      setPatternQueue(q => [
        ...q,
        "D",
        "U'",
        "F",
        "B'",
        "R",
        "L'",
        "N'"
      ])
    } else {
      setPatternQueue(q => [
        ...q,
        "N",
        "L",
        "R'",
        "B",
        "F'",
        "U",
        "D'"
      ])
    }

    isReversePatternRef.current =
      !isReversePatternRef.current
  }

  injectPattern()

  const interval = setInterval(injectPattern, 6000)

  return () => clearInterval(interval)

}, [activeSection])




  const scrollElRef = useRef<HTMLElement | null>(null)

  const totalPages = 5

  // Reajuste de scroll para arreglar bug de no change of section
  const sectionOffsets: Record<string, number> = {
    home: 0 / totalPages,
    work: 1 / totalPages,
    about: 2 / totalPages,
    contact: 3 / totalPages,
    play: 4 / totalPages,
  }

  useEffect(() => {
    if (activeSection === "about") {
      const [firstPattern] = ABOUT_PATTERNS[0]
      setAboutPatternIndex(0)
      setAboutPhase("playing")
      setPatternQueue(firstPattern)
    } else {
      setAboutPhase("idle")
      setPatternQueue([])
    }
  }, [activeSection])

  // Activa la rotación manual del cubo solo en las secciones deseadas (Home y About)
  useEffect(() => {
    if (activeSection === "home" || activeSection === "about") {
      setIsRotate(true)
    } else {
      setIsRotate(false)
    }
  }, [activeSection])

  useEffect(() => {
    if (activeSection !== "about" || aboutPhase !== "playing") return

    const timer = setTimeout(() => {
      const [, inversePattern] = ABOUT_PATTERNS[aboutPatternIndex]
      setAboutPhase("undoing")
      setPatternQueue(inversePattern)
    }, 10_000)

    return () => clearTimeout(timer)
  }, [activeSection, aboutPhase, aboutPatternIndex])



  useEffect(() => {
    if (activeSection !== "about" || aboutPhase !== "undoing") return
    if (patternQueue.length > 0 || isAnimating) return

    const nextIndex = (aboutPatternIndex + 1) % ABOUT_PATTERNS.length

    const [nextPattern] = ABOUT_PATTERNS[nextIndex]
    setAboutPatternIndex(nextIndex)
    setAboutPhase("playing")
    setPatternQueue(nextPattern)
  }, [activeSection, aboutPhase, patternQueue.length, isAnimating, aboutPatternIndex])

  // Este se encarga de ejecutar los movimiento en todo el cubo
  useEffect(() => {
    if (!isAnimating && patternQueue.length > 0) {
      const nextMove = patternQueue[0]
      setMove(nextMove)
      setIsAnimating(true)
      setPatternQueue(prev => prev.slice(1))

      if (activeSection === "home") {
        const moveBase = nextMove.replace("'", "")

        if(moveBase === "U" ) {
          setMainTitleToggle(prev => !prev)
        }

        if (["L", "R", "M", "N", "W"].includes(moveBase)){
          setSkillsCarouselIndex(prev => prev + 1)
        }

      }


    }
  }, [isAnimating, patternQueue, setMove, setIsAnimating, activeSection])



  useEffect(() => {
    const el = scrollElRef.current
    if (!el) return
    const handleScroll = () => {
      const offset = el.scrollTop / el.scrollHeight
      if (offset < 0.2) setActiveSection("home")
      else if (offset < 0.4) setActiveSection("work")
      else if (offset < 0.6) setActiveSection("about")
      else if (offset < 0.8) setActiveSection("contact")
      else setActiveSection("play")
    }
    el.addEventListener("scroll", handleScroll)
    return () => el.removeEventListener("scroll", handleScroll)
  }, [scrollReady])




  const scrollToSection = (id: string) => {

    if (!scrollElRef.current) return

    const offset = sectionOffsets[id]
    if (offset === undefined) return

    const targetScrolltop = offset * scrollElRef.current.scrollHeight

    scrollElRef.current.scrollTo({
      top: targetScrolltop,
      behavior: "smooth"
    })

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
          scrollElRef={scrollElRef}
          scrollReady={scrollReady}
        />     
      </div>
      
      <FloatingTags/>

      {/* 3D Canvas Global */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [4, 4, 4], fov: 50 }}>
          <ScrollControls pages={5} damping={0.2}>

            <MainScene
              cubies={cubies}
              isRotate={isRotate}
              move={move}
              isAnimating={isAnimating}
              setCubies={setCubies}
              setIsAnimating={setIsAnimating}
              setMove={setMove}
              projectIndex={projectIndex}
              setProjectIndex={setProjectIndex}
              scrollElRef={scrollElRef}
              onScrollReady={() => setScrollReady(true)}
              activeSection={activeSection}
            />

            <Scroll html style={{ width: '100vw' }}>
              <div className="pointer-events-auto">
                <div className="outline outline-2 outline-red-500 outline-dashed relative">
                  <HomeSection setActiveSection={setActiveSection} mainTitleToggle={mainTitleToggle} skillsCarouselIndex={skillsCarouselIndex} />
                  {/* etiqueta para identificar */}
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold z-[9999]">Inicio de HOME</span>
                </div>
                <div className="outline outline-2 outline-blue-500 outline-dashed relative">
                  <WorkSection setActiveSection={setActiveSection} projectIndex={projectIndex} setProjectIndex={setProjectIndex} />
                  <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded font-bold z-[9999]">Inicio de WORK</span>
                </div>
                <div className="outline outline-2 outline-green-500 outline-dashed relative">
                  <AboutSection setActiveSection={setActiveSection} />
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded font-bold z-[9999]">Inicio de ABOUT</span>
                </div>
                <div className="outline outline-2 outline-purple-500 outline-dashed relative">
                  <ContactSection setActiveSection={setActiveSection} />
                  <span className="absolute top-2 left-2 bg-purple-500 text-white text-xs px-2 py-1 rounded font-bold z-[9999]">Inicio de CONTACT</span>
                </div>
                <div className="outline outline-2 outline-orange-500 outline-dashed relative">
                  <PlaySection setActiveSection={setActiveSection} />
                  <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded font-bold z-[9999]">Inicio de PLAY</span>
                </div>
              </div>
            </Scroll>

          </ScrollControls>
        </Canvas>
      </div>

    </div>
  )
}

export default App