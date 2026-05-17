import{
  SiReact, SiTypescript, SiJavascript, 
  SiFastapi, SiNodedotjs, SiPhp,
  SiMongodb, SiDocker, 
  SiJenkins, SiGithubactions, SiTensorflow 
} from 'react-icons/si';

import { FaDatabase, FaTerminal, FaLanguage,  } from 'react-icons/fa';

export const categoriesData = [
  {
    category: { es: "Frontend", en: "Frontend" },
    skills: [
      { icon: <SiReact />, name: "React", color: "bg-purple-200 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300" },
      { icon: <SiTypescript />, name: "TypeScript", color: "bg-blue-200 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300" },
      { icon: <SiJavascript />, name: "JavaScript", color: "bg-yellow-200 text-yellow-600 dark:bg-yellow-900/40 dark:text-yellow-300" }
    ]
  },
  {
    category: { es: "Backend", en: "Backend" },
    skills: [
      { icon: <SiFastapi />, name: "FastAPI", color: "bg-teal-200 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300" },
      { icon: <SiNodedotjs />, name: "Node.js", color: "bg-green-200 text-green-700 dark:bg-green-900/40 dark:text-green-300" },
      { icon: <SiPhp />, name: "PHP", color: "bg-indigo-200 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300" }
    ]
  },
  {
    category: { es: "Bases de Datos", en: "Databases" },
    skills: [
      { icon: <SiMongodb />, name: "MongoDB", color: "bg-green-200 text-green-800 dark:bg-green-900/40 dark:text-green-300" },
      { icon: <FaDatabase />, name: "SQL", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300" },
      { icon: <FaDatabase />, name: "Power BI", color: "bg-yellow-300 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300" }
    ]
  },
  {
    category: { es: "CI/CD", en: "CI/CD" },
    skills: [
      { icon: <SiDocker />, name: "Docker", color: "bg-blue-300 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
      { icon: <SiJenkins />, name: "Jenkins", color: "bg-red-200 text-red-600 dark:bg-red-900/40 dark:text-red-300" },
      { icon: <SiGithubactions />, name: "GitHub Actions", color: "bg-gray-200 text-gray-700 dark:bg-gray-800/60 dark:text-gray-300" }
    ]
  },
  {
    category: { es: "Otras Habilidades", en: "Other Skills" },
    skills: [
     { icon: <FaLanguage />, name: "English B2", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300" },
      { icon: <SiTensorflow />, name: "TensorFlow", color: "bg-orange-200 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300" },
      { icon: <FaTerminal />, name: "WSL", color: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" }
    ]
  }
 
];