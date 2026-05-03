import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { menuItems } from '../../data/menu.js'
import { disableCreatorMode } from '../../utils/creatorMode.js'
import HomePageEditor from './HomePageEditor.jsx'
import MenuPreviewEditor from './MenuPreviewEditor.jsx'
import PageBackgroundEditor from './PageBackgroundEditor.jsx'
import PageTextEditor from './PageTextEditor.jsx'

export default function CreatorModeBar({ active }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [openEditor, setOpenEditor] = useState(null)
  const currentMenuItem = useMemo(() => menuItems.find((item) => item.route === location.pathname) || menuItems[0], [location.pathname])

  if (!active) return null

  const lockStudio = () => {
    disableCreatorMode()
    navigate('/', { replace: true })
  }

  return (
    <>
      <div className="fixed bottom-4 left-1/2 z-[80] w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 rounded-2xl border border-[#d4af37]/45 bg-black/65 px-4 py-3 text-[#f8f1df] shadow-2xl shadow-black/40 backdrop-blur-2xl sm:w-auto sm:rounded-full">
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="px-2 font-semibold uppercase tracking-[0.2em] text-[#d4af37]">K-Works Creator Mode</span>
          <BarButton onClick={() => setOpenEditor(location.pathname === '/' ? 'home' : 'text')}>Edit Page Text</BarButton>
          <BarButton onClick={() => setOpenEditor('background')}>Edit Page Background</BarButton>
          <BarButton onClick={() => setOpenEditor('menu')}>Edit Menu Preview</BarButton>
          {location.pathname === '/' && <BarButton onClick={() => setOpenEditor('homeReel')}>Edit Home Background Reel</BarButton>}
          <Link className="rounded-full border border-white/15 px-3 py-1.5 transition hover:border-[#d4af37]/60 hover:text-[#d4af37]" to="/studio">
            Back to Studio
          </Link>
          <button
            type="button"
            onClick={lockStudio}
            className="rounded-full border border-[#d4af37]/45 px-3 py-1.5 text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black"
          >
            Lock Studio
          </button>
        </div>
      </div>

      <PageTextEditor key={`text-${location.pathname}-${openEditor}`} open={openEditor === 'text'} route={location.pathname} onClose={() => setOpenEditor(null)} />
      <PageBackgroundEditor key={`background-${location.pathname}-${openEditor}`} open={openEditor === 'background'} route={location.pathname} onClose={() => setOpenEditor(null)} />
      <HomePageEditor key={`home-${openEditor}`} open={openEditor === 'home'} initialSection="wordmark" onClose={() => setOpenEditor(null)} />
      <HomePageEditor key={`home-reel-${openEditor}`} open={openEditor === 'homeReel'} initialSection="reel" onClose={() => setOpenEditor(null)} />
      <MenuPreviewEditor key={`menu-${currentMenuItem.route}-${openEditor}`} open={openEditor === 'menu'} menuItem={currentMenuItem} onClose={() => setOpenEditor(null)} />
    </>
  )
}

function BarButton({ children, onClick }) {
  return (
    <button type="button" onClick={onClick} className="rounded-full border border-white/15 px-3 py-1.5 transition hover:border-[#d4af37]/60 hover:text-[#d4af37]">
      {children}
    </button>
  )
}
