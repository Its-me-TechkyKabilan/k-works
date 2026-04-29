import { Menu, X } from 'lucide-react'

export default function Navbar({ menuOpen, onToggleMenu }) {
  const Icon = menuOpen ? X : Menu

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-5 py-5 sm:px-8">
      <nav className="flex items-center justify-start">
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => onToggleMenu(!menuOpen)}
          className="menu-button"
        >
          <Icon size={32} strokeWidth={1.35} aria-hidden="true" />
        </button>
      </nav>
    </header>
  )
}
