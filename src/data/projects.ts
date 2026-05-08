export type Project = {
  title: string
  description: string
}

export const projects: Project[] = [
  {
    title: "Frontend for Real-Time Structure Detection",
    description:
      "Frontend desarrollado en React para visualización en tiempo real de detección de estructuras mediante modelos de visión computacional e integración con APIs de inferencia IA."
  },

  {
    title: "AI Inference Backend",
    description:
      "Backend construido con FastAPI encargado del procesamiento de imágenes, análisis táctico y comunicación con modelos de inteligencia artificial para reconocimiento de objetos y generación de inferencias en tiempo real."
  },

  {
    title: "Computer Vision Training Pipeline",
    description:
      "Pipeline de entrenamiento y clasificación de objetos utilizando YOLOv8 para detección de estructuras, calibración de parámetros y optimización de datasets mediante técnicas de computer vision."
  },

  {
    title: "DevOps Inventory System",
    description:
      "Arquitectura contenerizada para un sistema de inventario con automatización de pipelines CI/CD, despliegue mediante Docker Compose, pruebas automatizadas e integración continua con Jenkins."
  },

  {
    title: "Smart Inventory Management System",
    description:
      "Sistema de inventario orientado a tiendas, bares y empresas, enfocado en gestión de productos, control de stock y arquitectura escalable para entornos empresariales."
  },

  {
    title: "E-Commerce Fashion Store",
    description:
      "Tienda online desarrollada en Shopify para comercialización de prendas de vestir, integrando catálogo de productos, personalización visual y experiencia optimizada para ventas digitales."
  }
]