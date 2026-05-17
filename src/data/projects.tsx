import type { ReactNode } from "react";
import { 
  SiReact, SiJavascript, SiFastapi, SiMongodb, SiPython, 
  SiDocker, SiGithub, SiJenkins, SiWordpress, SiShopify, SiNodedotjs
} from 'react-icons/si';

import { FaRobot, FaEye, FaDatabase } from 'react-icons/fa';

export type Project = {
  title: string
  description: {
    es: string
    en: string
  }
  images?: string[]
  techs: { icon: ReactNode, name: string, color: string }[] 
  websiteUrl?: string;
  githubUrl?: string; 
}

export const projects: Project[] = [
  {
    title: "Frontend for Real-Time Structure Detection",
    description: {
      es: "Frontend desarrollado en React para visualización en tiempo real de detección de estructuras mediante modelos de visión computacional e integración con APIs de inferencia IA.",
      en: "React-based Frontend for real-time visualization of structure detection using computer vision models, seamlessly integrated with AI inference APIs."
    },
    techs: [
      { icon: <SiReact />, name: "React", color: "from-purple-200 to-purple-300 text-purple-700" },
      { icon: <SiJavascript />, name: "JavaScript", color: "from-yellow-200 to-yellow-300 text-yellow-700" }
    ], 
    githubUrl: "https://github.com/Davfool888/ClashOfClansIa_Frontend", 
  },
  {
    title: "AI Inference Backend",
    description: {
      es: "Backend construido con FastAPI encargado del procesamiento de imágenes, análisis táctico y comunicación con modelos de inteligencia artificial para reconocimiento de objetos y generación de inferencias en tiempo real.",
      en: "FastAPI Backend dedicated to image processing, tactical analysis, and communication with AI models for real-time object recognition and inference generation."
    },
    techs: [
      { icon: <SiFastapi />, name: "FastAPI", color: "from-teal-200 to-teal-300 text-teal-700" },
      { icon: <SiMongodb />, name: "MongoDB", color: "from-green-200 to-green-300 text-green-700" },
      { icon: <SiPython />, name: "Python", color: "from-blue-200 to-blue-300 text-blue-700" }
    ],
    githubUrl: "https://github.com/Davfool888/ClashOfClansIa_Backend", 
  },
  {
    title: "Computer Vision Training Pipeline",
    description: {
      es: "Pipeline de entrenamiento y clasificación de objetos utilizando YOLOv8 para detección de estructuras, calibración de parámetros y optimización de datasets mediante técnicas de computer vision.",
      en: "Object classification and training pipeline utilizing YOLOv8 for structure detection, parameter calibration, and dataset optimization via computer vision techniques."
    },
    techs: [
      { icon: <SiPython />, name: "Python", color: "from-blue-200 to-blue-300 text-blue-700" },
      { icon: <FaRobot />, name: "Roboflow", color: "from-purple-200 to-purple-300 text-purple-700" },
      { icon: <FaEye />, name: "YOLOv8", color: "from-cyan-200 to-cyan-300 text-cyan-700" }
    ]
  },
  {
    title: "DevOps Inventory System",
    description: {
      es: "Arquitectura contenerizada para un sistema de inventario con automatización de pipelines CI/CD, despliegue mediante Docker Compose, pruebas automatizadas e integración continua con Jenkins.",
      en: "Containerized architecture for an inventory system featuring CI/CD pipeline automation, Docker Compose deployment, automated testing, and continuous integration with Jenkins."
    },
    techs: [
      { icon: <SiDocker />, name: "Docker", color: "from-blue-300 to-blue-400 text-blue-800" },
      { icon: <SiGithub />, name: "GitHub", color: "from-gray-200 to-gray-300 text-gray-800" },
      { icon: <SiJenkins />, name: "Jenkins", color: "from-red-200 to-red-300 text-red-700" }
    ],
    githubUrl: "https://github.com/Davfool888/IntegracionC", 
  },
  {
    title: "Smart Inventory Management System",
    description: {
      es: "Sistema de inventario orientado a tiendas, bares y empresas, enfocado en gestión de productos, control de stock y arquitectura escalable para entornos empresariales.",
      en: "Inventory system designed for retail stores, bars, and companies, focusing on product management, stock control, and a scalable architecture for enterprise environments."
    },
    techs: [
      { icon: <SiReact />, name: "React", color: "from-purple-200 to-purple-300 text-purple-700" },
      { icon: <SiNodedotjs />, name: "Node.js", color: "from-green-200 to-green-300 text-green-700" },
      { icon: <FaDatabase />, name: "SQL", color: "from-blue-200 to-blue-300 text-blue-700" }
    ]
  },
  {
    title: "E-Commerce Fashion Store",
    description: {
      es: "Tienda online desarrollada en Shopify para comercialización de prendas de vestir, integrando catálogo de productos, personalización visual y experiencia optimizada para ventas digitales.",
      en: "Online fashion store built on Shopify, integrating a product catalog, visual customization, and a highly optimized experience for digital sales and commerce."
    },
    techs: [
      { icon: <SiWordpress />, name: "WordPress", color: "from-blue-200 to-blue-300 text-blue-800" },
      { icon: <SiReact />, name: "React", color: "from-purple-200 to-purple-300 text-purple-700" },
      { icon: <SiShopify />, name: "Shopify", color: "from-green-200 to-green-300 text-green-800" }
    ]
  }
];
