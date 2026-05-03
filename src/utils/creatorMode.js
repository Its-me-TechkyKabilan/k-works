export const CREATOR_MODE_KEY = 'kworks_creator_mode'
export const CREATOR_LOGIN_TIME_KEY = 'kworks_creator_login_time'

export function isCreatorMode() {
  if (typeof window === 'undefined') return false

  try {
    return window.localStorage.getItem(CREATOR_MODE_KEY) === 'true'
  } catch {
    return false
  }
}

export function isCreatorModeActive() {
  return isCreatorMode()
}

export function enableCreatorMode() {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(CREATOR_MODE_KEY, 'true')
    window.localStorage.setItem(CREATOR_LOGIN_TIME_KEY, new Date().toISOString())
    window.dispatchEvent(new Event('kworks-creator-mode-change'))
  } catch {
    // If browser storage is unavailable, Creator Mode cannot persist across pages.
  }
}

export function disableCreatorMode() {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.removeItem(CREATOR_MODE_KEY)
    window.localStorage.removeItem(CREATOR_LOGIN_TIME_KEY)
    window.dispatchEvent(new Event('kworks-creator-mode-change'))
  } catch {
    // If browser storage is unavailable, there is nothing to clear.
  }
}
