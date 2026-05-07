import React, { useEffect, useState } from 'react'
import RotationCube from '../cube/RotationCube'

type Props = {
  setActiveSection?: (id: string) => void
  isRotate?: boolean
  setIsRotate?: React.Dispatch<React.SetStateAction<boolean>>
}

const CARDS_DATA = [
  { id: 1, title: "ING de software", description: "Estudie Ing de software en el instituto universitario Politecnico Gran Colombiano, Finalice todas las materias y requisitos y en el momento estoy esperando es la graduacion.", color: "bg-white/80" },
  { id: 2, title: "Tecnico", description: "Estudie en la institucion de educacion nacional SENA como Tecnico en servicios Bancarios", color: "bg-blue-50/80" },
  { id: 3, title: "Banco de Bogotá", description: "Trabaje desde oct-2023 a dic-2025 con Banco de Bogota, primero como asesor comercial y luego como Ejecutivo de cuentas de nomina para grandes empresas.", color: "bg-purple-50/80" },
  { id: 4, title: "Idiomas (Smart)", description: "Estudio en la academia de idiomas Smart Ingles enfocado a la programacion, por el momento voy finalizando el nivel B1", color: "bg-cyan-50/80" },
  { id: 5, title: "Cursos", description: "Estudio en la academia virtual de tecnologia Platzi, reforzando mis conocimientos en logica de programacion y aprendiendo nuevas tecnologias como Angula, React, NodeJs, Python entre otras. ", color: "bg-pink-50/80" }
]

export default function AboutSection({ setActiveSection, setIsRotate, isRotate }: Props) {
  // Const for the infinity stacked carousel
  const [activeIndex, setActiveIndex] = useState(0)

  const handleNextCard = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % CARDS_DATA.length)
  }

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

            {isRotate !== undefined && setIsRotate && (
              <div className="pointer-events-auto">
                <RotationCube isRotate={isRotate} setIsRotate={setIsRotate} />
              </div>
            )}
          </div>

          {/* carousel container div */}
          <div className="relative w-full h-[500px] flex justify-center items-center perspective-1000">

            {CARDS_DATA.map((card, index) => {


              const offset = getRelativeOffset(index, activeIndex, CARDS_DATA.length)

              const isCenter = offset === 0
              const isVisible = Math.abs(offset) <= 2


              const translateX = offset * 110
              const scale = 1 - Math.abs(offset) * 0.15
              const zIndex = CARDS_DATA.length - Math.abs(offset)
              const opacity = Math.abs(offset) > 1 ? 0.3 : 1
              return (
                <div
                  key={card.id}
                  onClick={() => {
                    if (offset === 1) handleNextCard()
                    if (offset === -1) handlePrevCard()
                  }}

                  className={`absolute w-72 h-96 p-8 rounded-3xl shadow-xl border border-white/40 backdrop-blur-lg transition-all duration-500 ease-out flex flex-col ${card.color} ${!isCenter ? 'cursor-pointer hover:border-white/80 hover:shadow-2xl' : ''}`}

                  style={{
                    transform: `translateX(${translateX}px) scale(${scale})`,
                    zIndex,
                    opacity,
                    visibility: isVisible ? 'visible' : 'hidden',
                    pointerEvents: Math.abs(offset) > 1 ? 'none' : 'auto'
                  }}
                >
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{card.title}</h3>
                  <p className="text-lg text-gray-600 flex-grow">
                    {card.description}
                  </p>

                  {isCenter && (
                    <div className="text-sm font-semibold text-gray-400 mt-auto text-center animate-pulse">
                      Click sides to navigate
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}