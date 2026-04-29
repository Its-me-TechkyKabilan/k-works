import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, Camera, ChevronLeft, ChevronRight, ImagePlus, MapPin, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ImageModal({ image, onClose, onPrevious, onNext, hasNavigation = false }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = imageLoaded && !imageFailed
  const imageSource = image?.image || image?.src

  useEffect(() => {
    setImageLoaded(false)
    setImageFailed(false)
  }, [image?.id])

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            className="grid max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-lg border border-white/20 bg-[#080808] shadow-2xl shadow-black/50 lg:grid-cols-[1.25fr_0.75fr]"
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative min-h-[52vh] bg-black lg:min-h-[80vh]">
              <img
                key={image.id}
                src={imageSource}
                alt={image.title}
                className={`h-full w-full object-contain transition duration-500 ${showImage ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => {
                  setImageLoaded(true)
                  setImageFailed(false)
                }}
                onError={() => setImageFailed(true)}
              />
              {!showImage && <ModalPlaceholder title={image.title} />}
              {hasNavigation && (
                <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 justify-between">
                  <button type="button" aria-label="Previous image" onClick={onPrevious} className="glass-icon">
                    <ChevronLeft size={22} aria-hidden="true" />
                  </button>
                  <button type="button" aria-label="Next image" onClick={onNext} className="glass-icon">
                    <ChevronRight size={22} aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>

            <div className="overflow-y-auto p-6 sm:p-8">
              <button type="button" aria-label="Close image" onClick={onClose} className="glass-icon ml-auto">
                <X size={20} aria-hidden="true" />
              </button>
              <p className="kicker mt-8">{image.category}</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#f8f1df]">{image.title}</h2>
              <p className="mt-5 text-base leading-7 text-[#f8f1df]/70">{image.caption}</p>

              <dl className="mt-8 grid gap-4 text-sm text-[#f8f1df]/70">
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <MapPin size={17} className="text-[#d4af37]" aria-hidden="true" />
                  <div>
                    <dt className="text-[#f8f1df]/40">Location</dt>
                    <dd>{image.location}</dd>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <Camera size={17} className="text-[#d4af37]" aria-hidden="true" />
                  <div>
                    <dt className="text-[#f8f1df]/40">Device</dt>
                    <dd>{image.device}</dd>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <Calendar size={17} className="text-[#d4af37]" aria-hidden="true" />
                  <div>
                    <dt className="text-[#f8f1df]/40">Date</dt>
                    <dd>{image.date}</dd>
                  </div>
                </div>
              </dl>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function ModalPlaceholder({ title }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_38%,rgba(212,175,55,0.2),transparent_34%),linear-gradient(135deg,#080808,#171717)]">
      <div className="absolute h-56 w-56 rounded-full border border-[#d4af37]/25" />
      <div className="absolute h-36 w-36 rounded-full border border-[#f8f1df]/10" />
      <Camera className="absolute text-[#d4af37]/30" size={92} strokeWidth={1.1} aria-hidden="true" />
      <div className="relative px-6 text-center">
        <p className="font-serif text-4xl text-[#f8f1df]">{title}</p>
        <p className="mt-4 text-xs uppercase tracking-[0.24em] text-[#d4af37]">Image coming soon</p>
      </div>
      <ImagePlus className="absolute bottom-6 right-6 text-[#f8f1df]/40" size={24} strokeWidth={1.3} aria-hidden="true" />
    </div>
  )
}
