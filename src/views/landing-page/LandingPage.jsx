import { useState, useEffect, useRef } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import heroImage from '../../assets/pictures/HERO-fake-image.jpg'
import gallery1 from '../../assets/pictures/fake-photo-gallery/fake-gallery1.webp'
import gallery2 from '../../assets/pictures/fake-photo-gallery/fake-gallery2.webp'
import gallery3 from '../../assets/pictures/fake-photo-gallery/fake-gallery3.jpg'
import gallery4 from '../../assets/pictures/fake-photo-gallery/fake-gallery4.webp'
import gallery5 from '../../assets/pictures/fake-photo-gallery/fake-gallery5.jpg'
import gallery6 from '../../assets/pictures/fake-photo-gallery/fake-gallery6.jpg'
import gallery7 from '../../assets/pictures/fake-photo-gallery/fake-gallery7.jpg'
import gallery8 from '../../assets/pictures/fake-photo-gallery/fake-gallery8.jpg'
import gallery9 from '../../assets/pictures/fake-photo-gallery/fake-gallery9.jpg'
import family1 from '../../assets/pictures/fake-family/fake-family1.avif'
import family2 from '../../assets/pictures/fake-family/fake-family2.avif'
import iconoSuelo from '../../assets/icons/cuidado-del-suelo.png'
import iconoAgua from '../../assets/icons/agua.png'
import iconoCompromiso from '../../assets/icons/compromiso.png'
import { crops } from '../../data/cropsData'
import CropModal from '../../components/crop-modal/CropModal'

function LandingPage() {
  const galleryImages = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const carouselRef = useRef(null)
  const autoScrollIntervalRef = useRef(null)

  // Estados para el carrusel de cultivos
  const [selectedCropIndex, setSelectedCropIndex] = useState(0)
  const [cropIsPaused, setCropIsPaused] = useState(false)
  const cropAutoScrollIntervalRef = useRef(null)
  const cropsContainerRef = useRef(null)
  const cropsScrollContainerRef = useRef(null)

  // Estado para el modal
  const [selectedCrop, setSelectedCrop] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Auto-scroll suave hacia la izquierda
  useEffect(() => {
    if (!isPaused) {
      autoScrollIntervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length)
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
    setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length)
    setTimeout(() => setIsPaused(false), 5000) // Reanuda el auto-scroll después de 5 segundos
  }

  const goToNext = () => {
    setIsPaused(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length)
    setTimeout(() => setIsPaused(false), 5000) // Reanuda el auto-scroll después de 5 segundos
  }

  const goToSlide = (index) => {
    setIsPaused(true)
    setCurrentIndex(index)
    setTimeout(() => setIsPaused(false), 5000) // Reanuda el auto-scroll después de 5 segundos
  }

  // Auto-scroll para el carrusel de cultivos (cambia el seleccionado)
  useEffect(() => {
    if (!cropIsPaused) {
      cropAutoScrollIntervalRef.current = setInterval(() => {
        setSelectedCropIndex((prevIndex) => (prevIndex + 1) % crops.length)
      }, 4000) // Cambia de cultivo seleccionado cada 4 segundos
    }

    return () => {
      if (cropAutoScrollIntervalRef.current) {
        clearInterval(cropAutoScrollIntervalRef.current)
      }
    }
  }, [cropIsPaused, crops.length])

  // Scroll al card seleccionado (solo horizontal)
  useEffect(() => {
    if (cropsContainerRef.current && cropsScrollContainerRef.current) {
      const selectedCard = cropsContainerRef.current.children[selectedCropIndex]
      if (selectedCard) {
        const scrollContainer = cropsScrollContainerRef.current
        const cardLeft = selectedCard.offsetLeft
        const cardWidth = selectedCard.offsetWidth
        const containerWidth = scrollContainer.offsetWidth
        const scrollLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2)
        
        scrollContainer.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        })
      }
    }
  }, [selectedCropIndex])

  const goToCropPrevious = () => {
    setCropIsPaused(true)
    setSelectedCropIndex((prevIndex) => (prevIndex - 1 + crops.length) % crops.length)
    setTimeout(() => setCropIsPaused(false), 5000)
  }

  const goToCropNext = () => {
    setCropIsPaused(true)
    setSelectedCropIndex((prevIndex) => (prevIndex + 1) % crops.length)
    setTimeout(() => setCropIsPaused(false), 5000)
  }

  const selectCrop = (index) => {
    setCropIsPaused(true)
    setSelectedCropIndex(index)
    setTimeout(() => setCropIsPaused(false), 5000)
  }

  // Funciones para el modal
  const openModal = (crop) => {
    setSelectedCrop(crop)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCrop(null)
  }


  return (
    <div className="min-h-screen bg-background text-text font-[var(--font-raleway)]">
      <Header />
      <main>
        {/* Sección Inicio / Hero */}
        <section
          id="inicio"
          className="relative min-h-screen flex items-center justify-start px-4 sm:px-6 lg:px-8"
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
              Somos una empresa agrícola familiar dedicada al cultivo responsable, combinando experiencia, trabajo de campo y visión a futuro.
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
                      index === currentIndex
                        ? 'bg-text w-8'
                        : 'bg-text/30 w-3 hover:bg-text/50'
                    }`}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Nosotros */}
        <section id="nosotros" className="py-16 sm:py-20 bg-white/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-text mb-16 text-center">
              Nosotros
            </h2>

            {/* Contenedor card para todo el contenido */}
            <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 lg:p-12">
              {/* Subsección: Quiénes somos */}
              <div className="mb-20 sm:mb-24">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Texto a la izquierda */}
                <div className="flex-1">
                  <h3 className="text-3xl sm:text-4xl font-bold text-text mb-6">
                    Quiénes somos
                  </h3>
                  <p className="text-lg sm:text-xl text-text/80 leading-relaxed">
                    Somos ALCEMA, una empresa agrícola familiar con décadas de experiencia en el
                    campo. Nos dedicamos a producir alimentos de alta calidad, saludables y
                    responsables, cultivados con buenas prácticas agrícolas que respetan la tierra y
                    el medio ambiente.
                  </p>
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
                    Nuestra historia comenzó en 1920 en Huatabampo, Sonora, cuando Don Eugenio
                    Larrinaga inició el trabajo en el campo. En la década de 1980, Don César
                    Larrinaga fundó ALCEMA, consolidando una empresa familiar construida sobre el
                    trabajo duro y el compromiso con la tierra.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center text-lg font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    Leer historia completa →
                  </a>
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
              <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-12 mb-6 sm:mb-8">
                {/* Texto a la izquierda */}
                <div className="flex-1 lg:flex-[1.2] w-full">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text mb-4 sm:mb-6">
                    Visión y sustentabilidad
                  </h3>
                  <p className="text-base sm:text-lg lg:text-xl text-text/80 leading-relaxed mb-3 sm:mb-4">
                    Nuestra visión es producir alimentos en armonía con la naturaleza. Implementamos
                    sistemas de riego eficientes, rotación de cultivos, producción de compost
                    certificado y prácticas sostenibles que reducen el uso de insumos derivados del
                    petróleo, asegurando un futuro mejor para las próximas generaciones.
                  </p>
                  <p className="text-base sm:text-lg lg:text-xl text-text/80 leading-relaxed">
                    Creemos en un modelo agrícola que cuida el suelo, optimiza el uso del agua y
                    mantiene un compromiso genuino con las personas y las comunidades.
                  </p>
                </div>
                {/* Video a la derecha */}
                <div className="flex-1 lg:flex-[0.8] w-full">
                  <div className="rounded-lg overflow-hidden shadow-lg relative aspect-video">
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
                      <span className="text-xs sm:text-xs md:text-sm lg:text-base font-semibold text-text sm:whitespace-nowrap">Cuidado del suelo</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-1.5 md:gap-2 lg:gap-3">
                      <div className="flex-shrink-0">
                        <img
                          src={iconoAgua}
                          alt="Uso eficiente del agua"
                          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-12 lg:h-12 object-contain"
                        />
                      </div>
                      <span className="text-xs sm:text-xs md:text-sm lg:text-base font-semibold text-text sm:whitespace-nowrap">Uso eficiente del agua</span>
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
        <section id="cultivos" className="py-16 sm:py-20 bg-white/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-text mb-12 text-center">
              Nuestros cultivos
            </h2>

            {/* Carrusel horizontal de cultivos */}
            <div className="relative max-w-7xl mx-auto">
              {/* Contenedor de cards - una sola línea horizontal */}
              <div 
                ref={cropsScrollContainerRef}
                className="overflow-x-auto overflow-y-visible pb-15 -mx-4 px-4" 
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <style>{`
                  .crops-container::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <div ref={cropsContainerRef} className="flex gap-4 sm:gap-6 min-w-max crops-container">
                  {crops.map((crop, index) => {
                    const isSelected = index === selectedCropIndex
                    return (
                      <div
                        key={crop.id}
                        onClick={() => selectCrop(index)}
                        className={`bg-white rounded-lg shadow-lg overflow-hidden flex flex-col cursor-pointer transition-all duration-300 flex-shrink-0 ${
                          isSelected
                            ? 'scale-105 sm:scale-110 z-20 shadow-xl'
                            : 'scale-100 z-10'
                        }`}
                        style={{ width: '250px', minWidth: '250px' }}
                      >
                      {/* Imagen del cultivo */}
                      <div className="w-full h-[220px] sm:h-[250px] overflow-hidden">
                        <img
                          src={crop.image}
                          alt={crop.name}
                          className={`w-full h-full object-cover transition-all duration-300 ${
                            isSelected ? 'brightness-100' : 'brightness-90'
                          }`}
                        />
                      </div>
                      {/* Contenido del card */}
                      <div
                        className={`p-3 sm:p-4 flex flex-col flex-grow transition-all duration-300 ${
                          isSelected
                            ? 'bg-white'
                            : 'bg-gray-50'
                        }`}
                      >
                        <h3
                          className={`text-lg sm:text-xl font-bold mb-2 transition-colors duration-300 ${
                            isSelected ? 'text-text' : 'text-text/60'
                          }`}
                        >
                          {crop.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <svg
                            className={`w-4 h-4 transition-colors duration-300 ${
                              isSelected ? 'text-primary' : 'text-text/40'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                          <span
                            className={`text-xs sm:text-sm transition-colors duration-300 ${
                              isSelected ? 'text-text/50' : 'text-text/30'
                            }`}
                          >
                            Producción sustentable
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openModal(crop)
                          }}
                          className={`mt-auto px-3 py-2 font-semibold rounded-lg transition-all duration-200 text-xs sm:text-sm flex items-center justify-center gap-2 ${
                            isSelected
                              ? 'bg-primary text-white hover:bg-primary/90'
                              : 'bg-gray-200 text-text/50 hover:bg-gray-300'
                          }`}
                        >
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                          Ver más
                        </button>
                      </div>
                    </div>
                    )
                  })}
                </div>
              </div>

              {/* Flecha izquierda */}
              <button
                onClick={goToCropPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-8 bg-white/80 hover:bg-white text-text p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-30"
                aria-label="Cultivo anterior"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
                onClick={goToCropNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-8 bg-white/80 hover:bg-white text-text p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-30"
                aria-label="Siguiente cultivo"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
                {crops.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => selectCrop(index)}
                    className={`h-2 sm:h-3 rounded-full transition-all duration-200 ${
                      index === selectedCropIndex
                        ? 'bg-text w-6 sm:w-8'
                        : 'bg-text/30 w-2 sm:w-3 hover:bg-text/50'
                    }`}
                    aria-label={`Seleccionar cultivo ${index + 1}`}
                  />
                ))}
              </div>
            </div>
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

      {/* Modal/Popup de cultivo */}
      <CropModal
        crop={selectedCrop}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  )
}

export default LandingPage
