type Props = {
  sections: string[]
  onNavigate: (section: string) => void
  activeSection: string
}

export default function Navbar({
  sections,
  onNavigate,
  activeSection,
}: Props) {
  return (
    <nav className="fixed top-8 left-1/2 z-50 -translate-x-1/2">
      <div className="flex gap-2 rounded-full border border-white/40 bg-white/80 px-6 py-3 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.12),inset_0_2px_10px_rgba(255,255,255,0.9)]">
        {sections.map((section) => {
          const isActive = activeSection === section

          return (
            <button
              key={section}
              onClick={() => onNavigate(section)}
              className={`relative rounded-full px-5 py-2 capitalize font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-linear-to-br from-purple-400 to-purple-600 text-white shadow-[0_6px_20px_rgba(168,85,247,0.6)] -translate-y-0.5"
                  : "text-gray-700 hover:bg-purple-200/40 hover:-translate-y-0.5"
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
  )
}