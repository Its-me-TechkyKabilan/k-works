import { AnimatePresence, motion } from 'framer-motion'

export function StudioDrawer({ open, title, eyebrow, children, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex justify-end bg-black/55 text-[#f8f1df] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.aside
            className="h-full w-full max-w-2xl overflow-y-auto border-l border-[#d4af37]/35 bg-[#060606]/95 p-5 shadow-2xl shadow-black/50 sm:p-7"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="kicker">{eyebrow}</p>
                <h2 className="mt-3 font-serif text-4xl">{title}</h2>
              </div>
              <button type="button" onClick={onClose} className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#f8f1df]/70 transition hover:border-[#d4af37]/60 hover:text-[#d4af37]">
                Close
              </button>
            </div>
            {children}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Field({ label, children }) {
  return (
    <label className="grid gap-2 text-sm text-[#f8f1df]/76">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37]">{label}</span>
      {children}
    </label>
  )
}

export function TextInput(props) {
  return <input {...props} className="w-full rounded-lg border border-white/10 bg-white/[0.045] px-4 py-3 text-[#f8f1df] outline-none transition placeholder:text-[#f8f1df]/35 focus:border-[#d4af37]/70" />
}

export function TextArea(props) {
  return <textarea {...props} className="min-h-28 w-full resize-y rounded-lg border border-white/10 bg-white/[0.045] px-4 py-3 text-[#f8f1df] outline-none transition placeholder:text-[#f8f1df]/35 focus:border-[#d4af37]/70" />
}

export function SelectInput({ children, ...props }) {
  return (
    <select {...props} className="w-full rounded-lg border border-white/10 bg-white/[0.045] px-4 py-3 text-[#f8f1df] outline-none transition focus:border-[#d4af37]/70">
      {children}
    </select>
  )
}

export function ToggleField({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/[0.045] px-4 py-3">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37]">{label}</span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="size-4 accent-[#d4af37]" />
    </label>
  )
}

export function EditorActions({ onSave, onReset, onCancel }) {
  return (
    <div className="sticky bottom-0 mt-8 flex flex-wrap justify-end gap-3 border-t border-white/10 bg-[#060606]/95 py-5">
      <button type="button" onClick={onCancel} className="rounded-full border border-white/15 px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-[#f8f1df]/70 transition hover:text-[#f8f1df]">
        Cancel
      </button>
      <button type="button" onClick={onReset} className="rounded-full border border-[#f8f1df]/20 px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-[#f8f1df]/80 transition hover:border-[#d4af37]/60 hover:text-[#d4af37]">
        Reset to Default
      </button>
      <button type="button" onClick={onSave} className="rounded-full border border-[#d4af37]/60 bg-[#d4af37]/10 px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black">
        Save
      </button>
    </div>
  )
}
