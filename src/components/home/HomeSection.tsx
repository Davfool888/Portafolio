import { useEffect } from 'react'
import ProfilelImage from '../ui/ProfileImage'
import ClayButton from '../ui/ClayButton'
import SkillCard from '../ui/SkillCard'

type Props = {
  setActiveSection?: (id: string) => void
}

export default function HomeSection({ setActiveSection }: Props) {

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && setActiveSection) {
          setActiveSection("home")
        }
      },
      { threshold: 0.5 }
    )
    const el = document.getElementById("home")
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [setActiveSection])

  const skills = [
    { icon: "⚛️", name: "React", color: "bg-purple-200" },
    { icon: "🟢", name: "Node", color: "bg-green-200" },
    { icon: "🎨", name: "Three.js", color: "bg-pink-200" }
  ]

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
            <ProfilelImage />

            <div>
              <h1 className="text-6xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent">
                FullStack <br /> Developer
              </h1>

              <p className="text-lg text-gray-600 mt-2 max-w-sm">
                Building modern web experiences
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <ClayButton>Ver Proyectos</ClayButton>
            <ClayButton variant="secondary">Contacto</ClayButton>
          </div>

          <div className="flex gap-4">
            {skills.map((skill, i) => (
              <SkillCard
                key={skill.name}
                {...skill}
                delay={i * 100}
              />
            ))}
          </div>

        </div>

        {/* DERECHA (Espacio vacío para el cubo 3D) */}
        <div className="relative w-full h-[500px] pointer-events-none">
        </div>

      </div>
    </section>
  )
}