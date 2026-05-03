import { motion } from 'framer-motion'
import PageBackgroundOverride from '../components/studio/PageBackgroundOverride.jsx'
import VerticalImageReel from '../components/VerticalImageReel.jsx'
import { galleryItems } from '../data/gallery.js'
import { site } from '../data/site.js'
import { useHomeSettings } from '../hooks/useStudioSettings.js'

const homeDescription =
  'Photographer with a deeply rooted fascination for everyday life, emotions, and fleeting moments, working primarily with portraits, events, travel frames, and cinematic visual storytelling.'

export default function Home() {
  const homeSettings = useHomeSettings()
  // Adjust the image list here if you want a different home background sequence.
  const homeImages = homeSettings.reel.imageUrls?.length
    ? homeSettings.reel.imageUrls.map((src, index) => ({ id: `custom-home-${index}`, src }))
    : galleryItems

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] text-[#f8f1df]">
      <VerticalImageReel
        images={homeImages}
        travelDurationSeconds={homeSettings.reel.travelDuration}
        manualPauseMs={homeSettings.reel.manualPause}
        direction={homeSettings.reel.direction}
      />
      {Number(homeSettings.reel.overlayDarkness) > 0 && (
        <div className="pointer-events-none absolute inset-0 z-[1] bg-black" style={{ opacity: Number(homeSettings.reel.overlayDarkness) / 100 }} />
      )}
      <PageBackgroundOverride route="/" />

      {/* Adjust description position here with top/right/max-width classes. */}
      {homeSettings.paragraph.show && (
        <motion.p
          className="pointer-events-none absolute inset-x-5 top-24 z-10 mx-auto max-w-[24rem] text-justify font-serif text-lg leading-8 text-[#f8f1df] [text-shadow:0_2px_18px_rgba(0,0,0,0.92)] sm:left-auto sm:right-8 sm:top-28 sm:mx-0 sm:max-w-[28rem] sm:text-xl lg:right-10"
          style={{
            transform: `translate(${homeSettings.paragraph.x}px, ${homeSettings.paragraph.y}px)`,
            maxWidth: `${homeSettings.paragraph.width}rem`,
            fontSize: `${homeSettings.paragraph.fontSize}px`,
            textAlign: homeSettings.paragraph.align,
            color: homeSettings.paragraph.textColor,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.22 }}
        >
          {homeSettings.paragraph.text || homeDescription}
        </motion.p>
      )}

      <section className="pointer-events-none relative z-10 flex min-h-screen items-center justify-center px-5 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.965, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="w-full"
        >
          {/* Adjust title size here with the responsive text classes. */}
          {homeSettings.wordmark.show && (
            <h1
              className="home-wordmark mx-auto"
              style={{
                transform: `translate(${homeSettings.wordmark.x}px, ${homeSettings.wordmark.y}px)`,
                width: `${homeSettings.wordmark.width}vw`,
                fontSize: homeSettings.wordmark.fontSize || undefined,
                letterSpacing: homeSettings.wordmark.letterSpacing || undefined,
                color: homeSettings.wordmark.textColor,
              }}
            >
              <span className="block">{homeSettings.wordmark.line1}</span>
              <span
                className="block text-[#d4af37]"
                style={{ transform: `translate(${homeSettings.wordmark.worksX}px, ${homeSettings.wordmark.worksY}px)` }}
              >
                {homeSettings.wordmark.line2}
              </span>
            </h1>
          )}
        </motion.div>
      </section>

      {homeSettings.tagline.show && (
        <motion.p
          className="pointer-events-none absolute inset-x-5 bottom-9 z-10 text-center text-sm font-semibold uppercase tracking-[0.34em] text-[#d4af37] [text-shadow:0_2px_18px_rgba(0,0,0,0.95),0_0_18px_rgba(212,175,55,0.34)] sm:bottom-12 sm:text-base"
          style={{
            transform: `translate(${homeSettings.tagline.x}px, ${homeSettings.tagline.y}px)`,
            fontSize: `${homeSettings.tagline.fontSize}px`,
            color: homeSettings.tagline.color,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut', delay: 0.42 }}
        >
          {homeSettings.tagline.text || site.tagline}
        </motion.p>
      )}
    </main>
  )
}
