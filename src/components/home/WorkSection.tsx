import { useState, useEffect } from 'react'
import SkillCard from '../ui/SkillCard'
import { projects } from '../../data/projects'
import { Globe } from "lucide-react"

// importaciones de estilos
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Maximize2, X } from "lucide-react"
// importacion para la animacion de cubo de los texto y que se vea fluido
import { AnimatePresence, motion } from 'framer-motion'
import { SiGithub } from "react-icons/si"


type Props = {
  setActiveSection?: (id: string) => void
  projectIndex: number
  setProjectIndex: (index: number | ((prev: number) => number)) => void;
}

export default function WorkSection({ projectIndex, setProjectIndex }: Props) {




  // estado para el carrusel de los diferentes proyectos
  const [direction, setDirection] = useState(0)

  // estado para carousel de las imagenes
  const [imageIndex, setImageIndex] = useState(0)
  const [expandedImage, setExpandedImage] = useState(false)


  // mapa para saber que proyecto queda arriba, abajo o a los lados
  const adjacency: Record<number, { up: number, down: number, left: number, right: number }> = {
    0: { up: 2, down: 3, left: 4, right: 5 },
    1: { up: 3, down: 2, left: 5, right: 4 },
    2: { up: 0, down: 1, left: 4, right: 5 },
    3: { up: 0, down: 1, left: 5, right: 4 },
    4: { up: 0, down: 1, left: 3, right: 2 },
    5: { up: 0, down: 1, left: 2, right: 3 }
  }

  // funcion para moverse entre los proyectos
  const navTo = (dir: 'up' | 'down' | 'left' | 'right') => {
    const nextIndex = adjacency[projectIndex][dir];

    // cambiar la animacion dependiendo de a donde se mueva
    if (dir === 'left' || dir === 'down') setDirection(-1);
    else setDirection(1);

    setProjectIndex(nextIndex);
  }

  const project = projects[projectIndex]

  // imagenes por defecto por si el proyecto no tiene
  const currentImages = project.images || [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop"
  ]


  // rotaciones del texto como cuborubik
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

  const leftTagVariants = {
    enter: (direction: number) => ({
      rotateX: direction > 0 ? 90 : -90,
      y: direction > 0 ? -40 : 40,
      opacity: 0,
    }),
    center: {
      rotateX: 0,
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      rotateX: direction > 0 ? -90 : 90,
      y: direction > 0 ? 40 : -40,
      opacity: 0,
    })
  }

  const rightTagVariants = {
    enter: (direction: number) => ({
      rotateX: direction > 0 ? -90 : 90,
      y: direction > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      rotateX: 0,
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      rotateX: direction > 0 ? 90 : -90,
      y: direction > 0 ? -40 : 40,
      opacity: 0,
    })
  };


  useEffect(() => {
    setImageIndex(0)
  }, [projectIndex])

  return (
    <section
      id="work"
      className="h-[100vh] flex items-center relative"
    >
      {/* fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/10 via-transparent to-cyan-100/10 pointer-events-none" />


      {/* grid principal */}
      <div className="container mx-auto px-12 z-10 grid grid-cols-3 gap-16 items-center pointer-events-none">



        {/* izquierda */}
        <div className="flex flex-col justify-center gap-6 pointer-events-auto">

          <div className="mb-4">
            <span className="text-sm text-purple-600 font-semibold tracking-wide uppercase">
              Featured Project
            </span>
          </div>

          <div
            style={{ perspective: 1200 }}
            className="relative min-h-[450px] w-full"
          >
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
                className="absolute inset-0 flex flex-col gap-6 justify-center"
              >
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

        {/* centro */}
        <div className="relative w-full h-[500px] flex items-center justify-center pointer-events-none">
          {/* aqui va el cubo */}

          {/* botones para mover el cubo */}
          <button
            onClick={() => navTo('up')}
            className="absolute top-0 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg transition-all hover:bg-purple-400/30 hover:scale-110 pointer-events-auto z-50"
          >
            <ChevronUp className="text-gray-700" size={24} />
          </button>

          <button
            onClick={() => navTo('down')}
            className="absolute bottom-0 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg transition-all hover:bg-purple-400/30 hover:scale-110 pointer-events-auto z-50"
          >
            <ChevronDown className="text-gray-700" size={24} />
          </button>

          <button
            onClick={() => navTo('left')}
            className="absolute left-0 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg transition-all hover:bg-purple-400/30 hover:scale-110 pointer-events-auto z-50"
          >
            <ChevronLeft className="text-gray-700" size={24} />
          </button>

          <button
            onClick={() => navTo('right')}
            className="absolute right-0 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-lg transition-all hover:bg-purple-400/30 hover:scale-110 pointer-events-auto z-50"
          >
            <ChevronRight className="text-gray-700" size={24} />
          </button>

          {/* links a web y github debajo del cubo */}
          <div className="absolute bottom-[-30px] w-full px-8 flex justify-between pointer-events-none" style={{ perspective: 1000 }}>
            
            {/* link pagina web */}
            <div className="relative w-40 h-[44px] pointer-events-auto">
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.a
                  key={`web-${projectIndex}`}
                  custom={direction}
                  variants={leftTagVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                  style={{ transformOrigin: "center center -30px" }}
                  href={project.websiteUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center gap-2 bg-white/40 backdrop-blur-xl border border-white/50 px-5 py-2.5 rounded-full text-gray-800 font-bold shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/60 transition-all"
                >
                  <Globe size={18} className="text-cyan-600" />
                  <span className="text-sm tracking-wide">Página Web</span>
                </motion.a>
              </AnimatePresence>
            </div>

            {/* link github */}
            <div className="relative w-36 h-[44px] pointer-events-auto">
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.a
                  key={`github-${projectIndex}`}
                  custom={direction}
                  variants={rightTagVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
                  style={{ transformOrigin: "center center -30px" }}
                  href={project.githubUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center gap-2 bg-white/40 backdrop-blur-xl border border-white/50 px-5 py-2.5 rounded-full text-gray-800 font-bold shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/60 transition-all"
                >
                  <SiGithub size={18} className="text-purple-600" />
                  <span className="text-sm tracking-wide">GitHub</span>
                </motion.a>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* derecha */}
        <div className="relative w-full h-[500px] flex items-center justify-center pointer-events-auto">

          {/* iteramos imagenes*/}
          {currentImages.map((imgUrl, i) => {


            let offset = i - imageIndex;
            if (offset < -1) offset += currentImages.length;
            if (offset > 1) offset -= currentImages.length;
            if (Math.abs(offset) > 1) return null;
            const isCenter = offset === 0;
            const isTop = offset === -1;
            const isBottom = offset === 1;

            let positionClasses = "";
            let zIndexClass = "";
            if (isCenter) {
              positionClasses = "translate-x-12 scale-105 hover:scale-110 shadow-[0_20px_60px_rgba(0,0,0,0.3)] opacity-100";
              zIndexClass = "z-30";
            } else if (isTop) {

              positionClasses = "-translate-x-12 -translate-y-[140px] scale-90 opacity-60 hover:opacity-100 shadow-lg cursor-pointer";
              zIndexClass = "z-10";
            } else if (isBottom) {
              positionClasses = "-translate-x-12 translate-y-[140px] scale-90 opacity-60 hover:opacity-100 shadow-lg cursor-pointer";
              zIndexClass = "z-10";
            }
            return (
              <div
                key={i}
                onClick={() => {

                  if (isTop) setImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
                  if (isBottom) setImageIndex((prev) => (prev + 1) % currentImages.length);
                }}
                className={`absolute w-full max-w-[320px] h-[230px] rounded-3xl overflow-hidden bg-white/20 backdrop-blur-xl border border-white/40 transition-all duration-500 ease-out flex flex-col items-center justify-center text-gray-700 ${positionClasses} ${zIndexClass}`}
              >

                <img
                  src={imgUrl}
                  alt={`Preview ${i}`}
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                />

                {/* boton para expandir */}
                {isCenter && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setExpandedImage(true)
                    }}
                    className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-sm text-gray-700 hover:text-gray-900 hover:bg-white/40 hover:scale-110 hover:rotate-90 transition-all duration-300 ease-out z-50 group"
                    title="Expandir imagen"
                  >
                    <Maximize2 className="w-4 h-4 transition-transform group-active:scale-90" strokeWidth={2.5} />
                  </button>
                )}

              </div>
            );
          })}
        </div>
      </div>

      {/* modal de expansion de imagen */}
      {expandedImage && (
        <div
          className="absolute inset-0 z-[100] flex items-center justify-center p-8 bg-black/40 backdrop-blur-md pointer-events-auto transition-opacity"
          onClick={() => setExpandedImage(false)}
        >
          <div
            className="bg-white/90 backdrop-blur-xl w-full max-w-5xl h-[65vh] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex overflow-hidden border border-white/50 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* boton de cerrar  */}
            <button
              onClick={() => setExpandedImage(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* lado izquierdo */}
            <div className="w-1/2 p-14 flex flex-col justify-center">
              <span className="text-purple-500 font-bold tracking-widest uppercase text-sm mb-4">
                Detalle Visual
              </span>
              <h2 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
                {project.title}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">

                {project.description}
              </p>
            </div>
            {/* lado derecho */}
            <div className="w-1/2 bg-gray-100 flex flex-col justify-center items-center border-l border-gray-200/50 relative">
              <img
                src={currentImages[imageIndex]}
                alt="Vista Expandida"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}