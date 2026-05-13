import { useEffect, useState } from 'react'
import SkillCard from '../ui/SkillCard'
import { projects } from '../../data/projects'

// Importaciones de estilos
// Importacion para las flechas del lado izquierdo
import { ChevronLeft, ChevronRight } from "lucide-react"
// importacion para la animacion de cubo de los texto y que se vea fluido
import { AnimatePresence, motion } from 'framer-motion'


type Props = {
  setActiveSection?: (id: string) => void
  projectIndex: number
  setProjectIndex: (index: number | ((prev: number) => number)) => void;
}

export default function WorkSection({ setActiveSection, projectIndex, setProjectIndex }: Props) {


  // Estado para el carrusel de los diferentes proyectos
  const [direction, setDirection] = useState(0)

  // funciones para el carrusel infinito
  // funcion de avanzar
  const nextProject = () => {
    setDirection(1)
    setProjectIndex((prev) => (prev + 1) % projects.length)
  }
  // funcion de retroceder
  const prevProject = () => {
    setDirection(-1)
    setProjectIndex((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1)
  }

  const project = projects[projectIndex]

  
  // Rotaciones del texto como cuborubik
  const cubeVariants = {
    enter: (direction: number) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      rotateY: direction > 0 ? -90 : 90,
      opacity: 0
    })
  }


  

  return (
    <section
      id="work"
      className="h-[100vh] flex items-center relative"
    >
      {/* fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/10 via-transparent to-cyan-100/10 pointer-events-none" />


      {/* GRID PRINCIPAL */}
      <div className="container mx-auto px-12 z-10 grid grid-cols-3 gap-16 pointer-events-none">



        {/* IZQUIERDA */}
        <div className="flex flex-col justify-center gap-6 pointer-events-auto">
          <span className="text-sm text-purple-600 font-semibold tracking-wide uppercase">
            Featured Project
          </span>

          <div className="flex items-center gap-4 mb-2">
            <button onClick={prevProject} className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-purple-400/30 hover:scale-110 active:scale-95">
              <ChevronLeft className="text-gray-700" size={22} />
            </button>

            <button onClick={nextProject} className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-purple-400/30 hover:scale-110 active:scale-95">
              <ChevronRight className="text-gray-700" size={22} />
            </button>
          </div>

          {/* contenedor de titulo y botones de carrusel */}
          <div style={{ perspective: 1200 }} className="relative min-h-[300px] w-full">
            <AnimatePresence custom={direction} mode='popLayout'>
              <motion.div
               key={projectIndex}
                custom={direction}
                variants={cubeVariants}
                initial="enter"
                animate="center"
                exit="exit"  
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }} 
                style={{ transformOrigin: "center center -150px" }}
                className="absolute inset-0 flex flex-col gap-6"
              >
                {/* Título */}
                <h2 className="text-5xl font-bold text-gray-900 leading-tight">
                  {project.title}
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {project.description}
                </p>
             

        <div className='flex flex-wrap gap-4 mt-2'>
        
            {project.techs.map((tech, i) => (
              <SkillCard key={tech.name} {...tech} delay={i * 100} />
            ))}
          </div>
          </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* CENTRO */}
        <div className="flex items-center justify-center">
          {/* AQUÍ VA EL CUBO */}
        </div>

        {/* DERECHA */}
        <div className="flex items-center justify-center pointer-events-auto">

          <div className="w-full h-[340px] rounded-3xl overflow-hidden bg-white/20 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">

            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Project Media
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}