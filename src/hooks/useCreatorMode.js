import { useEffect, useState } from 'react'
import { isCreatorMode } from '../utils/creatorMode.js'

export default function useCreatorMode() {
  const [creatorModeActive, setCreatorModeActive] = useState(() => isCreatorMode())

  useEffect(() => {
    const syncCreatorMode = () => setCreatorModeActive(isCreatorMode())

    syncCreatorMode()

    window.addEventListener('storage', syncCreatorMode)
    window.addEventListener('kworks-creator-mode-change', syncCreatorMode)
    window.addEventListener('focus', syncCreatorMode)
    window.addEventListener('pageshow', syncCreatorMode)
    document.addEventListener('visibilitychange', syncCreatorMode)

    return () => {
      window.removeEventListener('storage', syncCreatorMode)
      window.removeEventListener('kworks-creator-mode-change', syncCreatorMode)
      window.removeEventListener('focus', syncCreatorMode)
      window.removeEventListener('pageshow', syncCreatorMode)
      document.removeEventListener('visibilitychange', syncCreatorMode)
    }
  }, [])

  return creatorModeActive
}
