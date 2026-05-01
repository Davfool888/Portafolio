import { useEffect } from "react"

type Props = {
  setActiveSection?: (id: string) => void
}

export default function PlaySection({ setActiveSection }: Props) {

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && setActiveSection) {
          setActiveSection("play")
        }
      },
      { threshold: 0.5 }
    )

    const el = document.getElementById("play")
    if (el) observer.observe(el)

    return () => observer.disconnect()
  }, [setActiveSection])

  return (
    <section
      id="play"
      className="h-[100vh] flex flex-col items-center justify-center relative"
    >
      
      {/* Fondo suave (igual estilo que las otras secciones) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/10 via-transparent to-purple-100/10 pointer-events-none" />

      {/* Contenido */}
      <div className="z-10 text-center pointer-events-none">

        <h2 className="text-5xl font-bold text-gray-800 pointer-events-auto">
          Play
        </h2>

        <p className="mt-4 text-lg text-gray-600 pointer-events-auto">
          Interact with the cube freely
        </p>

      </div>

    </section>
  )
}