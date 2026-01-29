import { useState } from 'react'
import logoGreen from '../../assets/logos/logo-green.png'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    setIsMenuOpen(false)
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-background border-b border-black/10 z-50">
      <div className="max-w-7xl mx-auto px-7 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a 
            href="#inicio" 
            onClick={(e) => {
              e.preventDefault()
              sessionStorage.setItem('scrollToTop', 'true')
              window.location.reload()
            }}
            className="cursor-pointer"
          >
            <img src={logoGreen} alt="ALCEMA logo" className="h-18" />
          </a>
        </div>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center gap-15 font-medium">
          <a href="#inicio" className="hover:text-accent transition">
            Inicio
          </a>
          <a href="#nosotros" className="hover:text-accent transition">
            Nosotros
          </a>
          <a href="#cultivos" className="hover:text-accent transition">
            Cultivos
          </a>
          <a href="#contacto" className="hover:text-accent transition">
            Contacto
          </a>
        </nav>

        {/* CTA Desktop */}
        <a
          href="#contacto"
          className="hidden md:inline-flex items-center rounded-md bg-primary px-5 py-2 text-white font-medium hover:bg-primary/90 transition"
        >
          Contáctanos
        </a>

        {/* Hamburger Menu Button - Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-text hover:text-accent transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            // Icono X cuando está abierto
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Icono hamburguesa cuando está cerrado
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-black/10">
          <nav className="flex flex-col py-4">
            <a
              href="#inicio"
              onClick={(e) => handleNavClick(e, 'inicio')}
              className="px-7 py-3 text-text font-medium hover:text-accent hover:bg-black/5 transition"
            >
              Inicio
            </a>
            <a
              href="#nosotros"
              onClick={(e) => handleNavClick(e, 'nosotros')}
              className="px-7 py-3 text-text font-medium hover:text-accent hover:bg-black/5 transition"
            >
              Nosotros
            </a>
            <a
              href="#cultivos"
              onClick={(e) => handleNavClick(e, 'cultivos')}
              className="px-7 py-3 text-text font-medium hover:text-accent hover:bg-black/5 transition"
            >
              Cultivos
            </a>
            <a
              href="#contacto"
              onClick={(e) => handleNavClick(e, 'contacto')}
              className="px-7 py-3 text-text font-medium hover:text-accent hover:bg-black/5 transition"
            >
              Contacto
            </a>
            <a
              href="#contacto"
              onClick={(e) => handleNavClick(e, 'contacto')}
              className="mx-7 mt-2 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-white font-medium hover:bg-primary/90 transition"
            >
              Contáctanos
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
