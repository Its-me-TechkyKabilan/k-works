import { useMemo, useState } from 'react'
import ConfirmPinModal from './ConfirmPinModal.jsx'
import { EditorActions, Field, SelectInput, StudioDrawer, TextArea, TextInput, ToggleField } from './StudioFields.jsx'
import { defaultHomeSettings, getHomeSettings, resetHomeSettings, saveHomeSettings } from '../../utils/studioSettings.js'

export default function HomePageEditor({ open, onClose, initialSection = 'wordmark' }) {
  const [form, setForm] = useState(() => getHomeSettings())
  const [confirmAction, setConfirmAction] = useState(null)
  const [newImageUrl, setNewImageUrl] = useState('')

  const title = initialSection === 'reel' ? 'Home Background Reel' : 'Home Page Editor'
  const imageUrls = useMemo(() => form.reel.imageUrls || [], [form.reel.imageUrls])

  const updateSection = (section, patch) => {
    setForm((current) => ({ ...current, [section]: { ...current[section], ...patch } }))
  }

  const addImageUrl = () => {
    const trimmed = newImageUrl.trim()
    if (!trimmed) return
    updateSection('reel', { imageUrls: [...imageUrls, trimmed] })
    setNewImageUrl('')
  }

  const removeImageUrl = (url) => {
    updateSection('reel', { imageUrls: imageUrls.filter((item) => item !== url) })
  }

  const runConfirmedAction = () => {
    if (confirmAction === 'save') {
      saveHomeSettings(form)
      onClose()
    }

    if (confirmAction === 'reset') {
      resetHomeSettings()
      setForm(defaultHomeSettings)
      onClose()
    }

    setConfirmAction(null)
  }

  return (
    <>
      <StudioDrawer open={open} onClose={onClose} eyebrow="Creator Design" title={title}>
        <div className="grid gap-7">
          {initialSection !== 'reel' && (
            <>
              <PanelTitle>1. Main Wordmark</PanelTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Line 1 text"><TextInput value={form.wordmark.line1} onChange={(event) => updateSection('wordmark', { line1: event.target.value })} /></Field>
                <Field label="Line 2 text"><TextInput value={form.wordmark.line2} onChange={(event) => updateSection('wordmark', { line2: event.target.value })} /></Field>
                <Field label="Wordmark X position"><TextInput type="number" value={form.wordmark.x} onChange={(event) => updateSection('wordmark', { x: Number(event.target.value) })} /></Field>
                <Field label="Wordmark Y position"><TextInput type="number" value={form.wordmark.y} onChange={(event) => updateSection('wordmark', { y: Number(event.target.value) })} /></Field>
                <Field label="Wordmark width"><TextInput type="number" value={form.wordmark.width} onChange={(event) => updateSection('wordmark', { width: Number(event.target.value) })} /></Field>
                <Field label="WORKS X offset"><TextInput type="number" value={form.wordmark.worksX} onChange={(event) => updateSection('wordmark', { worksX: Number(event.target.value) })} /></Field>
                <Field label="WORKS Y offset"><TextInput type="number" value={form.wordmark.worksY} onChange={(event) => updateSection('wordmark', { worksY: Number(event.target.value) })} /></Field>
                <Field label="Font size"><TextInput value={form.wordmark.fontSize} placeholder="Example: clamp(5rem, 12vw, 13rem)" onChange={(event) => updateSection('wordmark', { fontSize: event.target.value })} /></Field>
                <Field label="Letter spacing"><TextInput value={form.wordmark.letterSpacing} placeholder="Example: 0.04em" onChange={(event) => updateSection('wordmark', { letterSpacing: event.target.value })} /></Field>
                <Field label="Text color"><TextInput type="color" value={form.wordmark.textColor} onChange={(event) => updateSection('wordmark', { textColor: event.target.value })} /></Field>
              </div>
              <ToggleField label="Show wordmark" checked={form.wordmark.show} onChange={(value) => updateSection('wordmark', { show: value })} />

              <PanelTitle>2. Photographer Paragraph</PanelTitle>
              <Field label="Paragraph text"><TextArea value={form.paragraph.text} onChange={(event) => updateSection('paragraph', { text: event.target.value })} /></Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="X position"><TextInput type="number" value={form.paragraph.x} onChange={(event) => updateSection('paragraph', { x: Number(event.target.value) })} /></Field>
                <Field label="Y position"><TextInput type="number" value={form.paragraph.y} onChange={(event) => updateSection('paragraph', { y: Number(event.target.value) })} /></Field>
                <Field label="Width"><TextInput type="number" value={form.paragraph.width} onChange={(event) => updateSection('paragraph', { width: Number(event.target.value) })} /></Field>
                <Field label="Font size"><TextInput type="number" value={form.paragraph.fontSize} onChange={(event) => updateSection('paragraph', { fontSize: Number(event.target.value) })} /></Field>
                <Field label="Text alignment">
                  <SelectInput value={form.paragraph.align} onChange={(event) => updateSection('paragraph', { align: event.target.value })}>
                    {['left', 'right', 'center', 'justify'].map((item) => <option key={item} value={item}>{item}</option>)}
                  </SelectInput>
                </Field>
                <Field label="Text color"><TextInput type="color" value={form.paragraph.textColor} onChange={(event) => updateSection('paragraph', { textColor: event.target.value })} /></Field>
              </div>
              <ToggleField label="Show paragraph" checked={form.paragraph.show} onChange={(value) => updateSection('paragraph', { show: value })} />

              <PanelTitle>3. Bottom Tagline</PanelTitle>
              <Field label="Tagline text"><TextInput value={form.tagline.text} onChange={(event) => updateSection('tagline', { text: event.target.value })} /></Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="X position"><TextInput type="number" value={form.tagline.x} onChange={(event) => updateSection('tagline', { x: Number(event.target.value) })} /></Field>
                <Field label="Y position"><TextInput type="number" value={form.tagline.y} onChange={(event) => updateSection('tagline', { y: Number(event.target.value) })} /></Field>
                <Field label="Font size"><TextInput type="number" value={form.tagline.fontSize} onChange={(event) => updateSection('tagline', { fontSize: Number(event.target.value) })} /></Field>
                <Field label="Color"><TextInput type="color" value={form.tagline.color} onChange={(event) => updateSection('tagline', { color: event.target.value })} /></Field>
              </div>
              <ToggleField label="Show tagline" checked={form.tagline.show} onChange={(value) => updateSection('tagline', { show: value })} />
            </>
          )}

          <PanelTitle>4. Home Background Reel</PanelTitle>
          <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <Field label="Add background image URL"><TextInput value={newImageUrl} onChange={(event) => setNewImageUrl(event.target.value)} placeholder="/gallery/new-image.jpg or https://..." /></Field>
            <button type="button" onClick={addImageUrl} className="self-end rounded-full border border-[#d4af37]/60 px-5 py-3 text-xs uppercase tracking-[0.18em] text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black">
              Add URL
            </button>
          </div>
          {imageUrls.length > 0 && (
            <div className="grid gap-2">
              {imageUrls.map((url) => (
                <div key={url} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-[#f8f1df]/70">
                  <span className="truncate">{url}</span>
                  <button type="button" onClick={() => removeImageUrl(url)} className="text-[#d4af37]">Remove</button>
                </div>
              ))}
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Scroll speed / image travel duration"><TextInput type="number" value={form.reel.travelDuration} onChange={(event) => updateSection('reel', { travelDuration: Number(event.target.value) })} /></Field>
            <Field label="Direction">
              <SelectInput value={form.reel.direction} onChange={(event) => updateSection('reel', { direction: event.target.value })}>
                <option value="bottom-to-top">bottom-to-top</option>
                <option value="top-to-bottom">top-to-bottom</option>
              </SelectInput>
            </Field>
            <Field label="Manual scroll pause duration"><TextInput type="number" value={form.reel.manualPause} onChange={(event) => updateSection('reel', { manualPause: Number(event.target.value) })} /></Field>
            <Field label="Overlay darkness"><TextInput type="number" min="0" max="100" value={form.reel.overlayDarkness} onChange={(event) => updateSection('reel', { overlayDarkness: Number(event.target.value) })} /></Field>
          </div>
        </div>

        <EditorActions onSave={() => setConfirmAction('save')} onReset={() => setConfirmAction('reset')} onCancel={onClose} />
      </StudioDrawer>

      <ConfirmPinModal
        open={Boolean(confirmAction)}
        title={confirmAction === 'reset' ? 'Reset home design settings?' : 'Save these design changes?'}
        onCancel={() => setConfirmAction(null)}
        onConfirm={runConfirmedAction}
      />
    </>
  )
}

function PanelTitle({ children }) {
  return <h3 className="border-b border-[#d4af37]/25 pb-3 font-serif text-2xl text-[#f8f1df]">{children}</h3>
}
