

type Props = {
  setActiveSection?: (id: string) => void 
}

export default function PlaySection({}: Props) {



  return (
    <section
      id="play"
      className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
    >
      
      {/* fondo suave */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/10 via-transparent to-purple-100/10 pointer-events-none" />

      {/* contenido */}
      <div className="z-10 text-center pointer-events-none">

        <h2 className="text-5xl font-bold text-gray-800 dark:text-gray-100 pointer-events-auto">
         
        </h2>

        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 pointer-events-auto">
         
        </p>

      </div>

    </section>
  )
}