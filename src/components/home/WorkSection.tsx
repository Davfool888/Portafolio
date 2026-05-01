import { useEffect } from 'react'
import SkillCard from '../ui/SkillCard'

type Props = {
  setActiveSection?: (id: string) => void
}

export default function WorkSection({ setActiveSection }: Props) {

  const skills = [
    { icon: "⚛️", name: "React", color: "bg-purple-200" },
    { icon: "🟢", name: "Node", color: "bg-green-200" },
    { icon: "🎨", name: "Three.js", color: "bg-pink-200" }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && setActiveSection) {
          setActiveSection("work")
        }
      },
      { threshold: 0.5 }
    )
    const el = document.getElementById("work")
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [setActiveSection])

  return (
    <section
      id="work"
      className="h-[100vh] flex items-center relative"
    >
      {/* fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/10 via-transparent to-cyan-100/10 pointer-events-none" />


      {/* GRID PRINCIPAL */}
      <div className="container mx-auto px-12 z-10 grid grid-cols-3 gap-16">

        {/* IZQUIERDA */}
        <div className="flex flex-col justify-center gap-6">
          <span className="text-sm text-purple-600 font-semibold tracking-wide uppercase">
            Featured Project
          </span>
          <h2 className="text-5xl font-bold text-gray-900 leading-tight">
            AI Clash of Clans
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Desarrollé una inteligencia artificial para Clash of Clans que analiza aldeas mediante visión por computadora, identifica estructuras y evalúa estrategias de ataque, recomendando cómo y dónde desplegar tropas para maximizar la efectividad.          </p>

          <div className='flex gap-4 mt-2'>
            {skills.map((skill, i) => (
              <SkillCard key={skill.name} {...skill} delay={i * 100} />
            ))}
          </div>
        </div>

        {/* CENTRO */}
        <div className="flex items-center justify-center">
          {/* AQUÍ VA EL CUBO */}
        </div>

        {/* DERECHA */}
        <div className="flex items-center justify-center">

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