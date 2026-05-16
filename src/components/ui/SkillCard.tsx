import type { ReactNode } from "react"

interface Props {
    icon: ReactNode
    name: string
    color: string
    delay?: number
}

export default function SkillCard({ icon, name, color, delay = 0 }: Props) {
    return (
        <div className={`
            flex flex-col items-center justify-center gap-2
            px-5 py-4 rounded-2xl
            bg-gradient-to-br ${color}
            font-bold
            shadow-[0_10px_40px_rgba(0,0,0,0.15)]
            hover:-translate-y-2
            transition-all duration-300
        `}
        style={{ animationDelay: `${delay}ms` }}>
           
            <div className="text-3xl drop-shadow-md">{icon}</div>
            
            
            <div className="text-sm text-gray-900 dark:text-gray-100">{name}</div>
        </div>
    )
}
