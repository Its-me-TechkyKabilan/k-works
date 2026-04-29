import {
  BrainCircuit,
  Camera,
  Code,
  Database,
  Film,
  LayoutTemplate,
  Plane,
  Scissors,
  Sliders,
  Smartphone,
  Video,
  Workflow,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { tools } from '../data/tools.js'

const categoryOrder = ['Capture', 'Edit', 'Technical']

const iconMap = {
  BrainCircuit,
  Camera,
  Code,
  Database,
  Film,
  LayoutTemplate,
  Plane,
  Scissors,
  Sliders,
  Smartphone,
  Video,
  Workflow,
}

export default function GearTools() {
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
          <p className="kicker">Creative Setup</p>
          <h1 className="mt-5 font-serif text-6xl uppercase leading-none text-[#f8f1df] sm:text-8xl lg:text-[8.5rem]">
            GEAR &amp; TOOLS
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f8f1df]/72">
            The creative and technical setup behind K-Works {'\u2014'} from cameras and mobile photography to editing, AI,
            and web-based visual systems.
          </p>
        </motion.div>
      </section>

      <section className="page-shell relative z-10 space-y-14 pb-16">
        {categoryOrder.map((category, categoryIndex) => {
          const categoryTools = tools.filter((tool) => tool.category === category)

          return (
            <motion.section
              key={category}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-90px' }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: categoryIndex * 0.05 }}
            >
              <div className="mb-5 flex items-center gap-4">
                <span className="text-xs uppercase tracking-[0.32em] text-[#d4af37]">
                  {String(categoryIndex + 1).padStart(2, '0')}
                </span>
                <h2 className="font-serif text-4xl text-[#f8f1df] sm:text-5xl">{category}</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-[#d4af37]/50 to-transparent" />
              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {categoryTools.map((tool, index) => (
                  <ToolCard key={tool.id} tool={tool} index={index} />
                ))}
              </div>
            </motion.section>
          )
        })}
      </section>

      <section className="page-shell relative z-10 pb-24">
        <motion.div
          className="overflow-hidden rounded-2xl border border-[#d4af37]/25 bg-[linear-gradient(135deg,rgba(212,175,55,0.1),rgba(255,255,255,0.045),rgba(5,5,5,0.82))] p-6 text-center shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <p className="font-serif text-2xl uppercase tracking-[0.18em] text-[#d4af37] sm:text-4xl">
            CAPTURE &rarr; SELECT &rarr; EDIT &rarr; CURATE &rarr; ARCHIVE
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[#f8f1df]/75">
            Every visual inside K-Works moves through a simple creative flow {'\u2014'} from capturing the moment to refining,
            organizing, and preserving it.
          </p>
        </motion.div>
      </section>
    </main>
  )
}

function ToolCard({ tool, index }) {
  const Icon = iconMap[tool.iconName] || Camera
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = imageLoaded && !imageFailed

  return (
    <motion.article
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:border-[#d4af37]/60 hover:shadow-[#d4af37]/10"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.48, delay: Math.min(index * 0.045, 0.22), ease: 'easeOut' }}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-[#080808]">
        <img
          src={tool.image}
          alt={tool.name}
          className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${showImage ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
        />
        {!showImage && <ToolImageFallback Icon={Icon} name={tool.name} />}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.45))]" />
      </div>

      <div className="relative p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <span className="rounded-full border border-[#d4af37]/35 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-[#d4af37]">
            {tool.category}
          </span>
          <div className="flex size-10 items-center justify-center rounded-full border border-[#d4af37]/25 text-[#d4af37]">
            <Icon size={19} strokeWidth={1.45} aria-hidden="true" />
          </div>
        </div>
        <h3 className="font-serif text-3xl leading-tight text-[#f8f1df]">{tool.name}</h3>
        <p className="mt-4 text-sm leading-6 text-[#f8f1df]/68">{tool.description}</p>
      </div>
    </motion.article>
  )
}

function ToolImageFallback({ Icon, name }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_38%,rgba(212,175,55,0.2),transparent_34%),linear-gradient(135deg,#080808,#171717)]">
      <div className="absolute h-36 w-36 rounded-full border border-[#d4af37]/25" />
      <div className="absolute h-20 w-20 rounded-full border border-[#f8f1df]/10" />
      <div className="relative flex size-20 items-center justify-center rounded-full border border-[#d4af37]/45 bg-black/40 text-[#d4af37] shadow-xl shadow-black/30">
        <Icon size={34} strokeWidth={1.35} aria-hidden="true" />
      </div>
      <p className="absolute bottom-4 left-4 max-w-40 text-xs uppercase leading-5 tracking-[0.2em] text-[#f8f1df]/70">
        {name} image coming soon
      </p>
    </div>
  )
}
