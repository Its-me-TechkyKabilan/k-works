import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const OWNER_PIN = '805502'

export default function ConfirmPinModal({ open, title = 'Save these design changes?', onCancel, onConfirm }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  const submitPin = (event) => {
    event.preventDefault()

    if (pin !== OWNER_PIN) {
      setError('Wrong owner PIN.')
      return
    }

    setPin('')
    setError('')
    onConfirm()
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-5 text-[#f8f1df] backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.form
            onSubmit={submitPin}
            className="w-full max-w-sm rounded-2xl border border-[#d4af37]/40 bg-[#070707]/90 p-6 shadow-2xl shadow-black/50"
            initial={{ opacity: 0, y: 22, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <p className="kicker">Owner Confirmation</p>
            <h2 className="mt-3 font-serif text-3xl">{title}</h2>
            <p className="mt-2 text-sm text-[#f8f1df]/60">Enter Owner PIN to continue.</p>
            <input
              type="password"
              inputMode="numeric"
              value={pin}
              onChange={(event) => {
                setPin(event.target.value)
                setError('')
              }}
              className="mt-6 w-full border-0 border-b border-white/20 bg-transparent py-3 text-center text-xl tracking-[0.42em] text-[#f8f1df] outline-none transition placeholder:text-[#f8f1df]/35 focus:border-[#d4af37]"
              placeholder="PIN"
            />
            {error && <p className="mt-3 text-sm text-[#f5b6a8]">{error}</p>}
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={onCancel} className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#f8f1df]/70 transition hover:text-[#f8f1df]">
                Cancel
              </button>
              <button type="submit" className="rounded-full border border-[#d4af37]/60 bg-[#d4af37]/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black">
                Confirm
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
