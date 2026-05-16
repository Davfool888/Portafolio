import { useState, useEffect } from "react"

type Props = {
  sections: string[]
  onNavigate: (section: string) => void
  activeSection: string
  scrollElRef: React.MutableRefObject<HTMLElement | null>
  scrollReady: boolean 
}

export default function Navbar({ sections, onNavigate, activeSection, scrollElRef, scrollReady  }: Props) {

  // controlador de estados para esconder navbar
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const isVisible = !hasScrolled || isHovering

  useEffect(() => {

    const el = scrollElRef?.current
    const target = el ?? window

    const handleScroll = () => {
      const scrollY = el ? el.scrollTop : window.scrollY

      setHasScrolled(scrollY > 50)


    }
    target.addEventListener("scroll", handleScroll)
    return () => target.removeEventListener('scroll', handleScroll)
  }, [scrollReady])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {

      const inTopZone = e.clientY < 80
      const inCenterZone = e.clientX > window.innerWidth * 0.25 && e.clientX < window.innerWidth * 0.75

      setIsHovering(inTopZone && inCenterZone)


    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>

      <div
        className="fixed top-0 left-1/4 w-1/2 h-20 z-40 pointer-events-none"
        aria-hidden="true"
      />

      <nav
        className={`
          fixed top-4 left-1/2 z-50 -translate-x-1/2
          transition-all duration-500 ease-in-out
          ${isVisible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-24 opacity-0 pointer-events-none'
          }
        `}
      >
        <div className="flex gap-2 rounded-full border border-white/40 dark:border-white/10 bg-white/80 dark:bg-black/30 px-6 py-3 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.12),inset_0_2px_10px_rgba(255,255,255,0.9)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_2px_10px_rgba(255,255,255,0.1)]">
          {sections.map((section) => {
            const isActive = activeSection === section
            return (
              <button
                key={section}
                onClick={() => onNavigate(section)}
                className={`relative rounded-full px-5 py-2 capitalize font-semibold transition-all duration-300 ${isActive
                  ? 'bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-[0_6px_20px_rgba(168,85,247,0.6)] -translate-y-0.5'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-purple-200/40 dark:hover:bg-purple-500/20 hover:-translate-y-0.5'
                  }`}
              >
                {section}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
                )}
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}