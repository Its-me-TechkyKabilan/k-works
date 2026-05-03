import { motion } from 'framer-motion'
import { Eye, FolderOpen, LockKeyhole, ShieldCheck, UploadCloud } from 'lucide-react'
import { useState } from 'react'
import { enableCreatorMode, isCreatorMode } from '../utils/creatorMode.js'

const STUDIO_PIN = '805502'

export default function CreatorStudio() {
  const [pin, setPin] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(() => isCreatorMode())
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (pin === STUDIO_PIN) {
      enableCreatorMode()
      setIsUnlocked(true)
      setError('')
      setPin('')
      return
    }

    setError('Wrong access code. Please try again.')
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] px-5 py-24 text-[#f8f1df] sm:px-8 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(212,175,55,0.16),transparent_26%),radial-gradient(circle_at_18%_82%,rgba(248,241,223,0.08),transparent_30%),linear-gradient(135deg,#030303,#101010_48%,#050505)]" />
      <div className="preloader-grain absolute inset-0 opacity-40" />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-12rem)] max-w-6xl items-center justify-center">
        {isUnlocked ? <StudioDashboard /> : <StudioAccess pin={pin} setPin={setPin} error={error} onSubmit={handleSubmit} />}
      </section>
    </main>
  )
}

function StudioAccess({ pin, setPin, error, onSubmit }) {
  return (
    <motion.div
      className="w-full max-w-md rounded-lg border border-[#d4af37]/35 bg-black/35 p-7 text-center shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-9"
      initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      <div className="mx-auto mb-7 flex size-16 items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#d4af37]/10 text-[#d4af37] shadow-[0_0_36px_rgba(212,175,55,0.18)]">
        <LockKeyhole size={28} strokeWidth={1.4} aria-hidden="true" />
      </div>

      <p className="kicker">K-WORKS CREATOR ACCESS</p>
      <h1 className="mt-4 font-serif text-4xl text-[#f8f1df] sm:text-5xl">Owner Access Code</h1>

      <form className="mt-8 grid gap-5" onSubmit={onSubmit}>
        <label className="sr-only" htmlFor="studio-pin">
          Owner Access Code
        </label>
        <input
          id="studio-pin"
          type="password"
          inputMode="numeric"
          value={pin}
          onChange={(event) => setPin(event.target.value)}
          placeholder="Enter PIN"
          className="w-full border-0 border-b border-white/20 bg-transparent px-0 py-4 text-center text-2xl tracking-[0.45em] text-[#f8f1df] outline-none transition placeholder:text-base placeholder:tracking-[0.25em] placeholder:text-[#f8f1df]/35 focus:border-[#d4af37]"
        />

        {error && <p className="text-sm text-[#f5b6a8]">{error}</p>}

        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center gap-3 rounded-full border border-[#d4af37]/60 bg-[#d4af37]/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#d4af37] transition duration-300 hover:bg-[#d4af37] hover:text-black"
        >
          Unlock Creator Studio
        </button>
      </form>
    </motion.div>
  )
}

function StudioDashboard() {
  const cards = [
    { label: 'Archive Status', value: 'Ready', icon: FolderOpen },
    { label: 'Upload Route', value: 'Available', icon: UploadCloud },
    { label: 'Public Preview', value: 'Live', icon: Eye },
  ]

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mb-10 max-w-3xl">
        <p className="kicker">Creator Studio</p>
        <h1 className="mt-4 font-serif text-5xl text-[#f8f1df] sm:text-7xl">K-Works Dashboard</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#f8f1df]/70">
          Owner access unlocked. Use this private space to manage K-Works creative updates while the public portfolio stays separate.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon

          return (
            <div key={card.label} className="rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-xl shadow-black/25 backdrop-blur-xl">
              <div className="mb-8 flex size-12 items-center justify-center rounded-full border border-[#d4af37]/40 text-[#d4af37]">
                <Icon size={22} strokeWidth={1.4} aria-hidden="true" />
              </div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#d4af37]">{card.label}</p>
              <p className="mt-3 font-serif text-3xl text-[#f8f1df]">{card.value}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-6 rounded-lg border border-[#d4af37]/25 bg-black/25 p-5 text-sm leading-7 text-[#f8f1df]/65 backdrop-blur-xl">
        <div className="mb-3 flex items-center gap-3 text-[#d4af37]">
          <ShieldCheck size={18} strokeWidth={1.4} aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-[0.24em]">Private Route</span>
        </div>
        This dashboard is intentionally not listed in the public fullscreen menu.
      </div>
    </motion.div>
  )
}
