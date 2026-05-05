import { useEffect } from 'react'

type Props = {
  setActiveSection?: (id: string) => void
}

export default function ContactSection({ setActiveSection }: Props) {
   

  return (
    <section
      id="contact"
      className="h-[100vh] flex items-center relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/10 via-transparent to-purple-100/10 pointer-events-none" />

      <div className="container mx-auto px-8 z-10 text-center pointer-events-none">
        <div className="pointer-events-auto inline-block">
          <h2 className="text-5xl font-bold text-gray-800">
            Contact
          </h2>

          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            This is the contact section
          </p>
        </div>
      </div>
    </section>
  )
}