import ClayButton from '../ui/ClayButton'
import RubikSkillsCarousel from '../../data/RubikSkillsCarousel'
import { AnimatePresence, motion } from 'framer-motion'

type Props = {
  setActiveSection?: (id: string) => void
  mainTitleToggle: boolean
  skillsCarouselIndex: number
}

export default function HomeSection({ setActiveSection, mainTitleToggle,skillsCarouselIndex  }: Props) {

const showName = mainTitleToggle



  const topWordVariants = {
    initial: {rotateY: -90, opacity: 0}, 
    animate: {rotateY: 0, opacity: 1},
    exit: {rotateY: 90, opacity: 0}
  }

   const bottomWordVariants = {
    initial: {rotateY: 90, opacity: 0}, 
    animate: {rotateY: 0, opacity: 1},
    exit: {rotateY: -90, opacity: 0}
  }


  return (
    <section
      id="home"
      className="h-[100vh] flex items-center relative"
    >
      {/* CONTENIDO */}
      <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10 pointer-events-none">

        {/* IZQUIERDA */}
        <div className="flex flex-col gap-8 pointer-events-auto">

          <div className="flex gap-6 items-center">
           

            <div>
              <div className="flex flex-col gap-2 perspective-1000 h-[150px] w-full">
              {/* palabra superior */}
              <div className="relative h-[72px] flex items-center">
                <AnimatePresence>
                  <motion.h1
                  key={showName ? "david" : "fullstack"}
                  variants={topWordVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{type:"spring", bounce: 0.3, duration:0.8}}
                  style={{ transformOrigin: "center center -50px" }} 
                  className="absolute text-6xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent"
                  >
                    {showName ? "David" : "FullStack"}

                  </motion.h1>
                </AnimatePresence>
              </div>
              {/* palabra inferior */}

              <div className="relative h-[72px] flex items-center">
                <AnimatePresence mode='popLayout'>
                  <motion.h1
                  key={showName ? "herrera" : "developer"}
                  variants={bottomWordVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{type:"spring", bounce: 0.3, duration:0.8}}
                  style={{ transformOrigin: "center center -50px" }} 
                  className="absolute text-6xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent"
                  >
                    {showName ? "Herrera" : "Developer"}

                  </motion.h1>
                </AnimatePresence>
              </div>
              </div>
              <p className="text-lg text-gray-600 mt-2 max-w-sm">
                Building modern software experiences
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <ClayButton>Ver Proyectos</ClayButton>
            <ClayButton variant="secondary">Contacto</ClayButton>
          </div>

          <div className="mt-8">
            <RubikSkillsCarousel skillsCarouselIndex={skillsCarouselIndex} />
          </div>


        </div>

        {/* DERECHA */}
        <div className="relative w-full h-[500px] pointer-events-none">
        </div>

      </div>
    </section>
  )
}