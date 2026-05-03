import { useState } from 'react'
import ConfirmPinModal from './ConfirmPinModal.jsx'
import { EditorActions, Field, SelectInput, StudioDrawer, TextInput, ToggleField } from './StudioFields.jsx'
import {
  defaultBackgroundSettings,
  getPageSettings,
  publicPageDefaults,
  resetPageSettings,
  savePageSettings,
} from '../../utils/studioSettings.js'

export default function PageBackgroundEditor({ open, route, onClose }) {
  const defaults = publicPageDefaults[route] || publicPageDefaults['/']
  const savedPage = getPageSettings(route)
  const [form, setForm] = useState(() => ({ ...defaultBackgroundSettings, ...(savedPage.background || {}) }))
  const [confirmAction, setConfirmAction] = useState(null)

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const runConfirmedAction = () => {
    if (confirmAction === 'save') {
      savePageSettings(route, { ...getPageSettings(route), background: form })
      onClose()
    }

    if (confirmAction === 'reset') {
      resetPageSettings(route, 'background')
      setForm(defaultBackgroundSettings)
      onClose()
    }

    setConfirmAction(null)
  }

  return (
    <>
      <StudioDrawer open={open} onClose={onClose} eyebrow={defaults.label} title="Page Background Editor">
        <div className="grid gap-5">
          <Field label="Background image URL"><TextInput value={form.imageUrl} placeholder="/gallery/background.jpg or https://..." onChange={(event) => updateField('imageUrl', event.target.value)} /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Overlay darkness percentage"><TextInput type="number" min="0" max="100" value={form.overlayDarkness} onChange={(event) => updateField('overlayDarkness', Number(event.target.value))} /></Field>
            <Field label="Background position"><TextInput value={form.position} placeholder="center, top, 50% 20%" onChange={(event) => updateField('position', event.target.value)} /></Field>
            <Field label="Background size">
              <SelectInput value={form.size} onChange={(event) => updateField('size', event.target.value)}>
                <option value="cover">cover</option>
                <option value="contain">contain</option>
              </SelectInput>
            </Field>
            <Field label="Background blur amount"><TextInput type="number" min="0" max="40" value={form.blur} onChange={(event) => updateField('blur', Number(event.target.value))} /></Field>
          </div>
          <ToggleField label="Show background image" checked={form.showImage} onChange={(value) => updateField('showImage', value)} />
        </div>

        <EditorActions onSave={() => setConfirmAction('save')} onReset={() => setConfirmAction('reset')} onCancel={onClose} />
      </StudioDrawer>

      <ConfirmPinModal
        open={Boolean(confirmAction)}
        title={confirmAction === 'reset' ? 'Reset page background settings?' : 'Save these design changes?'}
        onCancel={() => setConfirmAction(null)}
        onConfirm={runConfirmedAction}
      />
    </>
  )
}
