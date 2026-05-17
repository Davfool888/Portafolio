import React, { useState } from 'react'
import { FaWhatsapp, FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa'
import { useLanguage } from '../../context/LanguageContext'


type Props = {
  setActiveSection?: (id: string) => void
}

export default function ContactSection({ }: Props) {

  const { t } = useLanguage()

  // Estado del formulario
  const [form, setForm] = useState({
    name: "",
    contactValue: "",
    message: "",
    contactMethod: "email"
  })

  // Estados de carga y feedback
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  // Cambia el metodo de contacto
  const handleMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setForm({
      ...form,
      contactMethod: e.target.value
    })
  }

  // Actualiza los inputs del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // Envia el formulario
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    setLoading(true)
    setStatus("idle")

    try {

      await new Promise((resolve) => setTimeout(resolve, 1500))

      console.log("Form enviado", form)

      setStatus("success")

      // Reinicia el formulario
      setForm({
        name: "",
        contactValue: "",
        message: "",
        contactMethod: "email"
      })

    } catch (error) {

      setStatus("error")

    } finally {

      setLoading(false)
    }
  }

  // Opciones de contacto
  const contactOptions = [
    {
      id: "email",
      label: "Email",
      icon: <FaEnvelope className="text-lg" />,
      activeColor: "bg-purple-50 border-purple-400 text-purple-700 shadow-md shadow-purple-200/50",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: <FaWhatsapp className="text-lg" />,
      activeColor: "bg-green-50 border-green-500 text-green-700 shadow-md shadow-green-200/50",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: <FaLinkedin className="text-lg" />,
      activeColor: "bg-blue-50 border-blue-500 text-blue-700 shadow-md shadow-blue-200/50",
    }
  ]

  // Logica dinamica del input de contacto
  let inputType = "email"
  let inputPlaceholder = "Email"

  if (form.contactMethod === "whatsapp") {

    inputType = "tel"
    inputPlaceholder = "Número de WhatsApp"

  } else if (form.contactMethod === "linkedin") {

    inputType = "url"
    inputPlaceholder = "Link de perfil de LinkedIn"
  }

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center relative py-20"
    >

      {/* Fondo suave de la seccion */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/10 via-transparent to-purple-100/10 pointer-events-none" />

      {/* Grid principal dividido en 2 lados */}
      <div className="container mx-auto px-8 z-10 grid grid-cols-1 lg:grid-cols-2 h-full items-center w-full">

        {/* Parte izquierda con el formulario */}
        <div className="flex flex-col justify-center h-full max-w-xl pointer-events-auto">

          {/* Header principal */}
          <div className="mb-10">

            <h2 className="text-6xl font-extrabold text-gray-800 dark:text-gray-100 mb-4 tracking-tight drop-shadow-sm">
              {t("Hablemos", "Let's Talk")}
            </h2>

            <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">
              {t("Cuéntame sobre tu proyecto y cómo prefieres ser contactado", "Tell me about your project and how you prefer to be contacted")}
            </p>

          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Selector del metodo de contacto */}
            <div className="flex flex-col gap-3 mb-2">

              <div className="flex gap-4 flex-wrap">

                {contactOptions.map((option) => {

                  const isSelected = form.contactMethod === option.id

                  return (
                    <label
                      key={option.id}
                      className={`
                        relative flex items-center gap-3 px-6 py-3 rounded-2xl cursor-pointer 
                        transition-all duration-300 ease-in-out font-bold select-none backdrop-blur-lg shadow-sm border border-white/40 dark:border-white/10
                        ${isSelected 
                          ? `${option.activeColor} scale-105 border-transparent`
                          : "bg-white/50 dark:bg-black/20 text-gray-500 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-white/10 hover:-translate-y-1 grayscale opacity-70 hover:grayscale-0 hover:opacity-100" 
                        }
                      `}
                    >

                      <input
                        type="radio"
                        value={option.id}
                        checked={isSelected}
                        onChange={handleMethodChange}
                        disabled={loading}
                        className="hidden"
                      />

                      {option.icon}

                      {option.label}

                    </label>
                  )
                })}

              </div>

            </div>

            {/* Inputs principales */}
            <div className="grid grid-cols-2 gap-6">

              <input
                type="text"
                name='name'
                placeholder={t("Nombre", "Name")}
                value={form.name}
                className="px-5 py-4 rounded-2xl border-none bg-white/60 dark:bg-black/30 backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/90 dark:focus:bg-black/50 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 w-full"
                onChange={handleChange}
              />

              {/* Input dinamico dependiendo del metodo */}
              <input
                type={inputType}
                name='contactValue'
                placeholder={
                  form.contactMethod === "whatsapp"
                    ? t("Número de WhatsApp", "WhatsApp Number")
                    : form.contactMethod === "linkedin"
                    ? t("Enlace de LinkedIn", "LinkedIn URL")
                    : t("Correo electrónico", "Email Address")
                }
                value={form.contactValue}
                className="px-5 py-4 rounded-2xl border-none bg-white/60 dark:bg-black/30 backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/90 dark:focus:bg-black/50 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 w-full"
                onChange={handleChange}
              />

            </div>

            {/* Textarea principal */}
            <textarea
              name="message"
              placeholder={t("Mensaje...", "Message...")}
              value={form.message}
              onChange={handleChange}
              rows={5}
              required
              className="px-5 py-4 rounded-2xl border-none bg-white/60 dark:bg-black/30 backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white/90 dark:focus:bg-black/50 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 w-full resize-none"
            />

            {/* Boton para enviar */}
            <button
              type='submit'
              disabled={loading}
              className="mt-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold text-lg py-4 rounded-2xl shadow-[0_10px_30px_rgba(168,85,247,0.4)] hover:shadow-[0_15px_40px_rgba(168,85,247,0.6)] hover:-translate-y-1 active:translate-y-0 transition-all duration-300 w-full"
            >
              {loading ? t("Enviando...", "Sending...") : t("Enviar Mensaje", "Send Message")}
            </button>

            {/* Feedback del formulario */}
            <div className="h-6 flex items-center justify-center">

              {status === "success" &&(
                <p className='text-green-500 font-semibold animate-pulse'>
                  {t("¡Mensaje enviado con éxito!", "Message sent successfully!")}
                </p>
              )}

              {status === "error" &&(
                <p className='text-red-500 font-semibold animate-pulse'>
                  {t("Algo salió mal. Inténtalo de nuevo.", "Something went wrong. Try again.")}
                </p>
              )}

            </div>

          </form>

          {/* Redes sociales */}
          <div className="mt-8 pt-8 border-t border-gray-200/50 dark:border-white/10 flex flex-col gap-4">

            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              {t("También me encuentras en", "You can also find me on")}
            </p>

            <div className="flex gap-4">

              {/* Boton de email */}
              <a
                href="mailto:Davfool888@gmail.com"
                className="w-14 h-14 bg-white/60 dark:bg-black/30 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-[0_8px_20px_rgb(0,0,0,0.05)] hover:bg-white hover:scale-110 hover:-translate-y-1 hover:shadow-purple-500/20 transition-all duration-300 text-purple-600 dark:text-purple-400 group"
              >
                <FaEnvelope size={24} className="group-hover:rotate-12 transition-transform" />
              </a>

              {/* Boton de linkedin */}
              <a
                href="https://www.linkedin.com/in/david-herrera-reales/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/60 dark:bg-black/30 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-[0_8px_20px_rgb(0,0,0,0.05)] hover:bg-white hover:scale-110 hover:-translate-y-1 hover:shadow-blue-500/20 transition-all duration-300 text-blue-600 dark:text-blue-400 group"
              >
                <FaLinkedin size={24} className="group-hover:-rotate-12 transition-transform" />
              </a>

              {/* Boton de github */}
              <a
                href="https://github.com/Davfool888"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/60 dark:bg-black/30 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-[0_8px_20px_rgb(0,0,0,0.05)] hover:bg-white hover:scale-110 hover:-translate-y-1 hover:shadow-gray-500/20 transition-all duration-300 text-gray-800 dark:text-white group"
              >
                <FaGithub size={24} className="group-hover:rotate-12 transition-transform" />
              </a>

            </div>

          </div>

        </div>

        {/* Parte derecha donde se acomoda el cubo */}
        <div className="h-full w-full pointer-events-none flex items-center justify-center">

          {/* El cubo cae aca por coordenadas */}

        </div>

      </div>
    </section>
  )
}