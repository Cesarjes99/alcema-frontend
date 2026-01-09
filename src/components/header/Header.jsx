import logoGreen from "../../assets/logos/logo-green.png";

function Header () {
  return (
    <header className="w-full bg-background border-b border-black/10">
      <div className="max-w-7xl mx-auto px-7 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src={logoGreen}
            alt="ALCEMA logo"
            className="h-18"
          />
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-15 font-medium">
          <a href="#" className="hover:text-accent transition">Inicio</a>
          <a href="#" className="hover:text-accent transition">Nosotros</a>
          <a href="#" className="hover:text-accent transition">Cultivos</a>
          <a href="#" className="hover:text-accent transition">Contacto</a>
        </nav>

        {/* CTA */}
        <a
          href="#"
          className="hidden md:inline-flex items-center rounded-md bg-primary px-5 py-2 text-white font-medium hover:bg-accent transition"
        >
          Contáctanos
        </a>

      </div>
    </header>
  )
}

export default Header