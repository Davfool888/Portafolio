import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categoriesData } from "./categoriesData";

type Props = {
  skillsCarouselIndex: number
}

function ClaySkillCard({
  icon,
  name,
  color
}: {
  icon: React.ReactNode
  name: string
  color: string
}) {
  return (
    <div
      className={`
        relative flex flex-col items-center justify-center gap-2 
        w-32 h-32 
        rounded-[2rem] 
        ${color} 
        shadow-[inset_4px_4px_10px_rgba(255,255,255,0.7),inset_-4px_-4px_15px_rgba(0,0,0,0.08),0_15px_30px_-5px_rgba(0,0,0,0.15)]
        hover:-translate-y-2 hover:scale-105
        transition-all duration-300 group
      `}
    >
      {/* Brillo */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-black/5 rounded-[2rem] pointer-events-none" />

      {/* Icono */}
      <div className="relative text-[40px] drop-shadow-xl group-hover:scale-110 transition-transform duration-300 z-10">
        {icon}
      </div>

      {/* Texto */}
      <div className="relative text-gray-800 font-extrabold text-sm tracking-wide z-10 mt-1 text-center px-2 leading-tight">
        {name}
      </div>
    </div>
  )
}

export default function RubikSkillsCarousel({
  skillsCarouselIndex
}: Props) {

  const dataSkills = categoriesData

  // Índice sincronizado con movimientos reales del cubo
  const currentIndex =
    ((skillsCarouselIndex % dataSkills.length) + dataSkills.length) %
    dataSkills.length

  const currentCategory = dataSkills[currentIndex]

  // Alternar dirección visual
  const flipDirection = skillsCarouselIndex % 2 === 0

  // Dirección para animación del título
  const direction = flipDirection ? 1 : -1

  // Variantes título
  const titleVariants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 90 : -90,
      opacity: 0,
    }),

    center: {
      rotateY: 0,
      opacity: 1,
    },

    exit: (dir: number) => ({
      rotateY: dir > 0 ? -90 : 90,
      opacity: 0,
    }),
  }

  // Variantes izquierda
  const leftSkillVariants = {
    enter: (flip: boolean) => ({
      rotateX: flip ? 90 : -90,
      opacity: 0,
    }),

    center: {
      rotateX: 0,
      opacity: 1,
    },

    exit: (flip: boolean) => ({
      rotateX: flip ? -90 : 90,
      opacity: 0,
    }),
  }

  // Variantes derecha
  const rightSkillVariants = {
    enter: (flip: boolean) => ({
      rotateX: flip ? -90 : 90,
      opacity: 0,
    }),

    center: {
      rotateX: 0,
      opacity: 1,
    },

    exit: (flip: boolean) => ({
      rotateX: flip ? 90 : -90,
      opacity: 0,
    }),
  }

  return (
    <div className="flex flex-col gap-8 w-full max-w-lg pointer-events-auto">

      {/* Header */}
      <div className="flex items-center justify-center bg-white/20 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-lg border border-white/30">

       
        {/* Título */}
        <div
          style={{ perspective: 1000 }}
          className="relative h-8 flex-1 flex items-center justify-center overflow-visible"
        >
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.h3
              key={currentIndex}
              custom={direction}
              variants={titleVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: "spring",
                bounce: 0.3,
                duration: 0.6
              }}
              style={{
                transformOrigin: "center center -50px"
              }}
              className="absolute text-xl font-bold text-gray-800 tracking-wide uppercase"
            >
              {currentCategory.category}
            </motion.h3>
          </AnimatePresence>
        </div>

      
      </div>

      {/* Cards */}
      <div className="flex gap-4 items-center justify-center">

        {/* LEFT */}
        <div
          style={{ perspective: 1000 }}
          className="relative w-32 h-32"
        >
          <AnimatePresence
            mode="popLayout"
            custom={flipDirection}
          >
            <motion.div
              key={`left-${currentIndex}`}
              custom={flipDirection}
              variants={leftSkillVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: "spring",
                bounce: 0.4,
                duration: 0.7
              }}
              style={{
                transformOrigin: "center center -50px"
              }}
              className="absolute inset-0"
            >
              <ClaySkillCard
                {...currentCategory.skills[0]}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CENTER */}
        <div className="relative w-32 h-32 z-10">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`center-${currentIndex}`}
              initial={{
                opacity: 0,
                scale: 0.8
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              exit={{
                opacity: 0,
                scale: 0.8
              }}
              transition={{
                duration: 0.4
              }}
              className="absolute inset-0"
            >
              <ClaySkillCard
                {...currentCategory.skills[1]}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT */}
        <div
          style={{ perspective: 1000 }}
          className="relative w-32 h-32"
        >
          <AnimatePresence
            mode="popLayout"
            custom={flipDirection}
          >
            <motion.div
              key={`right-${currentIndex}`}
              custom={flipDirection}
              variants={rightSkillVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: "spring",
                bounce: 0.4,
                duration: 0.7
              }}
              style={{
                transformOrigin: "center center -50px"
              }}
              className="absolute inset-0"
            >
              <ClaySkillCard
                {...currentCategory.skills[2]}
              />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}