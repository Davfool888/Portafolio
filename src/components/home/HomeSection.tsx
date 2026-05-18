import ClayButton from '../ui/ClayButton'
import RubikSkillsCarousel from '../../data/RubikSkillsCarousel'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { FileText } from 'lucide-react'

type Props = {
  setActiveSection?: (id: string) => void
  mainTitleToggle: boolean
  skillsCarouselIndex: number
  onNavigate?: (id: string) => void
}

export default function HomeSection({ mainTitleToggle,skillsCarouselIndex, onNavigate }: Props) {
  const { t } = useLanguage()

  // esto cambia entre el nombre y el titulo de developer
  const showName = mainTitleToggle


  // animacion de la palabra superior
  const topWordVariants = {
    initial: {rotateY: -90, opacity: 0}, 
    animate: {rotateY: 0, opacity: 1},
    exit: {rotateY: 90, opacity: 0}
  }

  // animacion de la palabra inferior
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

      {/* contenido principal del home */}
      <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10 pointer-events-none">

        {/* lado izquierdo */}
        <div className="flex flex-col gap-8 pointer-events-auto">

          {/* contenedor del titulo */}
          <div className="flex gap-6 items-center">
           
            <div>

              {/* contenedor con perspectiva para las animaciones */}
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
                      className="absolute text-6xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
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
                      className="absolute text-6xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                    >
                      {showName ? "Herrera" : "Developer"}

                    </motion.h1>

                  </AnimatePresence>

                </div>

              </div>

              {/* subtitulo */}
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 max-w-sm">
                {t("Construyendo experiencias de software modernas", "Building modern software experiences")}
              </p>

            </div>

          </div>

          {/* botones de navegacion */}
          <div className="flex gap-4 flex-wrap">

            {/* esto mueve la pagina hacia projects */}
            <ClayButton onClick={() => onNavigate?.('projects')}>
              {t("Ver Proyectos", "View Projects")}
            </ClayButton>

            {/* esto mueve la pagina hacia contact */}
            <ClayButton variant="secondary" onClick={() => onNavigate?.('contact')}>
              {t("Contacto", "Contact")}
            </ClayButton>

            {/* boton que abre el pdf del cv */}
            <ClayButton variant="secondary" href="/documents/CV_DAVIDHERRERA.pdf">
              <span className="flex items-center gap-2">
                <FileText size={18} />
                {t("Hoja de Vida", "Resume")}
              </span>
            </ClayButton>

          </div>

          {/* carrusel de skills */}
          <div className="mt-8">
            <RubikSkillsCarousel skillsCarouselIndex={skillsCarouselIndex} />
          </div>

        </div>

        {/* lado derecho */}
        <div className="relative w-full h-[500px] pointer-events-none">
        </div>

      </div>

    </section>
  )
}