import { motion } from 'framer-motion'
import { Aperture, ImagePlus, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { AdminCardActions, AdminSectionAction } from '../components/AdminControls.jsx'
import PageBackgroundOverride from '../components/studio/PageBackgroundOverride.jsx'
import { experiments } from '../data/experiments.js'
import { usePageSettings } from '../hooks/useStudioSettings.js'
import { getTextSettings } from '../utils/pageTextStyles.js'

const route = '/experiments'
const defaultHeading = 'EXPERIMENTS'
const defaultSubtitle = 'A creative lab for edits, visual trials, AI ideas, color grading, and cinematic concepts.'

export default function Experiments() {
  const pageSettings = usePageSettings(route)
  const text = getTextSettings(pageSettings.text, defaultHeading, defaultSubtitle)

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] text-[#f8f1df]">
      <PageBackgroundOverride route={route} />
      <section className="page-shell relative z-10 pb-10 pt-28 sm:pt-32">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <p className="kicker">Creative Lab</p>
          {text.showHeading && (
            <h1 className="mt-5 font-serif text-6xl uppercase leading-none text-[#f8f1df] sm:text-8xl lg:text-[8.5rem]" style={text.headingStyle}>
              {text.headingText}
            </h1>
          )}
          {text.showSubtitle && (
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#f8f1df]/70" style={text.subtitleStyle}>
              {text.subtitleText}
            </p>
          )}
          <div className="mt-6">
            <AdminSectionAction>Add Experiment</AdminSectionAction>
          </div>
        </motion.div>
      </section>

      {/* Add new experiment cards later by editing src/data/experiments.js. */}
      <section className="page-shell relative z-10 grid gap-5 pb-14 md:grid-cols-2 xl:grid-cols-4">
        {experiments.map((experiment, index) => (
          <ExperimentCard key={experiment.id} experiment={experiment} index={index} />
        ))}
      </section>

      <section className="page-shell relative z-10 pb-24">
        <motion.div
          className="rounded-2xl border border-[#d4af37]/25 bg-[linear-gradient(135deg,rgba(212,175,55,0.09),rgba(255,255,255,0.045),rgba(8,8,8,0.78))] p-6 text-center shadow-2xl shadow-black/25 backdrop-blur-xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Sparkles className="mx-auto text-[#d4af37]" size={26} strokeWidth={1.5} aria-hidden="true" />
          <p className="mx-auto mt-4 max-w-3xl font-serif text-xl leading-8 text-[#f8f1df]/80">
            Experiments will continue to grow as K-Works evolves with new edits, AI ideas, video trials, and visual
            concepts.
          </p>
        </motion.div>
      </section>
    </main>
  )
}

function ExperimentCard({ experiment, index }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = imageLoaded && !imageFailed

  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#d4af37]/50 hover:shadow-[#d4af37]/10"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.48, delay: Math.min(index * 0.045, 0.28), ease: 'easeOut' }}
    >
      <div className="absolute right-3 top-3 z-20">
        <AdminCardActions />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-[#080808]">
        <img
          src={experiment.coverImage}
          alt={experiment.title}
          className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${showImage ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
        />
        {!showImage && <ExperimentPlaceholder title={experiment.title} />}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.5))]" />
        <p className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.22em] text-[#d4af37]">
          {String(index + 1).padStart(2, '0')}
        </p>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-serif text-3xl leading-tight text-[#f8f1df]">{experiment.title}</h2>
          <span className="rounded-full border border-[#d4af37]/30 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-[#d4af37]">
            {experiment.status}
          </span>
        </div>
        <p className="mt-4 text-sm leading-6 text-[#f8f1df]/70">{experiment.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {experiment.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#f8f1df]/70">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

function ExperimentPlaceholder({ title }) {
  const initials = title
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.2),transparent_34%),linear-gradient(135deg,#080808,#171717)]">
      <div className="absolute h-40 w-40 rounded-full border border-[#d4af37]/25" />
      <div className="absolute h-24 w-24 rounded-full border border-[#f8f1df]/10" />
      <Aperture className="absolute text-[#d4af37]/40" size={74} strokeWidth={1.1} aria-hidden="true" />
      <div className="relative flex size-20 items-center justify-center rounded-full border border-[#d4af37]/50 bg-black/40 shadow-xl shadow-black/30">
        <span className="font-serif text-3xl text-[#d4af37]">{initials}</span>
      </div>
      <p className="absolute bottom-5 left-5 max-w-36 text-xs uppercase leading-5 tracking-[0.2em] text-[#f8f1df]/70">
        Cover image coming soon
      </p>
      <ImagePlus className="absolute bottom-5 right-5 text-[#f8f1df]/35" size={22} strokeWidth={1.3} aria-hidden="true" />
    </div>
  )
}
