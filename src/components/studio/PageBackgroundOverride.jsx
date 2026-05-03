import { usePageSettings } from '../../hooks/useStudioSettings.js'

export default function PageBackgroundOverride({ route }) {
  const settings = usePageSettings(route)
  const background = settings.background

  if (!background?.showImage || !background.imageUrl) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${background.imageUrl})`,
          backgroundPosition: background.position || 'center',
          backgroundSize: background.size || 'cover',
          backgroundRepeat: 'no-repeat',
          filter: background.blur ? `blur(${background.blur}px)` : undefined,
          transform: background.blur ? 'scale(1.04)' : undefined,
        }}
      />
      <div className="absolute inset-0 bg-black" style={{ opacity: Math.min(Math.max(Number(background.overlayDarkness) || 0, 0), 100) / 100 }} />
    </div>
  )
}
