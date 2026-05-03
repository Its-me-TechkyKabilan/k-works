import { useEffect, useMemo, useState } from 'react'
import {
  STUDIO_SETTINGS_EVENT,
  getHomeSettings,
  getMenuPreviewSetting,
  getPageSettings,
} from '../utils/studioSettings.js'

function useSettingsVersion() {
  const [version, setVersion] = useState(0)

  useEffect(() => {
    const syncSettings = () => setVersion((current) => current + 1)

    window.addEventListener('storage', syncSettings)
    window.addEventListener(STUDIO_SETTINGS_EVENT, syncSettings)

    return () => {
      window.removeEventListener('storage', syncSettings)
      window.removeEventListener(STUDIO_SETTINGS_EVENT, syncSettings)
    }
  }, [])

  return version
}

export function useHomeSettings() {
  const version = useSettingsVersion()
  return useMemo(() => getHomeSettings(), [version])
}

export function usePageSettings(route) {
  const version = useSettingsVersion()
  return useMemo(() => getPageSettings(route), [route, version])
}

export function useMenuPreviewSetting(route) {
  const version = useSettingsVersion()
  return useMemo(() => getMenuPreviewSetting(route), [route, version])
}
