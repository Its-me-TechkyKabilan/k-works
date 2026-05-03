import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { usePageSettings } from '../hooks/useStudioSettings.js'
import { getTextSettings } from '../utils/pageTextStyles.js'

export default function PageTitle({ eyebrow, title, description }) {
  const location = useLocation()
  const pageSettings = usePageSettings(location.pathname)
  const text = getTextSettings(pageSettings.text, title, description)

  return (
    <section className="page-shell relative z-10 pb-10 pt-28 sm:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-4xl"
      >
        {eyebrow && <p className="kicker">{eyebrow}</p>}
        {text.showHeading && (
          <h1 className="mt-4 font-serif text-5xl leading-none text-[#f8f1df] sm:text-7xl lg:text-8xl" style={text.headingStyle}>
            {text.headingText}
          </h1>
        )}
        {description && text.showSubtitle && (
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#f8f1df]/70" style={text.subtitleStyle}>
            {text.subtitleText}
          </p>
        )}
      </motion.div>
    </section>
  )
}
