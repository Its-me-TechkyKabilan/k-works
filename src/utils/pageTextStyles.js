export function getTextSettings(settings = {}, fallbackHeading, fallbackSubtitle) {
  return {
    headingText: settings.headingText || fallbackHeading,
    subtitleText: settings.subtitleText || fallbackSubtitle,
    showHeading: settings.showHeading !== false,
    showSubtitle: settings.showSubtitle !== false,
    headingStyle: {
      color: settings.textColor || undefined,
      fontSize: settings.headingFontSize || undefined,
      transform: `translate(${Number(settings.headingX) || 0}px, ${Number(settings.headingY) || 0}px)`,
      whiteSpace: 'pre-line',
    },
    subtitleStyle: {
      color: settings.textColor || undefined,
      maxWidth: settings.subtitleWidth || undefined,
      textAlign: settings.subtitleAlign || undefined,
    },
  }
}
