import React, { useState } from 'react'
import { FaWhatsapp, FaLinkedin, FaEnvelope } from 'react-icons/fa'



type Props = {
  setActiveSection?: (id: string) => void
}

export default function ContactSection({ }: Props) {

  // estado para el formulario
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    contactMethod: "email"
  })

  // estados de interfaz de carga
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const handleMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      contactMethod: e.target.value
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setStatus("idle")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Form enviado", form)
      setStatus("success")

      setForm({
        name: "",
        email: "",
        message: "",
        contactMethod: "email"
      })
    } catch (error) {
      setStatus("error")

    } finally {
      setLoading(false)
    }
  }

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

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center relative py-20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/10 via-transparent to-purple-100/10 pointer-events-none" />

      <div className="container mx-auto px-8 z-10 max-w-2xl w-full">



        {/* header */}
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Contact
          </h2>

          <p className="text-gray-500">
            Tell me about your project
          </p>
        </div>



        {/* formulario */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg border">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">


            {/* nombre y email juntos */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name='name'
                placeholder='Name'
                value={form.name}
                className="px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-300"
                onChange={handleChange}
              />

              <input
                type="email"
                name='email'
                placeholder='Email'
                value={form.email}
                className="px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-300"
                onChange={handleChange}
              />
            </div>


            <textarea
              name="message"
              placeholder='Messenge'
              value={form.message}
              onChange={handleChange}
              rows={5}
              required
              className="px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
            />


            {/* method */}

           <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Preferred contact method:
              </p>
              <div className="flex gap-4 flex-wrap">
                {contactOptions.map((option) => {
                  const isSelected = form.contactMethod === option.id;
                  return (
                    <label
                      key={option.id}
                      className={`
                        relative flex items-center gap-2 px-5 py-2.5 rounded-full cursor-pointer 
                        border-2 transition-all duration-300 ease-in-out font-semibold select-none
                        ${isSelected 
                          ? `${option.activeColor} scale-105`
                          : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300 grayscale opacity-70" 
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
                  );
                })}
              </div>
            </div>

            <button 
            type='submit' 
            disabled={loading}
            className="bg-purple-500 text-white py-3 rounded-xl hover:bg-purple-600 transition"
            >
              {loading ? "Sending.." : "Send Message"}
            </button>
            
            {/* feedback */}
              {status === "success" &&(
                <p className='text-green-500 text-sm'>
                  Message sent successfully
                </p>
              )}

              {status === "error" &&(
                <p className='text-red-500 text-sm'>
                  Something went wrong, Try again. 
                </p>
              )}

          </form>
        </div>


      </div>
    </section>
  )
}