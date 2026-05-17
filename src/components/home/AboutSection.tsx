import React, { useEffect, useState } from 'react'
import { Minimize2, Code, Building2, Briefcase, GraduationCap, Laptop } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'


type Props = {
  setActiveSection?: (id: string) => void
}

const CARDS_DATA = [
  {
    id: 1,
    title: { es: "Ingeniería Software", en: "Software Engineering" },
    description: {
      es: "Estudio Ingeniería de Software en el Politécnico Grancolombiano. Finalicé todas mis materias y actualmente estoy a la espera de mi grado oficial.",
      en: "I study Software Engineering at Politécnico Grancolombiano. I have completed all my courses and I am currently waiting for my official degree."
    },
    color: "bg-gradient-to-br from-purple-100/50 to-blue-100/30 dark:from-purple-900/30 dark:to-blue-900/20",
    icon: <Code size={40} className="text-purple-600 dark:text-purple-400 mb-6 drop-shadow-md" />,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
    skills: { es: ["Lógica", "Algoritmos", "Arquitectura"], en: ["Logic", "Algorithms", "Architecture"] }
  },
  {
    id: 2,
    title: { es: "Técnico SENA", en: "SENA Technician" },
    description: {
      es: "Estudié en la institución de educación nacional SENA como Técnico en Servicios Bancarios y Financieros.",
      en: "I studied at the national education institution SENA as a Technician in Banking and Financial Services."
    },
    color: "bg-gradient-to-br from-blue-100/50 to-cyan-100/30 dark:from-blue-900/30 dark:to-cyan-900/20",
    icon: <Building2 size={40} className="text-blue-600 dark:text-blue-400 mb-6 drop-shadow-md" />,
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=600&auto=format&fit=crop",
    skills: { es: ["Finanzas", "Servicio", "Ventas"], en: ["Finance", "Service", "Sales"] }
  },
  {
    id: 3,
    title: { es: "Banco de Bogotá", en: "Banco de Bogotá" },
    description: {
      es: "Trabajé desde oct-2023 a dic-2025 con Banco de Bogotá, primero como asesor comercial y luego como Ejecutivo de cuentas de nómina B2B.",
      en: "I worked from Oct-2023 to Dec-2025 at Banco de Bogotá, first as a commercial advisor and later as a B2B payroll account executive."
    },
    color: "bg-gradient-to-br from-indigo-100/50 to-purple-100/30 dark:from-indigo-900/30 dark:to-purple-900/20",
    icon: <Briefcase size={40} className="text-indigo-600 dark:text-indigo-400 mb-6 drop-shadow-md" />,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop",
    skills: { es: ["Negociación", "B2B", "Liderazgo"], en: ["Negotiation", "B2B", "Leadership"] }
  },
  {
    id: 4,
    title: { es: "Smart Idiomas", en: "Smart Academy" },
    description: {
      es: "Estudio en la academia de idiomas Smart Inglés enfocado a la programación, por el momento voy finalizando el nivel B1.",
      en: "I study at Smart English academy focused on programming. At the moment, I am finishing the B1 level."
    },
    color: "bg-gradient-to-br from-cyan-100/50 to-teal-100/30 dark:from-cyan-900/30 dark:to-teal-900/20",
    icon: <GraduationCap size={40} className="text-cyan-600 dark:text-cyan-400 mb-6 drop-shadow-md" />,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
    skills: { es: ["Inglés B1", "Reading", "Listening"], en: ["English B1", "Reading", "Listening"] }
  },
  {
    id: 5,
    title: { es: "Cursos Platzi", en: "Platzi Courses" },
    description: {
      es: "Estudio en la academia virtual Platzi, reforzando lógica y aprendiendo nuevas tecnologías como React, Node.js, Python entre otras.",
      en: "I study at the Platzi virtual academy, reinforcing logic and learning new technologies like React, Node.js, and Python among others."
    },
    color: "bg-gradient-to-br from-pink-100/50 to-rose-100/30 dark:from-pink-900/30 dark:to-rose-900/20",
    icon: <Laptop size={40} className="text-pink-600 dark:text-pink-400 mb-6 drop-shadow-md" />,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop",
    skills: { es: ["React", "NodeJs", "Python"], en: ["React", "NodeJs", "Python"] }
  }
]

export default function AboutSection({}: Props) {

  const { language, t } = useLanguage()

  // Posicion actual del carrusel
  const [activeIndex, setActiveIndex] = useState(2)

  // Estado para cambiar entre modos
  const [viewMode, setViewMode] = useState<"fan" | "stack" | "carousel">("fan")

  // Estado para abrir una card completa
  const [detailedCardId, setDetailCardId] = useState<number | null>(null)

  const [isHovered, setIsHovered] = useState(false)

  // Mueve las cards hacia adelante
  const handleNextCard = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % CARDS_DATA.length)
  }

  // Mueve las cards hacia atras
  const handlePrevCard = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + CARDS_DATA.length) % CARDS_DATA.length)
  }

  // Calcula que tan lejos esta una card de la otra
  const getRelativeOffset = (index: number, currentActive: number, totalCards: number) => {

    let offset = (index - currentActive) % totalCards

    if (offset > Math.floor(totalCards / 2)) {
      offset -= totalCards
    } else if (offset < -Math.floor(totalCards / 2)) {
      offset += totalCards
    }

    return offset
  }

  // Abre las cards y cambia el modo visual
  const handleCardClick = (index: number) => {

    if (viewMode === "fan") {

      setActiveIndex(index)
      setViewMode("stack")

      setTimeout(() => {
        setViewMode("carousel")
      }, 700)

    } else if (viewMode === "carousel") {

      const offset = getRelativeOffset(index, activeIndex, CARDS_DATA.length)

      if (offset === 1) handleNextCard()

      if (offset === -1) handlePrevCard()
    }
  }

  // Minimiza las cards
  const handleMinimize = (e: React.MouseEvent) => {

    e.stopPropagation()

    setViewMode("stack")

    setTimeout(() => {
      setViewMode("fan")
    }, 700)
  }

  // Calcula las posiciones visuales de las cards
  const getCardStyle = (index: number) => {

    // Estilo del modo carrusel
    if (viewMode === "carousel") {

      const offset = getRelativeOffset(index, activeIndex, CARDS_DATA.length)

      const isVisible = Math.abs(offset) <= 2

      return {
        transform: `translateX(${offset * 140}px) translateY(0px) scale(${1 - Math.abs(offset) * 0.15}) rotateZ(0deg)`,
        zIndex: CARDS_DATA.length - Math.abs(offset),
        opacity: Math.abs(offset) > 1 ? 0.3 : 1,
        visibility: isVisible ? 'visible' as const : 'hidden' as const,
        pointerEvents: Math.abs(offset) > 1 ? 'none' as const : 'auto' as const
      }
    }

    // Estilo del modo stack
    if (viewMode === "stack") {

      const isSelected = index === activeIndex

      return {
        transform: `translateX(0px) translateY(0px) scale(1) rotateZ(0deg)`,
        zIndex: isSelected ? 10 : 1,
        opacity: 1,
        visibility: 'visible' as const,
        pointerEvents: 'none' as const
      }
    }

    // Estilo del modo abanico
    const fanOffset = index - Math.floor(CARDS_DATA.length / 2)

    const rotateZ = fanOffset * 10

    const translateX = fanOffset * 70

    const translateY = Math.abs(fanOffset) === 2 ? 60 : Math.abs(fanOffset) === 1 ? 20 : 0

    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) scale(1) rotateZ(${rotateZ}deg)`,
      zIndex: index,
      opacity: 1,
      visibility: 'visible' as const,
      pointerEvents: 'auto' as const
    }
  }

  // Movimiento automatico del carrusel
  useEffect(() => {

    let autoplayTimer: ReturnType<typeof setInterval>

    if(viewMode === "carousel" && !isHovered && detailedCardId == null ){

      autoplayTimer = setInterval(()=>{

        handleNextCard()

      }, 2000)
    }

    return () => {

      if(autoplayTimer){

        clearInterval(autoplayTimer)
      }
    }

  }, [viewMode, isHovered, detailedCardId, activeIndex])


  return (
    <section
      id="about"
      className="min-h-[110vh] w-full flex items-center relative overflow-hidden pb-20"
    >

      {/* Fondo suave de la seccion */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/10 via-transparent to-cyan-100/10 pointer-events-none" />

      <div className="container mx-auto px-8 w-full h-full grid grid-cols-3 gap-8 z-10 pointer-events-none">

        <div className="col-span-1 pointer-events-none" />

        <div className="col-span-2 flex flex-col justify-center items-center pointer-events-auto h-full">

          <div className="self-start pl-12 mb-12 flex flex-col gap-2">

            <span className="text-purple-500 dark:text-purple-400 font-extrabold tracking-[0.2em] uppercase text-sm drop-shadow-sm">
              {t("Mi Trayectoria", "My Journey")}
            </span>

            <h2 className="text-6xl font-black text-gray-800 dark:text-gray-100 m-0 tracking-tight">
              {t("Sobre mí", "About Me")}
            </h2>

          </div>

          {/* Contenedor principal del carrusel */}
          <div
            className="relative w-full h-[550px] flex justify-center items-center perspective-1000"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >

            {CARDS_DATA.map((card, index) => {

              const offset = getRelativeOffset(index, activeIndex, CARDS_DATA.length)

              const isCenter = viewMode === "carousel" && offset === 0

              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(index)}
                  className={`
                    absolute w-[340px] h-[460px] p-8 rounded-[2.5rem] flex flex-col
                    shadow-[0_20px_50px_rgba(0,0,0,0.1),inset_0_2px_15px_rgba(255,255,255,0.7)] 
                    dark:shadow-[0_30px_60px_rgba(0,0,0,0.4),inset_0_2px_15px_rgba(255,255,255,0.1)]
                    border border-white/60 dark:border-white/10 backdrop-blur-2xl
                    transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                    ${card.color} 
                    ${viewMode === 'fan' ? 'cursor-pointer hover:-translate-y-8 hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] hover:rotate-3' : ''}
                  `}
                  style={getCardStyle(index)}
                >

                  {/* Boton para minimizar */}
                  {isCenter && (
                    <button
                      onClick={handleMinimize}
                      className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center rounded-full 
                                 bg-white/50 dark:bg-black/30 backdrop-blur-lg border border-white/60 dark:border-white/20 shadow-lg
                                 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 
                                 hover:bg-white/80 dark:hover:bg-black/50 hover:scale-110 hover:rotate-90
                                 transition-all duration-300 ease-out z-50 group"
                      title={t("Minimizar carta", "Minimize card")}
                    >
                      <Minimize2 className="w-5 h-5 transition-transform group-active:scale-90" strokeWidth={2.5} />
                    </button>
                  )}

                  {card.icon}

                  <h3 className="text-3xl font-black mb-3 text-gray-900 dark:text-white tracking-tight leading-tight drop-shadow-sm">
                    {card.title[language]}
                  </h3>

                  <p className='text-[15px] text-gray-700 dark:text-gray-300 flex-grow leading-relaxed font-medium'>
                    {card.description[language]}
                  </p>

                  <div className="mt-auto flex justify-between items-end w-full">

                    {/* Boton de ver mas */}
                    <button
                      className="px-6 py-3 bg-gray-900/5 dark:bg-white/10 hover:bg-purple-500 hover:text-white dark:hover:bg-purple-500 rounded-2xl text-sm font-bold text-gray-800 dark:text-gray-100 transition-all pointer-events-auto hover:shadow-lg shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setDetailCardId(card.id)
                      }}
                    >
                      {t("Ver más", "View More")}
                    </button>

                    {/* Texto cuando la card esta centrada */}
                    {isCenter && (
                      <div className="text-xs font-bold text-gray-400 dark:text-gray-500 animate-pulse pb-3 pointer-events-none uppercase tracking-widest">
                        Swipe
                      </div>
                    )}

                    {/* Texto cuando esta en abanico */}
                    {viewMode === "fan" && (
                      <div className="text-xs font-bold text-gray-400 dark:text-gray-500 pb-3 pointer-events-none uppercase tracking-widest">
                        {t("Clickeame", "Click me")}
                      </div>
                    )}

                  </div>

                </div>
              )
            })}

          </div>
        </div>
      </div>

      {/* Modal del view more */}
      {detailedCardId !== null &&(
        <div
          className="absolute inset-0 z-[100] flex items-center justify-center p-8 bg-black/40 backdrop-blur-md pointer-events-auto transition-opacity"
          onClick={() => setDetailCardId(null)}
        >

          <div
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl w-full max-w-5xl h-[65vh] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex overflow-hidden border border-white/50 dark:border-white/10 relative"
            onClick={(e) =>e.stopPropagation()}
          >

            {/* Parte izquierda de la card */}
            <div className="w-1/2 p-14 flex flex-col justify-center">

              <span className="text-purple-500 font-bold tracking-widest uppercase text-sm mb-4">
                {t("Detalle de experiencia", "Experience Detail")}
              </span>

              <h2 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-8 leading-tight">
                {CARDS_DATA.find(c=> c.id === detailedCardId)?.title[language]}
              </h2>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {CARDS_DATA.find(c=>c.id === detailedCardId)?.description[language]}
              </p>

            </div>

            {/* Parte derecha con imagen y skills */}
            <div className="w-1/2 bg-gradient-to-br from-gray-50 dark:from-gray-950 to-gray-100 dark:to-black p-12 flex flex-col justify-center items-center border-l border-gray-200/50 dark:border-white/10">

              <img
                src={CARDS_DATA.find((c)=>c.id == detailedCardId)?.image}
                alt="Card Media"
                className="w-full h-64 object-cover rounded-2xl shadow-lg mb-10"
              />

              <div className="flex gap-3 flex-wrap justify-center">

                {/* Skills de la experiencia */}
                {CARDS_DATA.find(c => c.id == detailedCardId)?.skills[language]?.map((skill: string, index: number)=>(

                  <span
                    key={index}
                    className='px-5 py-2 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 shadow-sm text-gray-700 dark:text-gray-200 font-semibold rounded-full text-sm'
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  )
}