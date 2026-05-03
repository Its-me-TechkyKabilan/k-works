import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import { useState } from 'react'
import { AdminSectionAction } from '../components/AdminControls.jsx'
import PageBackgroundOverride from '../components/studio/PageBackgroundOverride.jsx'
import { usePageSettings } from '../hooks/useStudioSettings.js'
import { getTextSettings } from '../utils/pageTextStyles.js'

// Place your personal photo at public/about/kabilan.jpg to replace this placeholder.
const ABOUT_PHOTO_SRC = '/about/kabilan.jpg'

// Edit About text here.
const aboutParagraphs = [
  'K-Works is a personal visual archive by Kabilan, built to collect and present photography, edits, travel frames, event moments, food visuals, street frames, and everyday visual stories.',
  'I have been exploring photography since 2016, starting with simple everyday captures and gradually developing an eye for people, places, emotions, light, timing, and cinematic compositions. What began as casual photography slowly became a way of observing life more deeply.',
  'My visual style is shaped by everyday moments - natural emotions, movement, colors, places, and small details that often pass unnoticed. Through portraits, events, travel frames, food visuals, and creative edits, I try to turn ordinary moments into visual stories.',
  'Beyond photography, I am also an AI/ML student and a technology-driven creator. My interest in artificial intelligence, web development, digital systems, and visual media helps me see creativity from both an artistic and technical perspective.',
  'K-Works brings these sides together - photography, video editing, technology, and storytelling - into one personal creative space. It is not just a gallery, but an evolving archive of visuals, experiments, memories, and ideas.',
]

// Edit info cards here.
const infoCards = [
  { label: 'Since', value: '2016' },
  { label: 'Photography Focus', value: 'Portraits / Events / Travel / Food / Street / Everyday Moments' },
  { label: 'Creative Skills', value: 'Photography / Video Editing / Cinematic Storytelling / Visual Direction' },
  { label: 'Technical Side', value: 'AI/ML / Web Development / Digital Systems / Creative Technology' },
  { label: 'Editing & Tools', value: 'Lightroom / Photoshop / Canva / CapCut / DaVinci Resolve' },
  { label: 'Visual Style', value: 'Natural Emotions / Clean Frames / Warm Tones / Cinematic Mood' },
]

export default function AboutKabilan() {
  const [photoStatus, setPhotoStatus] = useState('loading')
  const showPhoto = photoStatus === 'loaded'
  const pageSettings = usePageSettings('/about')
  const hasTextSettings = Boolean(pageSettings.text)
  const text = getTextSettings(pageSettings.text, 'ABOUT\nKABILAN', aboutParagraphs[0])

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] text-[#f8f1df]">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_78%_18%,rgba(212,175,55,0.12),transparent_28%),linear-gradient(135deg,#030303,#111111_52%,#030303)]" />
      <PageBackgroundOverride route="/about" />

      <section className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl items-center gap-12 px-5 pb-20 pt-28 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <p className="kicker">Creator Profile</p>
          {hasTextSettings ? (
            text.showHeading && (
              <h1 className="mt-5 font-serif text-6xl font-semibold uppercase leading-[0.88] text-[#f8f1df] sm:text-8xl lg:text-[7.5rem]" style={text.headingStyle}>
                {text.headingText}
              </h1>
            )
          ) : (
            <h1 className="mt-5 font-serif text-6xl font-semibold uppercase leading-[0.88] text-[#f8f1df] sm:text-8xl lg:text-[7.5rem]">
              ABOUT
              <span className="block text-[#d4af37]">KABILAN</span>
            </h1>
          )}
          <div className="mt-6">
            <AdminSectionAction>Edit About Page</AdminSectionAction>
          </div>
          {hasTextSettings && text.showSubtitle && (
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f8f1df]/80" style={text.subtitleStyle}>
              {text.subtitleText}
            </p>
          )}

          <div className="mt-9 max-w-3xl space-y-5 text-base leading-8 text-[#f8f1df]/80 sm:text-lg">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        <motion.aside
          className="relative mx-auto w-full max-w-[34rem]"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
        >
          <div className="relative min-h-[34rem] overflow-hidden rounded-2xl border border-[#d4af37]/50 bg-black/40 shadow-2xl shadow-black/50 backdrop-blur-xl sm:min-h-[42rem]">
            <img
              src={ABOUT_PHOTO_SRC}
              alt="Kabilan"
              className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${showPhoto ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setPhotoStatus('loaded')}
              onError={() => setPhotoStatus('error')}
            />

            {!showPhoto && <AboutPlaceholder />}

            {showPhoto && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/78 to-transparent p-7">
                <p className="text-xs uppercase tracking-[0.32em] text-[#d4af37]">K-Works</p>
                <p className="mt-2 font-serif text-3xl text-[#f8f1df]">Visual Creator / AI-ML / Photography</p>
              </div>
            )}
          </div>
        </motion.aside>
      </section>

      <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-4 px-5 pb-24 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-10">
        {infoCards.map((card, index) => (
          <motion.article
            key={card.label}
            className="rounded-xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20 backdrop-blur-lg transition duration-300 hover:border-[#d4af37]/50"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25), ease: 'easeOut' }}
          >
            <p className="text-xs uppercase tracking-[0.26em] text-[#d4af37]">{card.label}</p>
            <p className={`mt-4 text-[#f8f1df] ${card.label === 'Since' ? 'font-serif text-5xl' : 'text-base leading-7'}`}>
              {card.value}
            </p>
          </motion.article>
        ))}
      </section>
    </main>
  )
}

function AboutPlaceholder() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
      <div className="absolute inset-8 rounded-2xl border border-[#d4af37]/20" />
      <div className="absolute h-72 w-72 rounded-full border border-[#d4af37]/25" />
      <div className="absolute h-44 w-44 rounded-full border border-[#f8f1df]/10" />
      <div className="absolute h-28 w-28 rounded-full border border-[#d4af37]/40" />
      <Camera className="absolute top-10 text-[#d4af37]/50" size={42} strokeWidth={1.2} aria-hidden="true" />

      <div className="relative flex size-28 items-center justify-center rounded-full border border-[#d4af37]/60 bg-black/45 shadow-2xl shadow-[#d4af37]/10">
        <span className="font-serif text-7xl text-[#d4af37]">K</span>
      </div>
      <p className="relative mt-8 text-xs uppercase tracking-[0.38em] text-[#d4af37]">K-Works</p>
      <p className="relative mt-4 max-w-xs font-serif text-3xl leading-tight text-[#f8f1df]">
        Visual Creator / AI-ML / Photography
      </p>
    </div>
  )
}
