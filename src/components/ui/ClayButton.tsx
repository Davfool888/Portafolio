interface Props {
    children: React.ReactNode
    variant?: "primary" | "secondary"
    onClick?: () => void
    href?: string
}


export default function ClayButton({ children, variant = "primary", onClick, href }: Props) {

    
    const styles = {
        primary: `
      bg-gradient-to-br from-[#c471ed] to-[#a855f7]
      text-white
      shadow-[0_10px_30px_rgba(196,113,237,0.5),inset_0_2px_8px_rgba(255,255,255,0.6)]
    `,
        secondary: `
      bg-white/90 backdrop-blur
      text-gray-800
      shadow-[0_10px_30px_rgba(0,0,0,0.1),inset_0_2px_6px_rgba(255,255,255,0.8)]
    `
    }

    const baseClass = `
      px-8 py-4 rounded-2xl font-semibold
      transition-all duration-300
      hover:-translate-y-1 hover:scale-[1.02]
      active:scale-[0.98]
      ${styles[variant]}
    `

    // si tiene href se renderiza como link
    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={baseClass}
            >
                {children}
            </a>
        )
    }

    return (
        <button className={baseClass} onClick={onClick}>
            {children}
        </button>
    )
}