import { useState, useEffect } from 'react'
import SkillCard from '../ui/SkillCard'
import { projects } from '../../data/projects'
import { Globe, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Maximize2, X } from "lucide-react"
import { AnimatePresence, motion } from 'framer-motion'
import { SiGithub } from "react-icons/si"
import { useLanguage } from '../../context/LanguageContext'

type Props = {
  setActiveSection?: (id: string) => void
  projectIndex: number
  setProjectIndex: (index: number | ((prev: number) => number)) => void;
}

export default function ProjectsSection({ projectIndex, setProjectIndex }: Props) {
  const { language, t } = useLanguage()

  // estado para la direccion de la rotacion 3D
  const [direction, setDirection] = useState(0)

  // estado del carrusel de imagenes
  const [imageIndex, setImageIndex] = useState(0)

  // estado para expandir imagenes
  const [expandedImage, setExpandedImage] = useState(false)

  // esto sirve para saber que proyecto queda arriba abajo izquierda y derecha
  const adjacency: Record<number, { up: number, down: number, left: number, right: number }> = {
    0: { up: 2, down: 3, left: 4, right: 5 },
    1: { up: 3, down: 2, left: 5, right: 4 },
    2: { up: 0, down: 1, left: 4, right: 5 },
    3: { up: 0, down: 1, left: 5, right: 4 },
    4: { up: 0, down: 1, left: 3, right: 2 },
    5: { up: 0, down: 1, left: 2, right: 3 }
  }

  // mover entre proyectos usando las flechas
  const navTo = (dir: 'up' | 'down' | 'left' | 'right') => {

    const nextIndex = adjacency[projectIndex][dir];

    // esto cambia la direccion de la animacion del cubo gigante
    if (dir === 'down' || dir === 'right') {
      setDirection(-1);
    } else {
      setDirection(1);
    }

    setProjectIndex(nextIndex);
  }

  // proyecto actual
  const project = projects[projectIndex]

  // imagenes por defecto por si un proyecto no tiene
  const currentImages = project.images || [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop"
  ]

  // animacion principal del cubo gigante
  const fullSectionCubeVariants = {

    enter: (direction: number) => ({
      rotateX: direction > 0 ? 90 : -90,
      opacity: 0,
      filter: "blur(10px)",
    }),

    center: {
      rotateX: 0,
      opacity: 1,
      filter: "blur(0px)",
    },

    exit: (direction: number) => ({
      rotateX: direction > 0 ? -90 : 90,
      opacity: 0,
      filter: "blur(10px)",
    })
  }

  // resetear el carrusel de imagenes cuando cambia el proyecto
  useEffect(() => {
    setImageIndex(0)
  }, [projectIndex])

  // colores claros del degradado ambiental
  const ambientColors = [
    "rgba(254, 250, 224, 0.8)",
    "rgba(253, 253, 150, 0.6)",
    "rgba(208, 244, 234, 0.8)",
    "rgba(230, 215, 255, 0.8)",
    "rgba(255, 229, 180, 0.7)",
    "rgba(252, 213, 206, 0.8)",
  ]

  // colores oscuros del degradado ambiental
  const darkAmbientColors = [
    "rgba(254, 250, 224, 0.15)", 
    "rgba(253, 253, 150, 0.12)",  
    "rgba(208, 244, 234, 0.15)", 
    "rgba(230, 215, 255, 0.15)", 
    "rgba(255, 229, 180, 0.12)",  
    "rgba(252, 213, 206, 0.15)", 
  ]

  return (
    <section
      id="projects"
      className="h-[100vh] flex items-center relative overflow-hidden"
    >

      {/* luz ambiental clara */}
      <motion.div 
        className="absolute inset-0 pointer-events-none block dark:hidden z-0"
        animate={{
          background: `linear-gradient(to top, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 35%, ${ambientColors[projectIndex] || ambientColors[0]} 100%)`
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* luz ambiental oscura */}
      <motion.div 
        className="absolute inset-0 pointer-events-none hidden dark:block z-0"
        animate={{
          background: `linear-gradient(to top, rgba(15, 24, 27, 0.95) 0%, rgba(15, 24, 27, 0) 35%, ${darkAmbientColors[projectIndex] || darkAmbientColors[0]} 100%)`
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* botones fijos alrededor del cubo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] max-w-[350px] h-[450px] z-50 pointer-events-none">

          {/* boton superior */}
          <button
            onClick={() => navTo('up')}
            className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg transition-all hover:bg-purple-400/30 dark:hover:bg-purple-500/30 hover:scale-110 pointer-events-auto"
          >
            <ChevronUp className="text-gray-700 dark:text-gray-300" size={24} />
          </button>

          {/* boton inferior */}
          <button
            onClick={() => navTo('down')}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg transition-all hover:bg-purple-400/30 dark:hover:bg-purple-500/30 hover:scale-110 pointer-events-auto"
          >
            <ChevronDown className="text-gray-700 dark:text-gray-300" size={24} />
          </button>

          {/* boton izquierdo */}
          <button
            onClick={() => navTo('left')}
            className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg transition-all hover:bg-purple-400/30 dark:hover:bg-purple-500/30 hover:scale-110 pointer-events-auto"
          >
            <ChevronLeft className="text-gray-700 dark:text-gray-300" size={24} />
          </button>

          {/* boton derecho */}
          <button
            onClick={() => navTo('right')}
            className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-lg transition-all hover:bg-purple-400/30 dark:hover:bg-purple-500/30 hover:scale-110 pointer-events-auto"
          >
            <ChevronRight className="text-gray-700 dark:text-gray-300" size={24} />
          </button>

      </div>

      {/* contenedor principal con perspectiva 3D */}
      <div className="container mx-auto px-12 z-10 relative w-full h-[600px] flex items-center justify-center perspective-[2000px]">

        <AnimatePresence custom={direction} mode='popLayout'>

          <motion.div
            key={projectIndex}
            custom={direction}
            variants={fullSectionCubeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            style={{ transformOrigin: "50% 50% -450px" }}
            className="absolute w-full h-full grid grid-cols-3 gap-16 items-center pointer-events-none"
          >

            {/* lado izquierdo */}
            <div className="flex flex-col justify-center gap-6 pointer-events-auto">

              {/* texto pequeño superior */}
              <div className="mb-4">
                <span className="text-sm text-purple-600 dark:text-purple-400 font-extrabold tracking-[0.2em] uppercase drop-shadow-sm">
                  {t("Proyecto Destacado", "Featured Project")}
                </span>
              </div>

              {/* titulo */}
              <h2 className="text-5xl font-black text-gray-900 dark:text-gray-100 leading-tight drop-shadow-sm">
                {project.title}
              </h2>

              {/* descripcion */}
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                {project.description[language]}
              </p>

              {/* tecnologias */}
              <div className='flex flex-wrap gap-4 mt-2'>

                {project.techs.map((tech, i) => (
                  <SkillCard key={tech.name} {...tech} delay={i * 100} />
                ))}

              </div>

            </div>

            {/* parte central */}
            <div className="relative w-full h-[500px] flex flex-col justify-end items-center pointer-events-none pb-4">

              {/* links inferiores */}
              <div className="w-full px-8 flex justify-between pointer-events-auto">

                {/* boton de pagina web */}
                <div className="relative w-40 h-[44px]">

                  <a
                    href={project.websiteUrl || undefined}
                    target={project.websiteUrl ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={`absolute inset-0 flex items-center justify-center gap-2 backdrop-blur-xl border border-white/50 dark:border-white/10 px-5 py-2.5 rounded-full font-bold shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all ${project.websiteUrl ? 'bg-white/40 dark:bg-white/10 text-gray-800 dark:text-gray-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/60 dark:hover:bg-white/20 cursor-pointer' : 'bg-gray-300/40 dark:bg-gray-800/40 text-gray-400 dark:text-gray-600 cursor-not-allowed'}`}
                    onClick={(e) => {
                      if (!project.websiteUrl) {
                        e.preventDefault();
                      }
                    }}
                  >

                    <Globe size={18} className={project.websiteUrl ? "text-cyan-600" : "text-gray-400 dark:text-gray-600"} />

                    <span className="text-sm tracking-wide">
                      {t("Página Web", "Website")}
                    </span>

                  </a>

                </div>

                {/* boton de github */}
                <div className="relative w-36 h-[44px]">

                  <a
                    href={project.githubUrl || undefined}
                    target={project.githubUrl ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={`absolute inset-0 flex items-center justify-center gap-2 backdrop-blur-xl border border-white/50 dark:border-white/10 px-5 py-2.5 rounded-full font-bold shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all ${project.githubUrl ? 'bg-white/40 dark:bg-white/10 text-gray-800 dark:text-gray-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-white/60 dark:hover:bg-white/20 cursor-pointer' : 'bg-gray-300/40 dark:bg-gray-800/40 text-gray-400 dark:text-gray-600 cursor-not-allowed'}`}
                    onClick={(e) => {
                      if (!project.githubUrl) {
                        e.preventDefault();
                      }
                    }}
                  >

                    <SiGithub size={18} className={project.githubUrl ? "text-purple-600 dark:text-purple-400" : "text-gray-400 dark:text-gray-600"} />

                    <span className="text-sm tracking-wide">
                      GitHub
                    </span>

                  </a>

                </div>

              </div>

            </div>

            {/* lado derecho */}
            <div className="relative w-full h-[500px] flex items-center justify-center pointer-events-auto">

              {currentImages.map((imgUrl, i) => {

                let offset = i - imageIndex;

                if (offset < -1) {
                  offset += currentImages.length;
                }

                if (offset > 1) {
                  offset -= currentImages.length;
                }

                if (Math.abs(offset) > 1) {
                  return null;
                }

                const isCenter = offset === 0
                const isTop = offset === -1
                const isBottom = offset === 1

                let positionClasses = ""
                let zIndexClass = ""

                // imagen principal
                if (isCenter) {
                  positionClasses = "translate-x-12 scale-105 hover:scale-110 shadow-[0_20px_60px_rgba(0,0,0,0.3)] opacity-100";
                  zIndexClass = "z-30";
                }

                // imagen superior
                else if (isTop) {
                  positionClasses = "-translate-x-12 -translate-y-[140px] scale-90 opacity-60 hover:opacity-100 shadow-lg cursor-pointer";
                  zIndexClass = "z-10";
                }

                // imagen inferior
                else if (isBottom) {
                  positionClasses = "-translate-x-12 translate-y-[140px] scale-90 opacity-60 hover:opacity-100 shadow-lg cursor-pointer";
                  zIndexClass = "z-10";
                }

                return (
                  <div
                    key={i}
                    onClick={() => {

                      if (isTop) {
                        setImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
                      }

                      if (isBottom) {
                        setImageIndex((prev) => (prev + 1) % currentImages.length);
                      }

                    }}
                    className={`absolute w-full max-w-[320px] h-[230px] rounded-3xl overflow-hidden bg-white/20 dark:bg-black/20 backdrop-blur-xl border border-white/40 dark:border-white/10 transition-all duration-500 ease-out flex flex-col items-center justify-center text-gray-700 dark:text-gray-200 ${positionClasses} ${zIndexClass}`}
                  >

                    {/* imagen */}
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
                        title={t("Expandir imagen", "Expand image")}
                      >

                        <Maximize2 className="w-4 h-4 transition-transform group-active:scale-90" strokeWidth={2.5} />

                      </button>

                    )}

                  </div>
                );
              })}

            </div>

          </motion.div>

        </AnimatePresence>

      </div>

      {/* modal para expandir imagen */}
      {expandedImage && (

        <div
          className="absolute inset-0 z-[100] flex items-center justify-center p-8 bg-black/40 backdrop-blur-md pointer-events-auto transition-opacity"
          onClick={() => setExpandedImage(false)}
        >

          <div
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl w-full max-w-5xl h-[65vh] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] flex overflow-hidden border border-white/50 dark:border-white/10 relative"
            onClick={(e) => e.stopPropagation()}
          >

            {/* boton para cerrar */}
            <button
              onClick={() => setExpandedImage(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors z-10"
            >

              <X className="w-5 h-5 text-gray-700" />

            </button>

            {/* lado izquierdo del modal */}
            <div className="w-1/2 p-14 flex flex-col justify-center">

              <span className="text-purple-500 font-bold tracking-widest uppercase text-sm mb-4">
                {t("Detalle Visual", "Visual Detail")}
              </span>

              <h2 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-8 leading-tight">
                {project.title}
              </h2>

              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.description[language]}
              </p>

            </div>

            {/* lado derecho del modal */}
            <div className="w-1/2 bg-gray-100 dark:bg-gray-950 flex flex-col justify-center items-center border-l border-gray-200/50 dark:border-white/10 relative">

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