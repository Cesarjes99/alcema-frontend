import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-text font-[var(--font-raleway)]">
      <Header />
      <main className="pt-20">
        {/* Sección Inicio / Hero */}
        <section id="inicio" className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-text mb-4">Inicio</h1>
            <p className="text-lg text-text/70">Sección Hero / Inicio</p>
          </div>
        </section>

        {/* Sección Nosotros */}
        <section
          id="nosotros"
          className="min-h-screen flex items-center justify-center bg-white/50"
        >
          <div className="text-center">
            <h2 className="text-5xl font-bold text-text mb-4">Nosotros</h2>
            <p className="text-lg text-text/70">Sección Nosotros</p>
          </div>
        </section>

        {/* Sección Cultivos */}
        <section id="cultivos" className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-text mb-4">Cultivos</h2>
            <p className="text-lg text-text/70">Sección Cultivos</p>
          </div>
        </section>

        {/* Sección Contacto */}
        <section
          id="contacto"
          className="min-h-screen flex items-center justify-center bg-white/50"
        >
          <div className="text-center">
            <h2 className="text-5xl font-bold text-text mb-4">Contacto</h2>
            <p className="text-lg text-text/70">Sección Contacto</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage
