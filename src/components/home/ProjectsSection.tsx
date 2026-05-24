import { useState, useEffect, useRef } from 'react'
import SkillCard from '../ui/SkillCard'
import { projects } from '../../data/projects'
import { Globe, Maximize2, X } from "lucide-react"
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

  // direccion de la rotacion
  const [direction, setDirection] = useState(0)

  // carrusel de imagenes
  const [imageIndex, setImageIndex] = useState(0)

  // estado para expandir imagenes
  const [expandedImage, setExpandedImage] = useState(false)

  // bloqueo para evitar doble click rapido
  const isNavigating = useRef(false)

  // secuencia de caras pasando por opuestas
  // 0 top / 1 bottom / 2 front / 3 back / 4 left = 5 caras
  const faceSequence = [0, 1, 2, 3, 4]

  // indice actual en la secuencia
  const currentSeqIndex = faceSequence.indexOf(projectIndex) >= 0 ? faceSequence.indexOf(projectIndex) : 0

  // avanza o retrocede en la secuencia
  const navTo = (dir: 'next' | 'prev') => {

    if (isNavigating.current) return
    isNavigating.current = true

    const nextSeqIndex = dir === 'next'
      ? (currentSeqIndex + 1) % faceSequence.length
      : (currentSeqIndex - 1 + faceSequence.length) % faceSequence.length

    const nextFaceIndex = faceSequence[nextSeqIndex]

    setDirection(dir === 'next' ? 1 : -1)
    setProjectIndex(nextFaceIndex)

    // desbloquea despues de la transicion
    setTimeout(() => {
      isNavigating.current = false
    }, 900)
  }

  // proyecto actual
  const project = projects[projectIndex]

  // imagenes por defecto por si un proyecto no tiene
  const currentImages = project.images || [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop"
  ]

  // animacion del cubo girando en Y entre caras
  const fullSectionCubeVariants = {

    enter: (direction: number) => ({
      rotateY: direction > 0 ? 120 : -120,
      rotateX: direction > 0 ? 20 : -20,
      scale: 0.85,
      opacity: 0,
      filter: "blur(14px)",
      z: -200,
    }),

    center: {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      z: 0,
    },

    exit: (direction: number) => ({
      rotateY: direction > 0 ? -120 : 120,
      rotateX: direction > 0 ? -20 : 20,
      scale: 0.85,
      opacity: 0,
      filter: "blur(14px)",
      z: -200,
    })
  }

  // resetear el carrusel de imagenes cuando cambia el proyecto
  useEffect(() => {
    setImageIndex(0)
  }, [projectIndex])

  // navegacion con click del mouse
  useEffect(() => {

    // referencia para saber si el click fue en esta seccion
    const section = document.getElementById('projects')
    if (!section) return

    const handleMouseDown = (e: MouseEvent) => {

      // click izquierdo avanza
      if (e.button === 0) {
        const target = e.target as HTMLElement

        // no navega si el click fue en un boton o link
        if (target.closest('a') || target.closest('button') || target.closest('[data-no-nav]')) return

        navTo('next')
      }
    }

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()

      // click derecho retrocede
      navTo('prev')
    }

    section.addEventListener('mousedown', handleMouseDown)
    section.addEventListener('contextmenu', handleContextMenu)

    return () => {
      section.removeEventListener('mousedown', handleMouseDown)
      section.removeEventListener('contextmenu', handleContextMenu)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      style={{ cursor: 'pointer' }}
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
            transition={{ 
              duration: 0.75, 
              ease: [0.22, 1, 0.36, 1],
              opacity: { duration: 0.4 },
              filter: { duration: 0.5 }
            }}
            style={{ transformOrigin: "50% 50% -450px" }}
            className="absolute w-full h-full pointer-events-none"
          >

            {/* contenedor de las 3 columnas principales */}
            <div className="w-full h-full grid grid-cols-3 gap-16 items-center">

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

            {/* parte central libre para el cubo */}
            <div className="relative w-full h-[500px] pointer-events-none" />

            {/* lado derecho */}
            <div data-no-nav className="relative w-full h-[500px] flex items-center justify-center pointer-events-auto">

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

            </div>

            {/* links globales al fondo */}
            <div data-no-nav className="absolute -bottom-8 w-full flex justify-center gap-8 pointer-events-auto">

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

      {/* indicadores de cara actual */}
      <div data-no-nav className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none">

        {/* puntos */}
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-500 ${
                faceSequence[currentSeqIndex] === faceSequence[i]
                  ? 'w-5 h-2 bg-purple-500 dark:bg-purple-400'
                  : 'w-2 h-2 bg-gray-400/50 dark:bg-gray-600/50'
              }`}
            />
          ))}
        </div>

        {/* hint de navegacion */}
        <span className="text-xs text-gray-400 dark:text-gray-600 tracking-wide select-none">
          {t('click izq / click der para navegar', 'left click / right click to navigate')}
        </span>

      </div>

    </section>
  )
}