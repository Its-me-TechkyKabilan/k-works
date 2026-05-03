import useCreatorMode from '../hooks/useCreatorMode.js'

const ADMIN_MESSAGE = 'Admin action coming in next phase.'

export function showAdminPlaceholder() {
  window.alert(ADMIN_MESSAGE)
}

export function AdminSectionAction({ children }) {
  const isCreatorMode = useCreatorMode()
  if (!isCreatorMode) return null

  return (
    <button
      type="button"
      onClick={showAdminPlaceholder}
      className="inline-flex items-center justify-center rounded-full border border-[#d4af37]/50 bg-black/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#d4af37] shadow-lg shadow-black/25 backdrop-blur-xl transition hover:bg-[#d4af37] hover:text-black"
    >
      {children}
    </button>
  )
}

export function AdminCardActions({ className = '' }) {
  const isCreatorMode = useCreatorMode()
  if (!isCreatorMode) return null

  const actions = ['Edit', 'Hide', 'Delete']

  return (
    <div className={`z-20 flex flex-wrap gap-2 ${className}`}>
      {/* Placeholder controls for future backend CRUD integration. */}
      {actions.map((action) => (
        <button
          key={action}
          type="button"
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            showAdminPlaceholder()
          }}
          className="rounded-full border border-[#d4af37]/45 bg-black/55 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-[#d4af37] shadow-lg shadow-black/25 backdrop-blur-xl transition hover:bg-[#d4af37] hover:text-black"
        >
          {action}
        </button>
      ))}
    </div>
  )
}
