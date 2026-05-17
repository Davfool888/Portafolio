import React from "react"
import { Briefcase, FolderOpen, Globe, Moon, Sun } from "lucide-react"

interface Props {
    isDarkMode: boolean
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
    language: "es" | "en"
    toggleLanguage: () => void
}

export default function FloatingTags({ isDarkMode, setIsDarkMode, language, toggleLanguage }: Props) {

    // Funcion para traducir este componente que esta fuera del scroll
    const t = (es: string, en: string) => language === "es" ? es : en

    return (
        <div className="fixed bottom-8 left-0 w-full px-8 md:px-12 flex justify-between pointer-events-none z-50">

            {/* Tags flotantes del lado izquierdo */}
            <div className="flex gap-4 pointer-events-auto">
                <div className="flex items-center gap-2 bg-white/40 dark:bg-white/10 backdrop-blur-xl border border-white/50 dark:border-white/10 px-5 py-2.5 rounded-full text-gray-800 dark:text-gray-200 font-bold shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all cursor-default">
                    <FolderOpen size={18} className="text-purple-600 dark:text-purple-400" />
                    <span className="text-sm tracking-wide">
                        {t("4+ Proyectos", "4+ Projects")}
                    </span>
                </div>

                <div className="flex items-center gap-2 bg-white/40 dark:bg-white/10 backdrop-blur-xl border border-white/50 dark:border-white/10 px-5 py-2.5 rounded-full text-gray-800 dark:text-gray-200 font-bold shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all cursor-default">
                    <Briefcase size={18} className="text-cyan-600 dark:text-cyan-400" />
                    <span className="text-sm tracking-wide">
                        {t("2+ Años Exp", "2+ Yrs Exp")}
                    </span>
                </div>
            </div>

            {/* Botones flotantes del lado derecho */}
            <div className="flex gap-4 pointer-events-auto">

                {/* Boton para cambiar el idioma */}
                <button 
                    onClick={toggleLanguage}
                    className="flex items-center justify-center bg-white/40 dark:bg-white/10 backdrop-blur-xl border border-white/50 dark:border-white/10 w-11 h-11 rounded-full text-gray-700 dark:text-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/60 dark:hover:bg-white/20 hover:scale-110 active:scale-95 transition-all group relative"
                    title={t("Cambiar a Inglés", "Switch to Spanish")}
                >
                    <Globe size={20} strokeWidth={2.5} className="group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"/>

                    {/* Badge pequeño que muestra el idioma activo */}
                    <span className="absolute -top-1 -right-1 text-[10px] font-black bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                        {language.toUpperCase()}
                    </span>
                </button>

                {/* Boton para cambiar entre dark mode y light mode */}
                <button 
                 onClick={() => setIsDarkMode(prev => !prev)}
                 className="flex items-center justify-center bg-white/40 dark:bg-white/10 backdrop-blur-xl border border-white/50 dark:border-white/10 w-11 h-11 rounded-full text-gray-700 dark:text-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-white/60 dark:hover:bg-white/20 hover:scale-110 active:scale-95 transition-all group"
                 title={isDarkMode ? t("Cambiar a Modo Claro", "Switch to Light Mode") : t("Cambiar a Modo Oscuro", "Switch to Dark Mode")}
                >
                    {isDarkMode ? (
                        <Sun size={20} strokeWidth={2.5} className="group-hover:text-yellow-400 transition-colors" />
                    ) : (
                        <Moon size={20} strokeWidth={2.5} className="group-hover:text-cyan-600 transition-colors" />
                    )}
                </button>
            </div>
        </div>
    )
}