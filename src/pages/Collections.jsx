import { motion } from 'framer-motion'
import { Camera, Images } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { collections } from '../data/collections.js'

export default function Collections() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] text-[#f8f1df]">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_78%_16%,rgba(212,175,55,0.12),transparent_26%),linear-gradient(135deg,#030303,#101010_52%,#030303)]" />

      <section className="page-shell relative z-10 pb-12 pt-28 sm:pt-32">
        <motion.div
          className="max-w-5xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <p className="kicker">Visual Sets</p>
          <h1 className="mt-5 font-serif text-6xl uppercase leading-none text-[#f8f1df] sm:text-8xl lg:text-[8.5rem]">
            COLLECTIONS
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f8f1df]/70">
            Visual sets organized by mood, place, people, and moments.
          </p>
        </motion.div>
      </section>

      <section className="page-shell relative z-10 grid gap-5 pb-16 sm:grid-cols-2 xl:grid-cols-3">
        {collections.map((collection, index) => (
          <CollectionCard key={collection.id} collection={collection} index={index} />
        ))}
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
            Each collection inside K-Works is built to group moments by feeling, subject, place, and visual style.
          </p>
        </motion.div>
      </section>
    </main>
  )
}

function CollectionCard({ collection, index }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = imageLoaded && !imageFailed
  const archiveLink = `/archive?category=${encodeURIComponent(collection.category)}`

  return (
    <motion.article
      className="group relative min-h-[28rem] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/25 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#d4af37]/60 hover:shadow-[#d4af37]/10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.045, 0.28), ease: 'easeOut' }}
    >
      <Link to={archiveLink} className="block h-full min-h-[28rem]" aria-label={`Open ${collection.title} collection`}>
        <img
          src={collection.coverImage}
          alt={collection.title}
          className={`absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 ${showImage ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
        />
        {!showImage && <CollectionPlaceholder title={collection.title} />}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-x-6 top-6 h-px origin-left scale-x-0 bg-[#d4af37] transition duration-500 group-hover:scale-x-100" />

        <div className="relative flex h-full min-h-[28rem] flex-col justify-end p-6">
          <p className="text-xs uppercase tracking-[0.28em] text-[#d4af37]">{collection.countLabel}</p>
          <h2 className="mt-3 font-serif text-5xl leading-tight text-white">{collection.title}</h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-[#f8f1df]/80">{collection.description}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#f8f1df]/70 transition group-hover:text-[#d4af37]">
            View Archive
            <Images size={15} strokeWidth={1.4} aria-hidden="true" />
          </p>
        </div>
      </Link>
    </motion.article>
  )
}

function CollectionPlaceholder({ title }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_38%,rgba(212,175,55,0.2),transparent_34%),linear-gradient(135deg,#080808,#171717)]">
      <div className="absolute h-52 w-52 rounded-full border border-[#d4af37]/25" />
      <div className="absolute h-32 w-32 rounded-full border border-[#f8f1df]/10" />
      <Camera className="absolute text-[#d4af37]/30" size={86} strokeWidth={1.1} aria-hidden="true" />
      <div className="relative px-6 text-center">
        <p className="font-serif text-4xl text-[#f8f1df]">{title}</p>
        <p className="mt-4 text-xs uppercase tracking-[0.24em] text-[#d4af37]">Cover image coming soon</p>
      </div>
    </div>
  )
}
