export const HOME_SETTINGS_KEY = 'kworks_home_settings'
export const PAGE_SETTINGS_KEY = 'kworks_page_settings'
export const MENU_PREVIEW_SETTINGS_KEY = 'kworks_menu_preview_settings'
export const STUDIO_SETTINGS_EVENT = 'kworks-studio-settings-change'

export const publicPageDefaults = {
  '/': {
    label: 'Home',
    headingText: 'KABILAN\nWORKS',
    subtitleText:
      'Photographer with a deeply rooted fascination for everyday life, emotions, and fleeting moments, working primarily with portraits, events, travel frames, and cinematic visual storytelling.',
  },
  '/archive': {
    label: 'Visual Archive',
    headingText: 'VISUAL ARCHIVE',
    subtitleText: 'A complete archive of captured moments, edits, memories, and visual stories inside K-Works.',
  },
  '/collections': {
    label: 'Collections',
    headingText: 'COLLECTIONS',
    subtitleText: 'Visual sets organized by mood, place, people, and moments.',
  },
  '/featured': {
    label: 'Featured Works',
    headingText: 'FEATURED WORKS',
    subtitleText: 'A curated selection of signature frames, visual stories, edits, and moments from K-Works.',
  },
  '/moodboard': {
    label: 'Moodboard',
    headingText: 'MOODBOARD',
    subtitleText: 'The visual language of K-Works - colors, moods, textures, light, and editing styles that shape the archive.',
  },
  '/gear': {
    label: 'Gear & Tools',
    headingText: 'GEAR & TOOLS',
    subtitleText:
      'The creative and technical setup behind K-Works - from cameras and mobile photography to editing, AI, and web-based visual systems.',
  },
  '/journal': {
    label: 'Journal',
    headingText: 'Stories behind selected frames.',
    subtitleText: 'Short notes for food walks, event nights, city corners, and small memories.',
  },
  '/experiments': {
    label: 'Experiments',
    headingText: 'EXPERIMENTS',
    subtitleText: 'A creative lab for edits, visual trials, AI ideas, color grading, and cinematic concepts.',
  },
  '/about': {
    label: 'About Kabilan',
    headingText: 'ABOUT\nKABILAN',
    subtitleText:
      'K-Works is a personal visual archive by Kabilan, built to collect and present photography, edits, travel frames, event moments, food visuals, street frames, and everyday visual stories.',
  },
  '/contact': {
    label: 'Contact',
    headingText: 'START A\nVISUAL\nSTORY',
    subtitleText: 'For collaborations, event coverage, creative edits, or visual ideas, leave a message for K-Works.',
  },
}

export const defaultHomeSettings = {
  wordmark: {
    line1: 'KABILAN',
    line2: 'WORKS',
    x: 0,
    y: 0,
    width: 75,
    worksX: 0,
    worksY: 0,
    fontSize: '',
    letterSpacing: '',
    textColor: '#f8f1df',
    show: true,
  },
  paragraph: {
    text: publicPageDefaults['/'].subtitleText,
    x: 0,
    y: 0,
    width: 28,
    fontSize: 20,
    align: 'justify',
    textColor: '#f8f1df',
    show: true,
  },
  tagline: {
    text: 'Captured. Curated. Created.',
    x: 0,
    y: 0,
    fontSize: 16,
    color: '#d4af37',
    show: true,
  },
  reel: {
    imageUrls: [],
    travelDuration: 20,
    direction: 'bottom-to-top',
    manualPause: 700,
    overlayDarkness: 0,
  },
}

export const defaultTextSettings = {
  headingText: '',
  subtitleText: '',
  headingFontSize: '',
  headingX: 0,
  headingY: 0,
  subtitleWidth: '',
  subtitleAlign: 'left',
  textColor: '#f8f1df',
  showHeading: true,
  showSubtitle: true,
}

export const defaultBackgroundSettings = {
  imageUrl: '',
  overlayDarkness: 35,
  position: 'center',
  size: 'cover',
  blur: 0,
  showImage: true,
}

export const defaultMenuPreviewSettings = {
  title: '',
  description: '',
  imageUrl: '',
  previewType: 'image',
  overlayDarkness: 15,
  alignment: 'left',
  showPreview: true,
}

function readJson(key, fallback) {
  if (typeof window === 'undefined') return fallback

  try {
    return JSON.parse(window.localStorage.getItem(key) || JSON.stringify(fallback))
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  if (typeof window === 'undefined') return

  window.localStorage.setItem(key, JSON.stringify(value))
  window.dispatchEvent(new Event(STUDIO_SETTINGS_EVENT))
}

export function getHomeSettings() {
  const saved = readJson(HOME_SETTINGS_KEY, {})

  return {
    wordmark: { ...defaultHomeSettings.wordmark, ...(saved.wordmark || {}) },
    paragraph: { ...defaultHomeSettings.paragraph, ...(saved.paragraph || {}) },
    tagline: { ...defaultHomeSettings.tagline, ...(saved.tagline || {}) },
    reel: { ...defaultHomeSettings.reel, ...(saved.reel || {}) },
  }
}

export function saveHomeSettings(settings) {
  writeJson(HOME_SETTINGS_KEY, settings)
}

export function resetHomeSettings() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(HOME_SETTINGS_KEY)
  window.dispatchEvent(new Event(STUDIO_SETTINGS_EVENT))
}

export function getAllPageSettings() {
  return readJson(PAGE_SETTINGS_KEY, {})
}

export function getPageSettings(route) {
  return getAllPageSettings()[route] || {}
}

export function savePageSettings(route, nextSettings) {
  const allSettings = getAllPageSettings()
  writeJson(PAGE_SETTINGS_KEY, { ...allSettings, [route]: nextSettings })
}

export function resetPageSettings(route, section) {
  const allSettings = getAllPageSettings()
  if (!allSettings[route]) return

  const nextRouteSettings = { ...allSettings[route] }
  delete nextRouteSettings[section]

  const nextSettings = { ...allSettings }
  if (Object.keys(nextRouteSettings).length) {
    nextSettings[route] = nextRouteSettings
  } else {
    delete nextSettings[route]
  }

  writeJson(PAGE_SETTINGS_KEY, nextSettings)
}

export function getMenuPreviewSettings() {
  return readJson(MENU_PREVIEW_SETTINGS_KEY, {})
}

export function getMenuPreviewSetting(route) {
  return getMenuPreviewSettings()[route] || {}
}

export function saveMenuPreviewSetting(route, settings) {
  const allSettings = getMenuPreviewSettings()
  writeJson(MENU_PREVIEW_SETTINGS_KEY, { ...allSettings, [route]: settings })
}

export function resetMenuPreviewSetting(route) {
  const allSettings = getMenuPreviewSettings()
  delete allSettings[route]
  writeJson(MENU_PREVIEW_SETTINGS_KEY, allSettings)
}
