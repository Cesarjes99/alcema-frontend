import './App.css'
import { LanguageProvider } from './i18n/LanguageContext'
import LandingPage from './views/landing-page/LandingPage'

function App() {
  return (
    <LanguageProvider>
      <LandingPage />
    </LanguageProvider>
  )
}
export default App
