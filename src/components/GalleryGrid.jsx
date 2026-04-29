import { motion } from 'framer-motion'
import { Camera, ImagePlus } from 'lucide-react'
import { useState } from 'react'

export default function GalleryGrid({ items, onSelect }) {
  if (!items.length) {
    return (
      <div className="py-16">
        <div className="glass-panel px-6 py-12 text-center font-serif text-xl text-[#f8f1df]/80">
          No visuals found for this filter.
        </div>
      </div>
    )
  }

  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
      {items.map((item, index) => (
        <GalleryCard
          type="button"
          key={item.id}
          item={item}
          index={index}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

function GalleryCard({ item, index, onSelect }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = imageLoaded && !imageFailed
  const imageSource = item.image || item.src

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(item)}
      className="group mb-5 block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left shadow-2xl shadow-black/20 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#d4af37]/60 hover:shadow-[#d4af37]/10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: Math.min(index * 0.035, 0.24) }}
    >
      <div className="relative min-h-[18rem] overflow-hidden bg-[#080808]">
        <img
          src={imageSource}
          alt={item.title}
          className={`w-full object-cover transition duration-700 group-hover:scale-105 ${showImage ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
        />
        {!showImage && <GalleryPlaceholder title={item.title} />}
        <div className="absolute inset-x-4 top-4 h-px origin-left scale-x-0 bg-[#d4af37] transition duration-500 group-hover:scale-x-100" />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-serif text-2xl text-[#f8f1df]">{item.title}</h2>
          <span className="text-xs uppercase tracking-[0.18em] text-[#d4af37]">{item.category}</span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#f8f1df]/70">{item.caption}</p>
      </div>
    </motion.button>
  )
}

function GalleryPlaceholder({ title }) {
  return (
    <div className="absolute inset-0 flex min-h-[18rem] items-center justify-center bg-[radial-gradient(circle_at_50%_38%,rgba(212,175,55,0.2),transparent_34%),linear-gradient(135deg,#080808,#171717)]">
      <div className="absolute h-40 w-40 rounded-full border border-[#d4af37]/25" />
      <div className="absolute h-24 w-24 rounded-full border border-[#f8f1df]/10" />
      <Camera className="absolute text-[#d4af37]/30" size={74} strokeWidth={1.1} aria-hidden="true" />
      <div className="relative px-5 text-center">
        <p className="font-serif text-2xl text-[#f8f1df]">{title}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.22em] text-[#d4af37]">Image coming soon</p>
      </div>
      <ImagePlus className="absolute bottom-5 right-5 text-[#f8f1df]/40" size={22} strokeWidth={1.3} aria-hidden="true" />
    </div>
  )
}
