import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import FullscreenMenu from './components/FullscreenMenu.jsx'
import Navbar from './components/Navbar.jsx'
import Preloader from './components/Preloader.jsx'
import CreatorModeBar from './components/studio/CreatorModeBar.jsx'
import useCreatorMode from './hooks/useCreatorMode.js'
import AboutKabilan from './pages/AboutKabilan.jsx'
import Collections from './pages/Collections.jsx'
import Contact from './pages/Contact.jsx'
import CreatorStudio from './pages/CreatorStudio.jsx'
import Experiments from './pages/Experiments.jsx'
import FeaturedWorks from './pages/FeaturedWorks.jsx'
import GearTools from './pages/GearTools.jsx'
import Home from './pages/Home.jsx'
import Journal from './pages/Journal.jsx'
import Moodboard from './pages/Moodboard.jsx'
import UploadWork from './pages/UploadWork.jsx'
import VisualArchive from './pages/VisualArchive.jsx'

const CREATOR_BAR_PUBLIC_PATHS = ['/', '/archive', '/collections', '/featured', '/moodboard', '/gear', '/journal', '/experiments', '/about', '/contact']

export default function App() {
  const location = useLocation()
  const isStudioRoute = location.pathname === '/studio'
  const creatorModeActive = useCreatorMode()
  const showCreatorModeBar = creatorModeActive && CREATOR_BAR_PUBLIC_PATHS.includes(location.pathname)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showPreloader, setShowPreloader] = useState(() => !isStudioRoute)

  const finishPreloader = useCallback(() => {
    setShowPreloader(false)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-[#030303]">
      <Navbar menuOpen={menuOpen} onToggleMenu={setMenuOpen} />
      <FullscreenMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <motion.div
        className="origin-center"
        animate={menuOpen ? { scale: 0.975, x: 22, filter: 'blur(4px)', opacity: 0.58 } : { scale: 1, x: 0, filter: 'blur(0px)', opacity: 1 }}
        transition={{ duration: 0.38, ease: 'easeOut' }}
        aria-hidden={menuOpen}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<VisualArchive />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/upload" element={<UploadWork />} />
          <Route path="/featured" element={<FeaturedWorks />} />
          <Route path="/moodboard" element={<Moodboard />} />
          <Route path="/gear" element={<GearTools />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/experiments" element={<Experiments />} />
          <Route path="/about" element={<AboutKabilan />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/studio" element={<CreatorStudio />} />
        </Routes>
      </motion.div>

      <CreatorModeBar active={showCreatorModeBar} />
      <AnimatePresence>{!isStudioRoute && showPreloader && <Preloader onComplete={finishPreloader} />}</AnimatePresence>
    </div>
  )
}
