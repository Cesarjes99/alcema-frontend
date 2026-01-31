import { useState, useEffect, useRef } from 'react'
import { crops } from '../../data/cropsData'
import { useLanguage } from '../../i18n/LanguageContext'

function CropsCarousel({ onOpenModal }) {
  const { t } = useLanguage()
  const [selectedCropIndex, setSelectedCropIndex] = useState(0)
  const [cropIsPaused, setCropIsPaused] = useState(false)
  const cropAutoScrollIntervalRef = useRef(null)
  const cropsContainerRef = useRef(null)
  const cropsScrollContainerRef = useRef(null)

  useEffect(() => {
    if (!cropIsPaused) {
      cropAutoScrollIntervalRef.current = setInterval(() => {
        setSelectedCropIndex(prevIndex => (prevIndex + 1) % crops.length)
      }, 4000)
    }

    return () => {
      if (cropAutoScrollIntervalRef.current) {
        clearInterval(cropAutoScrollIntervalRef.current)
      }
    }
  }, [cropIsPaused, crops.length])

  useEffect(() => {
    if (cropsContainerRef.current && cropsScrollContainerRef.current) {
      const selectedCard = cropsContainerRef.current.children[selectedCropIndex]
      if (selectedCard) {
        const scrollContainer = cropsScrollContainerRef.current
        const cardLeft = selectedCard.offsetLeft
        const cardWidth = selectedCard.offsetWidth
        const containerWidth = scrollContainer.offsetWidth
        const scrollLeft = cardLeft - containerWidth / 2 + cardWidth / 2

        scrollContainer.scrollTo({
          left: scrollLeft,
          behavior: 'smooth',
        })
      }
    }
  }, [selectedCropIndex])

  const goToCropPrevious = () => {
    setCropIsPaused(true)
    setSelectedCropIndex(prevIndex => (prevIndex - 1 + crops.length) % crops.length)
    setTimeout(() => setCropIsPaused(false), 5000)
  }

  const goToCropNext = () => {
    setCropIsPaused(true)
    setSelectedCropIndex(prevIndex => (prevIndex + 1) % crops.length)
    setTimeout(() => setCropIsPaused(false), 5000)
  }

  const selectCrop = index => {
    setCropIsPaused(true)
    setSelectedCropIndex(index)
    setTimeout(() => setCropIsPaused(false), 5000)
  }

  const getCropName = crop => {
    const cropData = t(`cropDetails.${crop.translationKey}`)
    return typeof cropData === 'object' && cropData?.name ? cropData.name : crop.translationKey
  }

  const getCropFirstFeature = crop => {
    const cropData = t(`cropDetails.${crop.translationKey}`)
    const features = Array.isArray(cropData?.features) ? cropData.features : []
    return features[0] || t('crops.sustainableProduction')
  }

  return (
    <div className="relative max-w-7xl mx-auto">
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
            const cropName = getCropName(crop)
            const firstFeature = getCropFirstFeature(crop)

            return (
              <div
                key={crop.id}
                onClick={() => selectCrop(index)}
                className={`bg-white rounded-lg shadow-lg overflow-hidden flex flex-col cursor-pointer transition-all duration-300 flex-shrink-0 ${
                  isSelected ? 'scale-105 sm:scale-110 z-20 shadow-xl' : 'scale-100 z-10'
                }`}
                style={{ width: '250px', minWidth: '250px' }}
              >
                <div className="w-full h-[220px] sm:h-[250px] overflow-hidden">
                  <img
                    src={crop.image}
                    alt={`${t('crops.cropImageAlt')} ${cropName} - ALCEMA`}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      isSelected ? 'brightness-100' : 'brightness-90'
                    }`}
                  />
                </div>
                <div
                  className={`p-3 sm:p-4 flex flex-col flex-grow transition-all duration-300 ${
                    isSelected ? 'bg-white' : 'bg-gray-50'
                  }`}
                >
                  <h3
                    className={`text-lg sm:text-xl font-bold mb-2 transition-colors duration-300 ${
                      isSelected ? 'text-text' : 'text-text/60'
                    }`}
                  >
                    {cropName}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`text-xs sm:text-sm transition-colors duration-300 ${
                        isSelected ? 'text-text/50' : 'text-text/30'
                      }`}
                    >
                      {firstFeature}
                    </span>
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      onOpenModal(crop)
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
                    {t('crops.viewMore')}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <button
        onClick={goToCropPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-8 bg-white/80 hover:bg-white text-text p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-30"
        aria-label={t('crops.previousCrop')}
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToCropNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-8 bg-white/80 hover:bg-white text-text p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-30"
        aria-label={t('crops.nextCrop')}
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

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
            aria-label={`${t('crops.selectCrop')} ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default CropsCarousel
