import { useLanguage } from '../../i18n/LanguageContext'
import mexicoIcon from '../../assets/icons/mexico.png'
import usaIcon from '../../assets/icons/estados-unidos.png'

function LanguageSlider() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="group relative flex items-center rounded-full overflow-hidden"
      aria-label={language === 'es' ? 'Switch to English' : 'Cambiar a español'}
    >
      {/* Liquid glass container - frosted effect on light background */}
      <div className="relative flex items-center rounded-full bg-black/[0.04] backdrop-blur-xl border border-black/[0.08] shadow-sm p-1 min-w-[100px] hover:bg-black/[0.06] transition-colors duration-200">
        {/* Sliding glass pill - liquid highlight */}
        <div
          className={`absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-white/80 backdrop-blur-md border border-black/[0.06] shadow-md transition-all duration-300 ease-out ${
            language === 'es' ? 'left-1' : 'left-[calc(50%+2px)]'
          }`}
          aria-hidden
        />

        {/* ES option */}
        <span
          className={`relative z-10 flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm font-semibold transition-colors duration-200 w-1/2 ${
            language === 'es' ? 'text-primary' : 'text-text/50 group-hover:text-text/70'
          }`}
        >
          <img
            src={mexicoIcon}
            alt=""
            className="w-5 h-5 object-contain flex-shrink-0"
            aria-hidden
          />
          <span>ES</span>
        </span>

        {/* EN option */}
        <span
          className={`relative z-10 flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm font-semibold transition-colors duration-200 w-1/2 ${
            language === 'en' ? 'text-primary' : 'text-text/50 group-hover:text-text/70'
          }`}
        >
          <img
            src={usaIcon}
            alt=""
            className="w-5 h-5 object-contain flex-shrink-0"
            aria-hidden
          />
          <span>EN</span>
        </span>
      </div>
    </button>
  )
}

export default LanguageSlider
