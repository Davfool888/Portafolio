import React, { useEffect, useState } from 'react'
import { Minimize2, Code, Building2, Briefcase, GraduationCap, Laptop } from 'lucide-react'


type Props = {
  setActiveSection?: (id: string) => void
}

const CARDS_DATA = [
  {
    id: 1,
    title: "Software Eng",
    description: "Estudio Ingeniería de Software en el Politécnico Grancolombiano. Finalicé todas mis materias y actualmente estoy a la espera de mi grado oficial.",
    color: "bg-gradient-to-br from-purple-100/50 to-blue-100/30 dark:from-purple-900/30 dark:to-blue-900/20",
    icon: <Code size={40} className="text-purple-600 dark:text-purple-400 mb-6 drop-shadow-md" />,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
    skills: ["Lógica", "Algoritmos", "Arquitectura"]
  },
  {
    id: 2,
    title: "Técnico SENA",
    description: "Estudié en la institución de educación nacional SENA como Técnico en Servicios Bancarios y Financieros.",
    color: "bg-gradient-to-br from-blue-100/50 to-cyan-100/30 dark:from-blue-900/30 dark:to-cyan-900/20",
    icon: <Building2 size={40} className="text-blue-600 dark:text-blue-400 mb-6 drop-shadow-md" />,
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=600&auto=format&fit=crop",
    skills: ["Finanzas", "Servicio", "Ventas"]
  },
  {
    id: 3,
    title: "Banco Bogotá",
    description: "Trabajé desde oct-2023 a dic-2025 con Banco de Bogotá, primero como asesor comercial y luego como Ejecutivo de cuentas de nómina B2B.",
    color: "bg-gradient-to-br from-indigo-100/50 to-purple-100/30 dark:from-indigo-900/30 dark:to-purple-900/20",
    icon: <Briefcase size={40} className="text-indigo-600 dark:text-indigo-400 mb-6 drop-shadow-md" />,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop",
    skills: ["Negociación", "B2B", "Liderazgo"]
  },
  {
    id: 4,
    title: "Smart Idiomas",
    description: "Estudio en la academia de idiomas Smart Inglés enfocado a la programación, por el momento voy finalizando el nivel B1.",
    color: "bg-gradient-to-br from-cyan-100/50 to-teal-100/30 dark:from-cyan-900/30 dark:to-teal-900/20",
    icon: <GraduationCap size={40} className="text-cyan-600 dark:text-cyan-400 mb-6 drop-shadow-md" />,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
    skills: ["Inglés B1", "Reading", "Listening"]
  },
  {
    id: 5,
    title: "Cursos Platzi",
    description: "Estudio en la academia virtual Platzi, reforzando lógica y aprendiendo nuevas tecnologías como React, NodeJs, Python entre otras.",
    color: "bg-gradient-to-br from-pink-100/50 to-rose-100/30 dark:from-pink-900/30 dark:to-rose-900/20",
    icon: <Laptop size={40} className="text-pink-600 dark:text-pink-400 mb-6 drop-shadow-md" />,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop",
    skills: ["React", "NodeJs", "Python"]
  }
]



export default function AboutSection({}: Props) {


  // posicion actual del carrusel
  const [activeIndex, setActiveIndex] = useState(2)

  // estado para cambiar entre abanico, stack y carrusel
  const [viewMode, setViewMode] = useState<"fan" | "stack" | "carousel">("fan")

  // estado para abrir una card con mas informacion
  const [detailedCardId, setDetailCardId] = useState<number | null>(null)

  const [isHovered, setIsHovered] = useState(false)


  // mover cards hacia adelante
  const handleNextCard = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % CARDS_DATA.length)
  }

  // mover cards hacia atras
  const handlePrevCard = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + CARDS_DATA.length) % CARDS_DATA.length)
  }

  const getRelativeOffset = (index: number, currentActive: number, totalCards: number) => {
    let offset = (index - currentActive) % totalCards

    if (offset > Math.floor(totalCards / 2)) {
      offset -= totalCards
    } else if (offset < -Math.floor(totalCards / 2)) {
      offset += totalCards
    }

    return offset
  }



  // abrir las cards y cambiar al modo carrusel
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

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation()

    setViewMode("stack")

    setTimeout(() => {
      setViewMode("fan")
    }, 700)
  }



  // estilos y posiciones de cada card
  const getCardStyle = (index: number) => {

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


  // movimiento automatico del carrusel
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
      className="h-[100vh] w-full flex items-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/10 via-transparent to-cyan-100/10 pointer-events-none" />

      <div className="container mx-auto px-8 w-full h-full grid grid-cols-3 gap-8 z-10 pointer-events-none">

        <div className="col-span-1 pointer-events-none" />

        <div className="col-span-2 flex flex-col justify-center items-center pointer-events-auto h-full">

          <div className="self-start pl-12 mb-12 flex flex-col gap-2">
            <span className="text-purple-500 dark:text-purple-400 font-extrabold tracking-[0.2em] uppercase text-sm drop-shadow-sm">
              Mi Trayectoria
            </span>
            <h2 className="text-6xl font-black text-gray-800 dark:text-gray-100 m-0 tracking-tight">
              About Me
            </h2>
          </div>

          {/* contenedor principal del carrusel */}
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

                  {isCenter && (
                    <button
                      onClick={handleMinimize}
                      className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center rounded-full 
                                 bg-white/50 dark:bg-black/30 backdrop-blur-lg border border-white/60 dark:border-white/20 shadow-lg
                                 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 
                                 hover:bg-white/80 dark:hover:bg-black/50 hover:scale-110 hover:rotate-90
                                 transition-all duration-300 ease-out z-50 group"
                      title="Minimizar carta"
                    >
                      <Minimize2 className="w-5 h-5 transition-transform group-active:scale-90" strokeWidth={2.5} />
                    </button>
                  )}

                  {card.icon}

                  <h3 className="text-3xl font-black mb-3 text-gray-900 dark:text-white tracking-tight leading-tight drop-shadow-sm">
                    {card.title}
                  </h3>

                  <p className='text-[15px] text-gray-700 dark:text-gray-300 flex-grow leading-relaxed font-medium'>
                    {card.description}
                  </p>

                  <div className="mt-auto flex justify-between items-end w-full">

                    <button
                      className="px-6 py-3 bg-gray-900/5 dark:bg-white/10 hover:bg-purple-500 hover:text-white dark:hover:bg-purple-500 rounded-2xl text-sm font-bold text-gray-800 dark:text-gray-100 transition-all pointer-events-auto hover:shadow-lg shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setDetailCardId(card.id)
                      }}
                    >
                      View More
                    </button>

                    {isCenter && (
                      <div className="text-xs font-bold text-gray-400 dark:text-gray-500 animate-pulse pb-3 pointer-events-none uppercase tracking-widest">
                        Swipe
                      </div>
                    )}

                    {viewMode === "fan" && (
                      <div className="text-xs font-bold text-gray-400 dark:text-gray-500 pb-3 pointer-events-none uppercase tracking-widest">
                        Click me
                      </div>
                    )}

                  </div>

                </div>
              )
            })}

          </div>
        </div>
      </div>


      {/* modal de view more */}

      {detailedCardId !== null &&(
        <div
          className="absolute inset-0 z-[100] flex items-center justify-center p-8 bg-black/40 backdrop-blur-md pointer-events-auto transition-opacity"
          onClick={() => setDetailCardId(null)}
        >

          <div
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl w-full max-w-5xl h-[65vh] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex overflow-hidden border border-white/50 dark:border-white/10 relative"
            onClick={(e) =>e.stopPropagation()}
          >

            {/* parte izquierda de la card */}
            <div className="w-1/2 p-14 flex flex-col justify-center">

              <span className="text-purple-500 font-bold tracking-widest uppercase text-sm mb-4">
                Detalle de experiencia
              </span>

              <h2 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-8 leading-tight">
                {CARDS_DATA.find(c=> c.id === detailedCardId)?.title}
              </h2>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {CARDS_DATA.find(c=>c.id === detailedCardId)?.description}
              </p>

            </div>

            {/* parte derecha con imagen y skills */}
            <div className="w-1/2 bg-gradient-to-br from-gray-50 dark:from-gray-950 to-gray-100 dark:to-black p-12 flex flex-col justify-center items-center border-l border-gray-200/50 dark:border-white/10">

              <img
                src={CARDS_DATA.find((c)=>c.id == detailedCardId)?.image}
                alt="Card Media"
                className="w-full h-64 object-cover rounded-2xl shadow-lg mb-10"
              />

              <div className="flex gap-3 flex-wrap justify-center">

                {CARDS_DATA.find(c => c.id == detailedCardId)?.skills.map((skill, index)=>(
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