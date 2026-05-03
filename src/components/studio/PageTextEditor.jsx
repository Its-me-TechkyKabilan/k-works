import { useState } from 'react'
import ConfirmPinModal from './ConfirmPinModal.jsx'
import { EditorActions, Field, SelectInput, StudioDrawer, TextArea, TextInput, ToggleField } from './StudioFields.jsx'
import {
  defaultTextSettings,
  getPageSettings,
  publicPageDefaults,
  resetPageSettings,
  savePageSettings,
} from '../../utils/studioSettings.js'

export default function PageTextEditor({ open, route, onClose }) {
  const defaults = publicPageDefaults[route] || publicPageDefaults['/']
  const savedPage = getPageSettings(route)
  const [form, setForm] = useState(() => ({
    ...defaultTextSettings,
    headingText: defaults.headingText,
    subtitleText: defaults.subtitleText,
    ...(savedPage.text || {}),
  }))
  const [confirmAction, setConfirmAction] = useState(null)

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const runConfirmedAction = () => {
    if (confirmAction === 'save') {
      savePageSettings(route, { ...getPageSettings(route), text: form })
      onClose()
    }

    if (confirmAction === 'reset') {
      resetPageSettings(route, 'text')
      setForm({ ...defaultTextSettings, headingText: defaults.headingText, subtitleText: defaults.subtitleText })
      onClose()
    }

    setConfirmAction(null)
  }

  return (
    <>
      <StudioDrawer open={open} onClose={onClose} eyebrow={defaults.label} title="Page Text Editor">
        <div className="grid gap-5">
          <Field label="Page heading text"><TextArea value={form.headingText} onChange={(event) => updateField('headingText', event.target.value)} /></Field>
          <Field label="Subtitle / description text"><TextArea value={form.subtitleText} onChange={(event) => updateField('subtitleText', event.target.value)} /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Heading font size"><TextInput value={form.headingFontSize} placeholder="Example: 7rem" onChange={(event) => updateField('headingFontSize', event.target.value)} /></Field>
            <Field label="Heading X position"><TextInput type="number" value={form.headingX} onChange={(event) => updateField('headingX', Number(event.target.value))} /></Field>
            <Field label="Heading Y position"><TextInput type="number" value={form.headingY} onChange={(event) => updateField('headingY', Number(event.target.value))} /></Field>
            <Field label="Subtitle width"><TextInput value={form.subtitleWidth} placeholder="Example: 42rem" onChange={(event) => updateField('subtitleWidth', event.target.value)} /></Field>
            <Field label="Subtitle alignment">
              <SelectInput value={form.subtitleAlign} onChange={(event) => updateField('subtitleAlign', event.target.value)}>
                {['left', 'center', 'right', 'justify'].map((item) => <option key={item} value={item}>{item}</option>)}
              </SelectInput>
            </Field>
            <Field label="Text color"><TextInput type="color" value={form.textColor} onChange={(event) => updateField('textColor', event.target.value)} /></Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <ToggleField label="Show heading" checked={form.showHeading} onChange={(value) => updateField('showHeading', value)} />
            <ToggleField label="Show subtitle" checked={form.showSubtitle} onChange={(value) => updateField('showSubtitle', value)} />
          </div>
        </div>

        <EditorActions onSave={() => setConfirmAction('save')} onReset={() => setConfirmAction('reset')} onCancel={onClose} />
      </StudioDrawer>

      <ConfirmPinModal
        open={Boolean(confirmAction)}
        title={confirmAction === 'reset' ? 'Reset page text settings?' : 'Save these design changes?'}
        onCancel={() => setConfirmAction(null)}
        onConfirm={runConfirmedAction}
      />
    </>
  )
}
