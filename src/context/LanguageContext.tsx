import React, { createContext, useContext } from 'react';

type Language = 'es' | 'en';

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
  t: (esText: string, enText: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Provider para manejar el idioma en toda la app
// El estado viene desde afuera para que funcione con el scroll de drei
export const LanguageProvider: React.FC<{
  children: React.ReactNode;
  language: Language;
  toggleLanguage: () => void;
}> = ({ children, language, toggleLanguage }) => {

  // Funcion para traducir texto rapido sin usar condicionales en cada componente
  const t = (esText: string, enText: string) => {
    return language === 'es' ? esText : enText;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook para usar el contexto del idioma desde cualquier componente
export const useLanguage = () => {
  const context = useContext(LanguageContext);

  // Esto evita usar el contexto fuera del provider
  if (!context) {
    throw new Error('useLanguage debe estar dentro de un LanguageProvider');
  }

  return context;
};