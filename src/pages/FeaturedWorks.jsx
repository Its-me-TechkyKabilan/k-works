import { motion } from 'framer-motion'
import { Aperture, Images } from 'lucide-react'
import { useState } from 'react'
import { featuredWorks } from '../data/featured.js'

export default function FeaturedWorks() {
  const [hero, ...rest] = featuredWorks

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] text-[#f8f1df]">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_78%_14%,rgba(212,175,55,0.12),transparent_26%),linear-gradient(135deg,#030303,#111111_52%,#030303)]" />

      <section className="page-shell relative z-10 pb-10 pt-28 sm:pt-32">
        <motion.div
          className="max-w-5xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <p className="kicker">Premium Showcase</p>
          <h1 className="mt-5 font-serif text-6xl uppercase leading-none text-[#f8f1df] sm:text-8xl lg:text-[8.5rem]">
            FEATURED WORKS
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f8f1df]/72">
            A curated selection of signature frames, visual stories, edits, and moments from K-Works.
          </p>
        </motion.div>
      </section>

      {hero && (
        <section className="page-shell relative z-10 pb-24">
          <motion.article
            className="overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut', delay: 0.08 }}
          >
            <div className="grid lg:grid-cols-[1.3fr_0.7fr]">
              <FeaturedImage item={hero} large />
              <FeaturedText item={hero} index={0} hero />
            </div>
          </motion.article>
        </section>
      )}

      <section className="page-shell relative z-10 space-y-24 pb-24">
        {rest.map((item, index) => (
          <motion.article
            key={item.id}
            className={`grid items-center gap-8 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''}`}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.68, ease: 'easeOut' }}
          >
            <FeaturedImage item={item} />
            <FeaturedText item={item} index={index + 1} />
          </motion.article>
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
            Featured Works will continue to evolve as K-Works grows with new frames, stories, edits, and visual
            experiments.
          </p>
        </motion.div>
      </section>
    </main>
  )
}

function FeaturedImage({ item, large = false }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = imageLoaded && !imageFailed

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-[#080808] shadow-2xl shadow-black/30 ${
        large ? 'min-h-[38rem]' : 'min-h-[30rem]'
      }`}
    >
      <img
        src={item.image}
        alt={item.title}
        className={`absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 ${showImage ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageFailed(true)}
      />
      {!showImage && <FeaturedPlaceholder title={item.title} />}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.38))]" />
    </div>
  )
}

function FeaturedText({ item, index, hero = false }) {
  return (
    <div className={`${hero ? 'p-7 sm:p-10 lg:p-12' : 'max-w-xl'}`}>
      <p className="text-sm uppercase tracking-[0.34em] text-[#d4af37]">{String(index + 1).padStart(2, '0')}</p>
      <h2 className={`${hero ? 'text-5xl sm:text-6xl' : 'text-5xl'} mt-5 font-serif leading-tight text-[#f8f1df]`}>
        {item.title}
      </h2>
      <p className="mt-5 text-lg leading-8 text-[#f8f1df]/72">{item.description}</p>
      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-sm text-[#f8f1df]/65">
        <span>
          <b className="block text-[#d4af37]">Category</b>
          {item.category}
        </span>
        <span>
          <b className="block text-[#d4af37]">Year</b>
          {item.year}
        </span>
        <span className="col-span-2">
          <b className="block text-[#d4af37]">Location</b>
          {item.location}
        </span>
      </div>
    </div>
  )
}

function FeaturedPlaceholder({ title }) {
  const initials = title
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_38%,rgba(212,175,55,0.2),transparent_34%),linear-gradient(135deg,#080808,#171717)]">
      <div className="absolute h-52 w-52 rounded-full border border-[#d4af37]/25" />
      <div className="absolute h-32 w-32 rounded-full border border-[#f8f1df]/10" />
      <Aperture className="absolute text-[#d4af37]/35" size={88} strokeWidth={1.1} aria-hidden="true" />
      <div className="relative flex size-24 items-center justify-center rounded-full border border-[#d4af37]/50 bg-black/40 shadow-xl shadow-black/30">
        <span className="font-serif text-4xl text-[#d4af37]">{initials}</span>
      </div>
      <p className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.22em] text-[#f8f1df]/70">
        Featured image coming soon
      </p>
      <Images className="absolute bottom-6 right-6 text-[#f8f1df]/40" size={24} strokeWidth={1.3} aria-hidden="true" />
    </div>
  )
}
