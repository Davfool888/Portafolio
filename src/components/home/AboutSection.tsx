import React, { useEffect, useState } from 'react'
import { transform } from 'framer-motion'
import { div } from 'three/tsl'
import { Minimize2 } from 'lucide-react'


type Props = {
  setActiveSection?: (id: string) => void
}

const CARDS_DATA = [
  {
    id: 1,
    title: "ING de software",
    description: "Estudie Ing de software en el instituto universitario Politecnico Gran Colombiano, Finalice todas las materias y requisitos y en el momento estoy esperando es la graduacion.",
    color: "bg-white/80",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop", // Imagen de ejemplo
    skills: ["Lógica", "Algoritmos", "Patrones"]
  },
  {
    id: 2,
    title: "Tecnico",
    description: "Estudie en la institucion de educacion nacional SENA como Tecnico en servicios Bancarios",
    color: "bg-blue-50/80",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=600&auto=format&fit=crop",
    skills: ["Finanzas", "Servicio", "Ventas"]
  },
  {
    id: 3,
    title: "Banco de Bogotá",
    description: "Trabaje desde oct-2023 a dic-2025 con Banco de Bogota, primero como asesor comercial y luego como Ejecutivo de cuentas de nomina para grandes empresas.",
    color: "bg-purple-50/80",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop",
    skills: ["Negociación", "B2B", "Liderazgo"]
  },
  {
    id: 4,
    title: "Idiomas (Smart)",
    description: "Estudio en la academia de idiomas Smart Ingles enfocado a la programacion, por el momento voy finalizando el nivel B1",
    color: "bg-cyan-50/80",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
    skills: ["Inglés B1", "Reading", "Listening"]
  },
  {
    id: 5,
    title: "Cursos",
    description: "Estudio en la academia virtual de tecnologia Platzi, reforzando mis conocimientos en logica de programacion y aprendiendo nuevas tecnologias como Angula, React, NodeJs, Python entre otras.",
    color: "bg-pink-50/80",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop",
    skills: ["React", "NodeJs", "Python"]
  }
]



export default function AboutSection({ setActiveSection }: Props) {


  // Const for the infinity stacked carousel
  const [activeIndex, setActiveIndex] = useState(2)

  // Estado para la transicion de las cartas de forma redonda a forma de carrusel
  const [viewMode, setViewMode] = useState<"fan" | "stack" | "carousel">("fan")

  // Nuevo estado para que las cards se puedan expandir y mostrar mas informacion a detalle
  const [detailedCardId, setDetailCardId] = useState<number | null>(null)

  const [isHovered, setIsHovered] = useState(false)


  // Movimiento del carrusel infinito hacia adelante
  const handleNextCard = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % CARDS_DATA.length)
  }
  // Movimiento del carrusel infinito hacia atras
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



  // Logica de despligue de las cartas al darle click
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



  const getCardStyle = (index: number) => {
    if (viewMode === "carousel") {
      const offset = getRelativeOffset(index, activeIndex, CARDS_DATA.length)
      const isVisible = Math.abs(offset) <= 2
      return {
        transform: `translateX(${offset * 110}px) translateY(0px) scale(${1 - Math.abs(offset) * 0.15}) rotateZ(0deg)`,
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

    const rotateZ = fanOffset * 15

    const translateX = fanOffset * 60

    const translateY = Math.abs(fanOffset) === 2 ? 40 : Math.abs(fanOffset) === 1 ? 10 : 0

    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) scale(1) rotateZ(${rotateZ}deg)`,
      zIndex: index, 
      opacity: 1,
      visibility: 'visible' as const,
      pointerEvents: 'auto' as const
    }
  }


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

          <div className="self-start pl-8 mb-12 flex items-center gap-6">
            <h2 className="text-5xl font-bold text-gray-800 m-0">
              About Me
            </h2>
            </div>

          {/* carousel container div */}
          <div className="relative w-full h-[500px] flex justify-center items-center perspective-1000"
          onMouseEnter={()=> setIsHovered(true)}
          onMouseLeave={()=> setIsHovered(false)}
          >

            {CARDS_DATA.map((card, index) => {


              const offset = getRelativeOffset(index, activeIndex, CARDS_DATA.length)

              const isCenter = viewMode === "carousel" && offset === 0


              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(index)}
                  className={`absolute w-72 h-96 p-8 rounded-3xl shadow-xl border border-white/40 backdrop-blur-lg transition-all duration-700 ease-in-out flex flex-col ${card.color} ${viewMode === 'fan' ? 'cursor-pointer hover:-translate-y-4 hover:shadow-2xl' : ''}`}
                  style={getCardStyle(index)}
                >
                 {isCenter && (
                    <button
                      onClick={handleMinimize}
                      className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full 
                                 bg-white/20 backdrop-blur-md border border-white/40 shadow-sm
                                 text-gray-700 hover:text-gray-900 
                                 hover:bg-white/40 hover:scale-110 hover:rotate-90
                                 transition-all duration-300 ease-out z-50 group"
                      title="Minimizar carta"
                    >
                      <Minimize2 className="w-4 h-4 transition-transform group-active:scale-90" strokeWidth={2.5} />
                    </button>
                  )}
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">
                    {card.title}
                  </h3>

                  <p className='text-lg text-gray-600 flex-grow'>
                    {card.description}
                  </p>
                  <div className="mt-auto flex justify-between items-end w-full">


                    <button
                      className="px-4 py-2 bg-black/5 hover:bg-black/10 rounded-xl text-sm font-semibold text-gray-700 transition-colors pointer-events-auto"
                      onClick={(e) => {
                        e.stopPropagation()

                        setDetailCardId(card.id)
                      }}
                    >
                      View More
                    </button>

                    {isCenter && (
                      <div className="text-xs font-semibold text-gray-400 animate-pulse pb-2 pointer-events-none">
                        Click sides
                      </div>
                    )}

                    {viewMode === "fan" && (
                      <div className="text-xs font-semibold text-gray-400 pb-2 pointer-events-none" >
                        Click to expende
                      </div>
                    )}

                  </div>

                </div>
              )
            })}


          </div>
        </div>
      </div>


      {/* VIEW MORE INTERFACES */}

      {detailedCardId !== null &&(
        <div  
        className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/40 backdrop-blur-md pointer-events-auto transition-opacity"
        onClick={() => setDetailCardId(null)}
        >
          <div 
          className="bg-white/90 backdrop-blur-xl w-full max-w-5xl h-[65vh] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex overflow-hidden border border-white/50 relative"
          onClick={(e) =>e.stopPropagation()}
          >

            {/* Creacion del lado izquiero de mi card */}
            <div className="w-1/2 p-14 flex flex-col justify-center">
              <span className="text-purple-500 font-bold tracking-widest uppercase text-sm mb-4">
                Detalle de experiencia
              </span>

              <h2 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
                {CARDS_DATA.find(c=> c.id === detailedCardId)?.title}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {CARDS_DATA.find(c=>c.id === detailedCardId)?.description}
              </p>
            </div>

            {/* Creacion del lado derecho de mi card que contiene imagen y skills*/}
            <div className="w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 p-12 flex flex-col justify-center items-center border-l border-gray-200/50">
              <img 
              src={CARDS_DATA.find((c)=>c.id == detailedCardId)?.image} 
              alt="Card Media" 
              className="w-full h-64 object-cover rounded-2xl shadow-lg mb-10"/>
              <div className="flex gap-3 flex-wrap justify-center">
                 {CARDS_DATA.find(c => c.id == detailedCardId)?.skills.map((skill, index)=>(
                  <span
                  key={index}
                  className='px-5 py-2 bg-white border border-gray-200 shadow-sm text-gray-700 font-semibold rounded-full text-sm'
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