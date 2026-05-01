interface Props{
    icon: string
    name: string
    color:string
    delay?:number
}

export default function SkillCard({icon, name, color, delay = 0}: Props){
    
    return(
        <div  className={`
        px-5 py-4 rounded-2xl
        bg-gradient-to-br ${color}
        text-gray-900 font-bold
        shadow-[0_10px_40px_rgba(0,0,0,0.15)]
        hover:-translate-y-2
        transition-all duration-300
      `}
      style={{ animationDelay: `${delay}ms` }}>
            <div className="text-2xl">{icon}</div>
            <div>{name}</div>
        </div>
    )
}