import { useEffect } from 'react'

function CropModal({ crop, isOpen, onClose }) {
  // Cerrar modal con ESC
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen || !crop) return null

  const handleContactClick = () => {
    onClose()
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full relative flex flex-col"
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '90vh' }}
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white/80 hover:bg-white text-text p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10"
          aria-label="Cerrar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Imagen del cultivo */}
        <div className="w-full h-[250px] sm:h-[300px] overflow-hidden flex-shrink-0">
          <img src={crop.image} alt={crop.name} className="w-full h-full object-cover" />
        </div>

        {/* Contenido del modal */}
        <div className="p-4 sm:p-6 flex flex-col flex-grow overflow-hidden">
          <h3 className="text-2xl sm:text-3xl font-bold text-text mb-2 sm:mb-3">{crop.name}</h3>
          <p className="text-sm sm:text-base text-text/80 leading-relaxed mb-3 sm:mb-4">
            {crop.description}
          </p>

          {/* Lista de características */}
          <div className="space-y-2 mb-4 sm:mb-6">
            {crop.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-sm sm:text-base text-text">{feature}</span>
              </div>
            ))}
          </div>

          {/* Botón Contáctanos */}
          <button
            onClick={handleContactClick}
            className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-200 text-base sm:text-lg mt-auto"
          >
            Contáctanos
          </button>
        </div>
      </div>
    </div>
  )
}

export default CropModal
