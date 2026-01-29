import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import heroImage from '../../assets/pictures/landing-page/hero-photo.webp'
import gallery1 from '../../assets/pictures/landing-page/gallery-1.webp'
import gallery2 from '../../assets/pictures/landing-page/gallery-2.webp'
import gallery3 from '../../assets/pictures/landing-page/gallery-3.webp'
import gallery4 from '../../assets/pictures/landing-page/gallery-4.webp'
import gallery5 from '../../assets/pictures/landing-page/gallery-5.webp'
import gallery6 from '../../assets/pictures/landing-page/gallery-6.webp'
import gallery7 from '../../assets/pictures/landing-page/gallery-7.webp'
import gallery8 from '../../assets/pictures/landing-page/gallery-8.webp'
import gallery9 from '../../assets/pictures/landing-page/gallery-9.webp'
import family1 from '../../assets/pictures/landing-page/who-are-we.webp'
import family2 from '../../assets/pictures/landing-page/our-history.avif'
import contactImage from '../../assets/pictures/landing-page/contact.webp'
import iconoSuelo from '../../assets/icons/cuidado-del-suelo.png'
import iconoAgua from '../../assets/icons/agua.png'
import iconoCompromiso from '../../assets/icons/compromiso.png'
import CropModal from '../../components/crop-modal/CropModal'
import CropsCarousel from '../../components/crops-carousel/CropsCarousel'

function LandingPage() {
  const galleryImages = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
    gallery7,
    gallery8,
    gallery9,
  ]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef(null)
  const autoScrollIntervalRef = useRef(null)

  // Estado para el modal
  const [selectedCrop, setSelectedCrop] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Auto-scroll suave hacia la izquierda
  useEffect(() => {
    if (!isPaused) {
      autoScrollIntervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % galleryImages.length)
      }, 3000) // Cambia de imagen cada 3 segundos
    }

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
      }
    }
  }, [isPaused, galleryImages.length])

  // Actualizar posición del carrusel cuando cambia el índice
  useEffect(() => {
    if (carouselRef.current) {
      // Calculamos el porcentaje basado en el ancho de cada slide
      const slideWidth = 100 / galleryImages.length
      const translateX = -(currentIndex * slideWidth)
      carouselRef.current.style.transform = `translateX(${translateX}%)`
    }
  }, [currentIndex, galleryImages.length])

  const goToPrevious = () => {
    setIsPaused(true)
    setCurrentIndex(prevIndex => (prevIndex - 1 + galleryImages.length) % galleryImages.length)
    setTimeout(() => setIsPaused(false), 5000) // Reanuda el auto-scroll después de 5 segundos
  }

  const goToNext = () => {
    setIsPaused(true)
    setCurrentIndex(prevIndex => (prevIndex + 1) % galleryImages.length)
    setTimeout(() => setIsPaused(false), 5000) // Reanuda el auto-scroll después de 5 segundos
  }

  const goToSlide = index => {
    setIsPaused(true)
    setCurrentIndex(index)
    setTimeout(() => setIsPaused(false), 5000) // Reanuda el auto-scroll después de 5 segundos
  }

  // Scroll al inicio después de recargar desde el logo
  useEffect(() => {
    if (sessionStorage.getItem('scrollToTop') === 'true') {
      sessionStorage.removeItem('scrollToTop')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  // Funciones para el modal
  const openModal = crop => {
    setSelectedCrop(crop)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCrop(null)
  }

  // Estados para el formulario de contacto
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    correo: '',
    mensaje: '',
  })
  const [isSending, setIsSending] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    if (submitError) setSubmitError(null)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

    if (!publicKey || !serviceId || !templateId) {
      setSubmitError('Configuración de correo incompleta. Revisa las variables de entorno.')
      return
    }

    setIsSending(true)
    setSubmitError(null)

    try {
      emailjs.init(publicKey)
      await emailjs.send(serviceId, templateId, {
        name: formData.nombre,
        email: formData.correo,
        enterprise: formData.empresa || '(no indicada)',
        message: formData.mensaje,
      })
      setFormData({
        nombre: '',
        empresa: '',
        correo: '',
        mensaje: '',
      })
      alert('¡Mensaje enviado! Nos pondremos en contacto contigo pronto.')
    } catch (err) {
      console.error('Error al enviar el formulario:', err)
      setSubmitError('No se pudo enviar el mensaje. Comprueba tu conexión e inténtalo de nuevo.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-text font-[var(--font-raleway)]">
      <Header />
      <main className="pt-[calc(4.5rem+env(safe-area-inset-top))] sm:pt-[calc(5.5rem+env(safe-area-inset-top))]">
        {/* Sección Inicio / Hero */}
        <section
          id="inicio"
          className="relative min-h-screen flex items-center justify-start px-4 sm:px-6 lg:px-8 scroll-mt-[calc(4.5rem+env(safe-area-inset-top))] sm:scroll-mt-[calc(5.5rem+env(safe-area-inset-top))]"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay oscuro con gradiente */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

          {/* Contenido */}
          <div className="relative z-10 max-w-3xl text-white py-20 mx-20 sm:py-32">
            <h1 className="text-4xl max-w-2xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
              Cultivando calidad desde la tierra
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-white/95 leading-relaxed">
              Somos una empresa agrícola familiar dedicada al cultivo responsable, combinando
              experiencia, trabajo de campo y visión a futuro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-[#5d2fa3] transition-colors duration-200 text-lg"
              >
                Contáctanos
              </button>
              <button
                onClick={() => {
                  document.getElementById('cultivos')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white hover:bg-white/10 transition-colors duration-200 text-lg"
              >
                Ver cultivos
              </button>
            </div>
          </div>
        </section>

        {/* Sección Galería de Fotos */}
        <section className="py-16 sm:py-20 bg-white/50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-text mb-12 text-center">
              Nuestro trabajo en el campo
            </h2>

            {/* Carrusel */}
            <div className="relative max-w-6xl mx-auto">
              {/* Contenedor del carrusel */}
              <div className="overflow-hidden rounded-lg relative">
                <div
                  ref={carouselRef}
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ width: `${galleryImages.length * 100}%` }}
                >
                  {galleryImages.map((image, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 px-2"
                      style={{ width: `${100 / galleryImages.length}%` }}
                    >
                      <div className="rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={image}
                          alt={`Galería ${index + 1}`}
                          className="w-full h-[400px] sm:h-[500px] object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flecha izquierda */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-text p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
                aria-label="Imagen anterior"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Flecha derecha */}
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-text p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
                aria-label="Siguiente imagen"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Indicadores de paginación */}
              <div className="flex justify-center gap-2 mt-6">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-3 rounded-full transition-all duration-200 ${
                      index === currentIndex ? 'bg-text w-8' : 'bg-text/30 w-3 hover:bg-text/50'
                    }`}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Nosotros */}
        <section
          id="nosotros"
          className="py-16 sm:py-20 bg-white/50 scroll-mt-[calc(4.5rem+env(safe-area-inset-top))] sm:scroll-mt-[calc(5.5rem+env(safe-area-inset-top))]"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-text mb-16 text-center">Nosotros</h2>

            {/* Contenedor card para todo el contenido */}
            <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 lg:p-12">
              {/* Subsección: Quiénes somos */}
              <div className="mb-20 sm:mb-24">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                  {/* Texto a la izquierda */}
                  <div className="flex-1">
                    <h3 className="text-3xl sm:text-4xl font-bold text-text mb-6">Quiénes somos</h3>
                    <p className="text-lg sm:text-xl text-text/80 leading-relaxed mb-4">
                      ALCEMA es una agrícola familiar con más de 100 años de historia, dedicada
                      exclusivamente a la producción de hortalizas orgánicas bajo un modelo de
                      agricultura regenerativa y sustentable.
                    </p>
                    <p className="text-lg sm:text-xl text-text/80 leading-relaxed mb-4">
                      Somos una empresa de tercera generación, profundamente arraigada al Valle del
                      Mayo, en Huatabampo, Sonora, donde combinamos tradición, innovación y respeto
                      por la tierra.
                    </p>
                    <p className="text-lg sm:text-xl text-text/80 leading-relaxed mb-4">
                      Nuestro compromiso es producir alimentos de alta calidad mientras cuidamos el
                      suelo, el agua y a las personas que forman parte de nuestra operación.
                    </p>
                    <div className="mt-6">
                      <p className="text-lg sm:text-xl font-semibold text-text mb-3">
                        Trabajamos con:
                      </p>
                      <ul className="space-y-2 text-lg sm:text-xl text-text/80">
                        <li className="flex items-start gap-2">
                          <span className="text-xl">🌱</span>
                          <span>Cultivos 100% orgánicos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-xl">💧</span>
                          <span>Riego por goteo y sistemas presurizados</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-xl">♻️</span>
                          <span>Prácticas agrícolas sustentables y regenerativas</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* Imagen a la derecha */}
                  <div className="flex-1 w-full">
                    <div className="rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={family1}
                        alt="Familia ALCEMA"
                        className="w-full h-[400px] sm:h-[500px] object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Subsección: Nuestra historia */}
              <div className="mb-20 sm:mb-24">
                <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
                  {/* Texto a la derecha */}
                  <div className="flex-1">
                    <h3 className="text-3xl sm:text-4xl font-bold text-text mb-6">
                      Nuestra historia
                    </h3>
                    <p className="text-lg sm:text-xl text-text/80 leading-relaxed mb-4">
                      Nuestra historia comienza en 1920, cuando Don Eugenio Larrínaga, emigrante
                      vasco, descubrió las tierras fértiles del Bajo Río Mayo. Visionario y pionero,
                      logró exportar hortalizas —principalmente tomate— a Estados Unidos durante la
                      Segunda Guerra Mundial, posicionándose como uno de los agricultores más
                      innovadores del valle.
                    </p>
                    <p className="text-lg sm:text-xl text-text/80 leading-relaxed mb-4">
                      A lo largo de los años, la familia enfrentó grandes retos, como las sequías y
                      la falta de infraestructura hídrica, lo que impulsó la exploración de nuevos
                      valles y formas de producción. Con la construcción de la Presa Adolfo Ruiz
                      Cortines en 1959, la región encontró estabilidad y crecimiento agrícola.
                    </p>
                    <p className="text-lg sm:text-xl text-text/80 leading-relaxed">
                      En 1980, tras el reparto agrario de 1976, Don Cesar Larrínaga decidió
                      fraccionar las tierras entre sus hijos, fundando formalmente ALCEMA, nombre
                      que surge de la unión familiar y que permanece hasta hoy como símbolo de
                      resiliencia, trabajo y continuidad generacional.
                    </p>
                  </div>
                  {/* Imagen a la izquierda */}
                  <div className="flex-1 w-full">
                    <div className="rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={family2}
                        alt="Don César Larrinaga"
                        className="w-full h-[400px] sm:h-[500px] object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Subsección: Visión y sustentabilidad */}
              <div>
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 sm:gap-8 lg:gap-12 mb-6 sm:mb-8">
                  {/* Texto a la izquierda */}
                  <div className="flex-1 lg:flex-[1.2] w-full">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text mb-4 sm:mb-6">
                      Visión y sustentabilidad
                    </h3>
                    <p className="text-base sm:text-lg lg:text-xl text-text/80 leading-relaxed mb-3 sm:mb-4">
                      Nuestra visión es clara: producir de manera responsable hoy, para garantizar
                      un mañana fértil.
                    </p>
                    <p className="text-base sm:text-lg lg:text-xl text-text/80 leading-relaxed mb-3 sm:mb-4">
                      Conscientes de que la agricultura tiene límites, transformamos por completo
                      nuestra operación hacia un modelo sustentable y regenerativo, enfocado en:
                    </p>
                    <ul className="text-base sm:text-lg lg:text-xl text-text/80 leading-relaxed mb-3 sm:mb-4 space-y-2 list-disc list-inside">
                      <li>Conservación del suelo</li>
                      <li>Uso eficiente del agua</li>
                      <li>Reducción de insumos externos</li>
                      <li>Equilibrio del ecosistema agrícola</li>
                    </ul>
                    <p className="text-base sm:text-lg lg:text-xl text-text/80 leading-relaxed mb-3 sm:mb-4 font-semibold">
                      Implementamos:
                    </p>
                    <ul className="text-base sm:text-lg lg:text-xl text-text/80 leading-relaxed mb-3 sm:mb-4 space-y-2">
                      <li>• Riego por goteo, aspersión y agricultura de precisión</li>
                      <li>• Laboreo mínimo para proteger la vida del suelo</li>
                      <li>• Composta certificada y minerales naturales</li>
                      <li>• Rotación de cultivos (3 a 5 ciclos) y abonos verdes</li>
                      <li>• Control biológico mediante hábitat y flores benéficas</li>
                    </ul>
                    <p className="text-base sm:text-lg lg:text-xl text-text/80 leading-relaxed mb-3 sm:mb-4">
                      Cuidamos no solo la tierra, sino también a nuestro entorno y colaboradores,
                      promoviendo la seguridad, la capacitación y el reciclaje.
                    </p>
                    <p className="text-base sm:text-lg lg:text-xl text-text/80 leading-relaxed">
                      Hoy, ALCEMA avanza con nuevos proyectos enfocados en reducir el consumo
                      energético y la dependencia del petróleo, honrando el espíritu emprendedor de
                      Don Eugenio y el legado de Don Cesar, mientras sembramos el futuro para las
                      siguientes generaciones.
                    </p>
                  </div>
                  {/* Video a la derecha */}
                  <div className="flex-1 lg:flex-[0.8] w-full flex items-center justify-center">
                    <div className="rounded-lg overflow-hidden shadow-lg w-full">
                      <div className="w-full h-[450px] sm:h-[500px] lg:h-[550px]">
                        <iframe
                          className="w-full h-full"
                          src="https://www.youtube.com/embed/vt1A4nAvqZs"
                          title="Video de ALCEMA"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card con iconos de prácticas sostenibles - Contenedor separado y centrado */}
                <div className="flex justify-center mt-6 sm:mt-8">
                  <div className="bg-white rounded-lg shadow-lg py-3 sm:py-4 md:py-5 lg:py-8 px-3 sm:px-4 md:px-6 lg:px-12 xl:px-16 w-full max-w-4xl overflow-hidden">
                    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between md:justify-around gap-2 sm:gap-2 md:gap-4 lg:gap-20">
                      <div className="flex items-center gap-1.5 sm:gap-1.5 md:gap-2 lg:gap-3">
                        <div className="flex-shrink-0">
                          <img
                            src={iconoSuelo}
                            alt="Cuidado del suelo"
                            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-12 lg:h-12 object-contain"
                          />
                        </div>
                        <span className="text-xs sm:text-xs md:text-sm lg:text-base font-semibold text-text sm:whitespace-nowrap">
                          Cuidado del suelo
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-1.5 md:gap-2 lg:gap-3">
                        <div className="flex-shrink-0">
                          <img
                            src={iconoAgua}
                            alt="Uso eficiente del agua"
                            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-12 lg:h-12 object-contain"
                          />
                        </div>
                        <span className="text-xs sm:text-xs md:text-sm lg:text-base font-semibold text-text sm:whitespace-nowrap">
                          Uso eficiente del agua
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-1.5 md:gap-2 lg:gap-3">
                        <div className="flex-shrink-0">
                          <img
                            src={iconoCompromiso}
                            alt="Compromiso con las personas"
                            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-12 lg:h-12 object-contain"
                          />
                        </div>
                        <span className="text-xs sm:text-xs md:text-sm lg:text-base font-semibold text-text sm:whitespace-nowrap">
                          Compromiso con las personas
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Cultivos */}
        <section
          id="cultivos"
          className="py-16 sm:py-20 bg-white/50 scroll-mt-[calc(4.5rem+env(safe-area-inset-top))] sm:scroll-mt-[calc(5.5rem+env(safe-area-inset-top))]"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-text mb-12 text-center">
              Nuestros cultivos
            </h2>

            {/* Carrusel horizontal de cultivos */}
            <CropsCarousel onOpenModal={openModal} />
          </div>
        </section>

        {/* Sección Contacto */}
        <section
          id="contacto"
          className="relative py-16 sm:py-20 lg:py-24 min-h-screen flex items-center scroll-mt-[calc(4.5rem+env(safe-area-inset-top))] sm:scroll-mt-[calc(5.5rem+env(safe-area-inset-top))]"
          style={{
            backgroundImage: `url(${contactImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay oscuro para mejorar legibilidad */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Contenedor principal */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
              {/* Columna Izquierda - Información de Contacto */}
              <div className="bg-background/95 backdrop-blur-sm rounded-lg p-6 sm:p-8 lg:p-10 shadow-xl">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text mb-4 sm:mb-6">
                  Contacta con nosotros
                </h2>
                <p className="text-base sm:text-lg text-text/70 mb-8 sm:mb-10 leading-relaxed">
                  Si tienes alguna pregunta o necesitas más información sobre nuestros productos o
                  servicios, no dudes en contactarnos.
                </p>

                {/* Detalles de Contacto */}
                <div className="space-y-6">
                  {/* Ubicación */}
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <svg
                        className="w-6 h-6 sm:w-7 sm:h-7 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-base sm:text-lg font-semibold text-primary">
                        Huatabampo, Sonora
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <svg
                        className="w-6 h-6 sm:w-7 sm:h-7 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <a
                        href="mailto:larrinagam@alcema.com"
                        className="text-base sm:text-lg font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
                      >
                        larrinagam@alcema.com
                      </a>
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <svg
                        className="w-6 h-6 sm:w-7 sm:h-7 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <a
                        href="tel:+526474820821"
                        className="text-base sm:text-lg font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
                      >
                        +52 (647) 482 0821
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Columna Derecha - Formulario de Contacto */}
              <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 lg:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Campo Nombre */}
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block text-base sm:text-lg font-semibold text-text mb-2"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-text"
                      placeholder="Tu nombre"
                    />
                  </div>

                  {/* Campo Empresa (opcional) */}
                  <div>
                    <label
                      htmlFor="empresa"
                      className="block text-base sm:text-lg font-semibold text-text mb-2"
                    >
                      Empresa <span className="text-text/50 font-normal">(opcional)</span>
                    </label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-text"
                      placeholder="Empresa (opcional)"
                    />
                  </div>

                  {/* Campo Correo */}
                  <div>
                    <label
                      htmlFor="correo"
                      className="block text-base sm:text-lg font-semibold text-text mb-2"
                    >
                      Correo
                    </label>
                    <input
                      type="email"
                      id="correo"
                      name="correo"
                      value={formData.correo}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-text"
                      placeholder="tu@correo.com"
                    />
                  </div>

                  {/* Campo Mensaje */}
                  <div>
                    <label
                      htmlFor="mensaje"
                      className="block text-base sm:text-lg font-semibold text-text mb-2"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 text-text resize-none"
                      placeholder="Mensaje"
                    />
                  </div>

                  {submitError && (
                    <p className="text-red-600 text-sm" role="alert">
                      {submitError}
                    </p>
                  )}

                  {/* Botón de Envío */}
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors duration-200 text-base sm:text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSending ? 'Enviando...' : 'Enviar mensaje'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Modal/Popup de cultivo */}
      <CropModal crop={selectedCrop} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default LandingPage
