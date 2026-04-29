import { Aperture, Calendar, ImagePlus } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import PageTitle from '../components/PageTitle.jsx'
import { journalEntries } from '../data/journal.js'

export default function Journal() {
  return (
    <main className="min-h-screen bg-[#030303] text-[#f8f1df]">
      <PageTitle
        eyebrow="Journal"
        title="Stories behind selected frames."
        description="Short notes for food walks, event nights, city corners, and small memories."
      />

      <section className="page-shell grid gap-5 pb-24 lg:grid-cols-2">
        {journalEntries.map((entry, index) => (
          <motion.article
            key={entry.title}
            className="grid overflow-hidden rounded-lg border border-white/10 bg-white/5 sm:grid-cols-[0.85fr_1.15fr]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.25) }}
          >
            <JournalCover entry={entry} />
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-[#d4af37]">{entry.category}</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#f8f1df]">{entry.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[#f8f1df]/70">{entry.story}</p>
              <p className="mt-8 flex items-center gap-2 text-sm text-[#f8f1df]/50">
                <Calendar size={16} className="text-[#d4af37]" aria-hidden="true" />
                {entry.date}
              </p>
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  )
}

function JournalCover({ entry }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = imageLoaded && !imageFailed

  return (
    <div className="relative min-h-72 overflow-hidden border-b border-white/10 bg-[#080808] sm:h-full sm:border-b-0 sm:border-r">
      <img
        src={entry.coverImage}
        alt={entry.title}
        className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${showImage ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageFailed(true)}
      />
      {!showImage && <CoverPlaceholder title={entry.title} />}
    </div>
  )
}

function CoverPlaceholder({ title }) {
  const initials = title
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_38%,rgba(212,175,55,0.2),transparent_34%),linear-gradient(135deg,#080808,#171717)]">
      <div className="absolute h-36 w-36 rounded-full border border-[#d4af37]/25" />
      <div className="absolute h-20 w-20 rounded-full border border-[#f8f1df]/10" />
      <Aperture className="absolute text-[#d4af37]/40" size={64} strokeWidth={1.1} aria-hidden="true" />
      <div className="relative text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full border border-[#d4af37]/50 bg-black/40">
          <span className="font-serif text-3xl text-[#d4af37]">{initials}</span>
        </div>
        <p className="mt-5 text-xs uppercase tracking-[0.24em] text-[#f8f1df]/70">Cover image coming soon</p>
      </div>
      <ImagePlus className="absolute bottom-5 right-5 text-[#f8f1df]/40" size={21} strokeWidth={1.3} aria-hidden="true" />
    </div>
  )
}
