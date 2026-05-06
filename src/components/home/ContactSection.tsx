import React, { useState } from 'react'




type Props = {
  setActiveSection?: (id: string) => void
}

export default function ContactSection({ setActiveSection }: Props) {

  // Estado para el formulario
  const [form, setForm] = useState({
    name: "",
    email: "",
    messege: "",
    contactMethod: "email"
  })

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(form)
  }

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center relative py-20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/10 via-transparent to-purple-100/10 pointer-events-none" />

      <div className="container mx-auto px-8 z-10 max-w-2xl w-full">



        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Contact
          </h2>

          <p className="text-gray-500">
            Tell me about your project
          </p>
        </div>



        {/* Formulario */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg border">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">


            {/* Nobre y email juntos */}
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
              name="messege"
              placeholder='Messenge'
              value={form.messege}
              onChange={handleChange}
              rows={5}
              required
              className="px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
            />

            <div>
              <p className="text-sm text-gray-600 mb-2">
                Preferred contact method: 
              </p>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                  type="radio" 
                  value="email"
                  checked={form.contactMethod === "email"}
                  onChange={handleMethodChange}
                  />
                  Email
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="whatsapp"
                    checked={form.contactMethod === "whatsapp"}
                    onChange={handleMethodChange}
                  />
                  WhatsApp
                </label>

                 <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="linkedin"
                    checked={form.contactMethod === "linkedin"}
                    onChange={handleMethodChange}
                  />
                  LinkedIn
                </label>
              </div>
            </div>

            <button type='submit' className="bg-purple-500 text-white py-3 rounded-xl hover:bg-purple-600 transition">
              Send
            </button>


          </form>
        </div>


      </div>
    </section>
  )
}