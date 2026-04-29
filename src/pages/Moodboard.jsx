import { motion } from 'framer-motion'
import { Aperture, ImagePlus, Palette } from 'lucide-react'
import { useState } from 'react'
import { colorPalette, editingStyles, visualMoods } from '../data/moodboard.js'

export default function Moodboard() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] text-[#f8f1df]">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_80%_14%,rgba(212,175,55,0.12),transparent_26%),linear-gradient(135deg,#030303,#111111_52%,#030303)]" />

      <section className="page-shell relative z-10 pb-12 pt-28 sm:pt-32">
        <motion.div
          className="max-w-5xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <p className="kicker">Visual Direction</p>
          <h1 className="mt-5 font-serif text-6xl uppercase leading-none text-[#f8f1df] sm:text-8xl lg:text-[8.5rem]">
            MOODBOARD
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f8f1df]/72">
            The visual language of K-Works {'\u2014'} colors, moods, textures, light, and editing styles that shape the
            archive.
          </p>
        </motion.div>
      </section>

      <section className="page-shell relative z-10 pb-16">
        <SectionHeading number="01" title="Color Palette" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {colorPalette.map((item, index) => (
            <motion.article
              key={item.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:border-[#d4af37]/50"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.22), ease: 'easeOut' }}
            >
              <div className="flex items-center gap-4">
                <span className="size-14 rounded-full border border-white/15 shadow-lg shadow-black/30" style={{ backgroundColor: item.color }} />
                <div>
                  <h3 className="font-serif text-2xl text-[#f8f1df]">{item.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#d4af37]">{item.color}</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-6 text-[#f8f1df]/70">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="page-shell relative z-10 pb-16">
        <SectionHeading number="02" title="Visual Moods" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {visualMoods.map((mood, index) => (
            <MoodCard key={mood.title} mood={mood} index={index} />
          ))}
        </div>
      </section>

      <section className="page-shell relative z-10 pb-16">
        <SectionHeading number="03" title="Editing Style" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {editingStyles.map((style, index) => (
            <motion.article
              key={style}
              className="rounded-2xl border border-[#d4af37]/20 bg-[linear-gradient(135deg,rgba(212,175,55,0.08),rgba(255,255,255,0.045),rgba(6,6,6,0.84))] p-5 shadow-xl shadow-black/20 backdrop-blur-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.42, delay: Math.min(index * 0.04, 0.22), ease: 'easeOut' }}
            >
              <Palette className="text-[#d4af37]" size={24} strokeWidth={1.4} aria-hidden="true" />
              <h3 className="mt-5 font-serif text-3xl text-[#f8f1df]">{style}</h3>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="page-shell relative z-10 pb-16">
        <SectionHeading number="04" title="Inspiration Board" />
        <div className="grid auto-rows-[11rem] grid-cols-2 gap-4 md:grid-cols-4">
          {visualMoods.map((mood, index) => (
            <CollageTile key={mood.title} mood={mood} index={index} />
          ))}
        </div>
      </section>

      <section className="page-shell relative z-10 pb-24">
        <motion.div
          className="rounded-2xl border border-[#d4af37]/25 bg-black/30 p-6 text-center shadow-2xl shadow-black/25 backdrop-blur-xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="mx-auto max-w-3xl font-serif text-xl leading-8 text-[#f8f1df]/80">
            K-Works is shaped by everyday visuals, warm light, cinematic tones, and the small details that turn simple
            moments into stories.
          </p>
        </motion.div>
      </section>
    </main>
  )
}

function SectionHeading({ number, title }) {
  return (
    <div className="mb-5 flex items-center gap-4">
      <span className="text-xs uppercase tracking-[0.32em] text-[#d4af37]">{number}</span>
      <h2 className="font-serif text-4xl text-[#f8f1df] sm:text-5xl">{title}</h2>
      <div className="h-px flex-1 bg-gradient-to-r from-[#d4af37]/50 to-transparent" />
    </div>
  )
}

function MoodCard({ mood, index }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = imageLoaded && !imageFailed

  return (
    <motion.article
      className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#d4af37]/50 hover:shadow-[#d4af37]/10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.48, delay: Math.min(index * 0.045, 0.26), ease: 'easeOut' }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#080808]">
        <img
          src={mood.image}
          alt={mood.title}
          className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${showImage ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
        />
        {!showImage && <MoodPlaceholder title={mood.title} />}
      </div>
      <div className="p-5">
        <h3 className="font-serif text-3xl text-[#f8f1df]">{mood.title}</h3>
        <p className="mt-3 text-sm leading-6 text-[#f8f1df]/70">{mood.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {mood.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-[#d4af37]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

function CollageTile({ mood, index }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = imageLoaded && !imageFailed
  const sizeClass = index === 1 || index === 6 ? 'row-span-2' : index === 3 ? 'col-span-2' : ''

  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 ${sizeClass}`}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.42, delay: Math.min(index * 0.035, 0.22), ease: 'easeOut' }}
    >
      <img
        src={mood.image}
        alt={mood.title}
        className={`h-full w-full object-cover transition duration-700 hover:scale-105 ${showImage ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageFailed(true)}
      />
      {!showImage && <MoodPlaceholder title={mood.title} compact />}
    </motion.div>
  )
}

function MoodPlaceholder({ title, compact = false }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_38%,rgba(212,175,55,0.2),transparent_34%),linear-gradient(135deg,#080808,#171717)]">
      <div className="absolute h-32 w-32 rounded-full border border-[#d4af37]/25" />
      <div className="absolute h-20 w-20 rounded-full border border-[#f8f1df]/10" />
      <Aperture className="absolute text-[#d4af37]/40" size={compact ? 42 : 62} strokeWidth={1.1} aria-hidden="true" />
      <div className="relative px-5 text-center">
        <p className="font-serif text-xl text-[#f8f1df]">{title}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.22em] text-[#d4af37]">Mood image coming soon</p>
      </div>
      <ImagePlus className="absolute bottom-4 right-4 text-[#f8f1df]/40" size={20} strokeWidth={1.3} aria-hidden="true" />
    </div>
  )
}
