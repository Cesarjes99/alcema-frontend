import logoSVG from '../../assets/logos/logo-svg.svg'
import { useLanguage } from '../../i18n/LanguageContext'

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto px-6 pt-15 pb-6">
        {/* Top */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-6 lg:gap-8">
          {/* Brand */}
          <div className="flex-1 md:flex-[2] min-w-0 md:pr-8">
            <img
              src={logoSVG}
              alt="ALCEMA logo"
              className="h-14 mb-6"
              style={{
                filter:
                  'brightness(0) invert(97%) sepia(3%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(97%)',
              }}
            />
            <p className="text-white/70 max-w-md">{t('footer.tagline')}</p>
          </div>

          {/* Links */}
          <div className="flex-1 md:flex-shrink-0 md:min-w-[140px]">
            <h3 className="text-lg font-semibold mb-4">{t('footer.navigation')}</h3>
            <ul className="space-y-3 text-white/70">
              <li>
                <a href="#inicio" className="hover:text-accent transition">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-accent transition">
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#certificaciones" className="hover:text-accent transition">
                  {t('nav.certifications')}
                </a>
              </li>
              <li>
                <a href="#cultivos" className="hover:text-accent transition">
                  {t('nav.crops')}
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-accent transition">
                  {t('nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex-1 md:flex-shrink-0 md:min-w-[200px] mr-8">
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-white/70">
              <li className="whitespace-nowrap">📍 {t('footer.location')}</li>
              <li className="whitespace-nowrap">📧 info@alcema.com</li>
              <li className="whitespace-nowrap">📞 +52 (647) 4263388</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-white/50">
          <p>
            © {new Date().getFullYear()} ALCEMA. {t('footer.rights')}
          </p>
          <p className="mt-4 md:mt-0">{t('footer.sustainable')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
