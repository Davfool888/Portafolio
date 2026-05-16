import{
  SiReact, SiTypescript, SiJavascript, 
  SiFastapi, SiNodedotjs, SiPhp,
  SiMongodb, SiDocker, 
  SiJenkins, SiGithubactions, SiTensorflow 
} from 'react-icons/si';

import { FaDatabase, FaTerminal, FaLanguage,  } from 'react-icons/fa';

export const categoriesData = [
  {
    category: "Frontend",
    skills: [
      { icon: <SiReact />, name: "React", color: "bg-purple-200 text-purple-600" },
      { icon: <SiTypescript />, name: "TypeScript", color: "bg-blue-200 text-blue-600" },
      { icon: <SiJavascript />, name: "JavaScript", color: "bg-yellow-200 text-yellow-600" }
    ]
  },
  {
    category: "Backend",
    skills: [
      { icon: <SiFastapi />, name: "FastAPI", color: "bg-teal-200 text-teal-700" },
      { icon: <SiNodedotjs />, name: "Node.js", color: "bg-green-200 text-green-700" },
      { icon: <SiPhp />, name: "PHP", color: "bg-indigo-200 text-indigo-700" }
    ]
  },
  {
    category: "Databases",
    skills: [
      { icon: <SiMongodb />, name: "MongoDB", color: "bg-green-200 text-green-800" },
      { icon: <FaDatabase />, name: "SQL", color: "bg-blue-100 text-blue-600" },
      { icon: <FaDatabase />, name: "Power BI", color: "bg-yellow-300 text-yellow-700" }
    ]
  },
  {
    category: "CI/CD",
    skills: [
      { icon: <SiDocker />, name: "Docker", color: "bg-blue-300 text-blue-700" },
      { icon: <SiJenkins />, name: "Jenkins", color: "bg-red-200 text-red-600" },
      { icon: <SiGithubactions />, name: "GitHub Actions", color: "bg-gray-200 text-gray-700" }
    ]
  },
  {
    category: "Other Skills",
    skills: [
     { icon: <FaLanguage />, name: "English B2", color: "bg-blue-100 text-blue-600" },
      { icon: <SiTensorflow />, name: "TensorFlow", color: "bg-orange-200 text-orange-600" },
      { icon: <FaTerminal />, name: "WSL", color: "bg-green-100 text-green-700" }
    ]
  }
 
];