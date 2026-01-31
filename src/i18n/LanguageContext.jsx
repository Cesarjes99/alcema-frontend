import { createContext, useContext, useState, useEffect } from 'react'
import es from './translations/es.json'
import en from './translations/en.json'

const translations = { es, en }

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const stored = localStorage.getItem('alcema-language')
    return stored === 'en' ? 'en' : 'es'
  })

  useEffect(() => {
    localStorage.setItem('alcema-language', language)
  }, [language])

  const t = (path) => {
    const keys = path.split('.')
    let value = translations[language]
    for (const key of keys) {
      value = value?.[key]
    }
    return value ?? path
  }

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'es' ? 'en' : 'es'))
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
