import logoSVG from "../../assets/logos/logo-svg.svg";

function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-15 pb-6">

        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <img
              src={logoSVG}
              alt="ALCEMA logo"
              className="h-14 mb-6"
              style={{ 
                filter: 'brightness(0) invert(97%) sepia(3%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(97%)',
              }}
            />
            <p className="text-white/70 max-w-md">
              Agricultura orgánica responsable, comprometida con la calidad,
              la sustentabilidad y el cuidado de la tierra.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navegación</h3>
            <ul className="space-y-3 text-white/70">
              <li><a href="#" className="hover:text-accent transition">Inicio</a></li>
              <li><a href="#" className="hover:text-accent transition">Nosotros</a></li>
              <li><a href="#" className="hover:text-accent transition">Cultivos</a></li>
              <li><a href="#" className="hover:text-accent transition">Contacto</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3 text-white/70">
              <li>📍 Sur de Sonora, México</li>
              <li>📧 contacto@alcema.com</li>
              <li>📞 +52 000 000 0000</li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-white/50">
          <p>© {new Date().getFullYear()} ALCEMA. Todos los derechos reservados.</p>
          <p className="mt-4 md:mt-0">
            Agricultura orgánica sostenible
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer