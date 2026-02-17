function CertificationCard({ logo, title, description }) {
  return (
    <article className="bg-white rounded-xl shadow-lg px-6 py-8 sm:px-8 sm:py-10 flex flex-col items-center text-center h-full border border-black/5 transition-all duration-300 hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 hover:bg-white/95">
      <div className="w-32 h-32 sm:w-40 sm:h-40 mb-6 flex items-center justify-center">
        <img
          src={logo}
          alt={title}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="text-xl sm:text-2xl font-semibold text-text mb-4">{title}</h3>
      {description && (
        <p className="text-sm sm:text-base text-text/80 leading-relaxed">{description}</p>
      )}
    </article>
  )
}

export default CertificationCard

