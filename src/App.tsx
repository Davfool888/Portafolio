import { useEffect, useState, useRef} from "react"
import { Canvas } from "@react-three/fiber"
import { ScrollControls, Scroll } from "@react-three/drei"

import HomeSection from "./components/home/HomeSection"

import Navbar from "./components/layauot/Navbar"
import FloatingTags from "./components/ui/FloatingTags"

import ProjectsSection from "./components/home/ProjectsSection"
import AboutSection from "./components/home/AboutSection"
import ContactSection from "./components/home/ContactSection"
import PlaySection from "./components/home/PlaySection"

import MainScene from "./scenes/MainScene"

import { createCubeModel } from "./logic/cubeModel"
import type { MoveType } from "./types/cube.types"

import { useScrollSnap } from "./hooks/useScrollSnap"

import {
  SECTION_IDS,
  SCROLL_PAGES,
  getSectionScrollTops,
  getSectionIdFromOffset,
  toNormalizedOffset
} from "./data/sectionsConfig"

import { checkerboardPattern, checkerboardPatternInverse, interChangeCubeMid, interChangeCubeMidInverse, turntwofortwo, turntwofortwoInverse, Tpatron, TpatronInverse } from "./data/cubePatterns"
import { LanguageProvider } from "./context/LanguageContext"



const ABOUT_PATTERNS: [MoveType[], MoveType[]][] = [
  [checkerboardPattern, checkerboardPatternInverse],
  [interChangeCubeMid, interChangeCubeMidInverse],
  [turntwofortwo, turntwofortwoInverse],
  [Tpatron, TpatronInverse],
]

function App() {

  // Secciones que usa el navbar para el desplazamiento
  const sections = SECTION_IDS

  // Estado para saber en que seccion esta el usuario
  const [activeSection, setActiveSection] = useState<string>("home")

  // Estado para saber cuando el scroll ya esta listo
  const [scrollReady, setScrollReady] = useState(false)

  // Estado del giro manual del cubo
  const [isRotate, setIsRotate] = useState(true)

  const [cubies, setCubies] = useState(createCubeModel())
  const [isAnimating, setIsAnimating] = useState(false)
  const [move, setMove] = useState<MoveType | null>(null)

  // Estado para cambiar los projectos
  const [projectIndex, setProjectIndex] = useState(0)

  // Cola de movimientos del cubo
  const [patternQueue, setPatternQueue] = useState<MoveType[]>([])

  // Estado del patron actual del cubo en about
  const [aboutPatternIndex, setAboutPatternIndex] = useState(0)

  // Estado para saber si el patron esta haciendo ida o vuelta
  const [aboutPhase, setAboutPhase] = useState<"idle" | "playing" | "undoing">("idle")

  // Estado para alternar el titulo principal
  const [mainTitleToggle, setMainTitleToggle] = useState(false)

  // Estado del carrusel de skills
  const [skillsCarouselIndex, setSkillsCarouselIndex] = useState(0)

  // Estado del modo oscuro
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Estado del idioma global de la pagina
  const [language, setLanguage] = useState<"es" | "en">(() => {
    const saved = localStorage.getItem('portfolio_language')
    return (saved === 'en' || saved === 'es') ? saved : 'es'
  })

  // Funcion para cambiar el idioma
  const toggleLanguage = () => {
    setLanguage(prev => {
      const next = prev === 'es' ? 'en' : 'es'
      localStorage.setItem('portfolio_language', next)
      return next
    })
  }

  const isReversePatternRef = useRef(false)
 
  useEffect(() => {
    if (activeSection !== "home") return

    const injectPattern = () => {

      // Ejecuta el patron normal
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

        // Ejecuta el patron inverso
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

  // Estado del scroll magnetico
  const [magneticScroll, setMagneticScroll] = useState(() => {
    const saved = localStorage.getItem('portfolio_magnetic_scroll')
    return saved !== 'off'
  })

  // Activa o desactiva el scroll magnetico
  const toggleMagneticScroll = () => {
    setMagneticScroll(prev => {
      const next = !prev
      localStorage.setItem('portfolio_magnetic_scroll', next ? 'on' : 'off')
      return next
    })
  }

  // Jala el scroll al limite de la seccion mas cercana
  useScrollSnap({
    scrollElRef,
    scrollReady,
    enabled: magneticScroll
  })

  useEffect(() => {

    // Cuando entra a about activa el primer patron
    if (activeSection === "about") {
      const [firstPattern] = ABOUT_PATTERNS[0]

      setAboutPatternIndex(0)
      setAboutPhase("playing")
      setPatternQueue(firstPattern)

    } else {

      // Limpia los estados cuando sale de about
      setAboutPhase("idle")
      setPatternQueue([])
    }

  }, [activeSection])

  useEffect(() => {

    // Activa el giro manual solo en ciertas secciones
    if (activeSection === "home" || activeSection === "about") {
      setIsRotate(true)
    } else {
      setIsRotate(false)
    }

  }, [activeSection])

  useEffect(() => {
    if (activeSection !== "about" || aboutPhase !== "playing") return

    const timer = setTimeout(() => {

      // Ejecuta el patron inverso despues de un tiempo
      const [, inversePattern] = ABOUT_PATTERNS[aboutPatternIndex]

      setAboutPhase("undoing")
      setPatternQueue(inversePattern)

    }, 10_000)

    return () => clearTimeout(timer)

  }, [activeSection, aboutPhase, aboutPatternIndex])



  useEffect(() => {

    // Espera a que termine el patron actual para pasar al siguiente
    if (activeSection !== "about" || aboutPhase !== "undoing") return
    if (patternQueue.length > 0 || isAnimating) return

    const nextIndex = (aboutPatternIndex + 1) % ABOUT_PATTERNS.length

    const [nextPattern] = ABOUT_PATTERNS[nextIndex]

    setAboutPatternIndex(nextIndex)
    setAboutPhase("playing")
    setPatternQueue(nextPattern)

  }, [activeSection, aboutPhase, patternQueue.length, isAnimating, aboutPatternIndex])

  useEffect(() => {

    // Ejecuta los movimientos pendientes del cubo
    if (!isAnimating && patternQueue.length > 0) {

      const nextMove = patternQueue[0]

      setMove(nextMove)
      setIsAnimating(true)
      setPatternQueue(prev => prev.slice(1))

      if (activeSection === "home") {

        const moveBase = nextMove.replace("'", "")

        // Cambia el titulo cuando ocurre el movimiento U
        if(moveBase === "U" ) {
          setMainTitleToggle(prev => !prev)
        }

        // Mueve el carrusel de skills
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

      // Detecta la seccion actual con el mismo offset que usa el cubo
      const next = getSectionIdFromOffset(toNormalizedOffset(el))

      if (next !== activeSection) setActiveSection(next)
    }

    el.addEventListener("scroll", handleScroll)

    return () => el.removeEventListener("scroll", handleScroll)

  }, [scrollReady, activeSection])




  // Funcion para mover el scroll entre secciones
  const scrollToSection = (id: string) => {

    const el = scrollElRef.current
    if (!el) return

    const index = (sections as readonly string[]).indexOf(id)
    if (index < 0) return

    // Usa los puntos del snap para no pelear con el
    const snapPoints = getSectionScrollTops(el.scrollHeight - el.clientHeight)
    if (index >= snapPoints.length) return

    el.scrollTo({
      top: snapPoints[index],
      behavior: "smooth"
    })

  }



  return (
    <LanguageProvider language={language} toggleLanguage={toggleLanguage}>
      <div className={`min-h-screen relative overflow-hidden transition-colors duration-700 ease-in-out
        ${isDarkMode 
          ? "bg-[#05070c] dark" 
          : "bg-gradient-to-br from-[#f8f3ff] via-[#fff5f7] to-[#f0fdf9]"}`}
      >

        {/* Fondo de luces suaves */}
        <div className={`fixed top-20 left-10 w-40 h-40 rounded-full blur-3xl pointer-events-none transition-colors duration-700 ${isDarkMode ? "bg-[#00ffcc]/10" : "bg-[#c471ed]/20"}`} />
        <div className={`fixed bottom-40 right-20 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-colors duration-700 ${isDarkMode ? "bg-[#a855f7]/10" : "bg-[#ff6b9d]/20"}`} />
        <div className={`fixed top-1/2 left-1/3 w-32 h-32 rounded-full blur-2xl pointer-events-none transition-colors duration-700 ${isDarkMode ? "bg-[#06b6d4]/10" : "bg-[#4ecdc4]/15"}`} />

        {/* Navbar superior */}
        <div className="fixed top-0 left-0 w-full z-50 pointer-events-auto">
          <Navbar
            sections={sections}
            onNavigate={scrollToSection}
            activeSection={activeSection}
            scrollElRef={scrollElRef}
            scrollReady={scrollReady}
          />     
        </div>
        
        <FloatingTags 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
          language={language} 
          toggleLanguage={toggleLanguage} 
          magneticScroll={magneticScroll}
          toggleMagneticScroll={toggleMagneticScroll}
        />

        {/* Canvas principal del portfolio */}
        <div className="fixed inset-0 z-0">
          <Canvas camera={{ position: [4, 4, 4], fov: 50 }}>
            <ScrollControls pages={SCROLL_PAGES} damping={0.2}>

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
                <LanguageProvider language={language} toggleLanguage={toggleLanguage}>
                  <div className="pointer-events-auto">

                    <div className="relative">
                      <HomeSection 
                        setActiveSection={setActiveSection} 
                        mainTitleToggle={mainTitleToggle} 
                        skillsCarouselIndex={skillsCarouselIndex} 
                        onNavigate={scrollToSection} 
                      />
                    </div>

                    <div className="relative">
                      <ProjectsSection 
                        setActiveSection={setActiveSection} 
                        projectIndex={projectIndex} 
                        setProjectIndex={setProjectIndex} 
                      />
                    </div>

                    <div className="relative">
                      <AboutSection setActiveSection={setActiveSection} />
                    </div>

                    <div className="relative">
                      <ContactSection setActiveSection={setActiveSection} />
                    </div>

                    <div className="relative">
                      <PlaySection setActiveSection={setActiveSection} />
                    </div>

                  </div>
                </LanguageProvider>
              </Scroll>

            </ScrollControls>
          </Canvas>
        </div>

      </div>
    </LanguageProvider>
  )
}

export default App