import { useState } from 'react'
import ConfirmPinModal from './ConfirmPinModal.jsx'
import { EditorActions, Field, SelectInput, StudioDrawer, TextArea, TextInput, ToggleField } from './StudioFields.jsx'
import {
  defaultMenuPreviewSettings,
  getMenuPreviewSetting,
  resetMenuPreviewSetting,
  saveMenuPreviewSetting,
} from '../../utils/studioSettings.js'

export default function MenuPreviewEditor({ open, menuItem, onClose }) {
  const [form, setForm] = useState(() => ({
    ...defaultMenuPreviewSettings,
    title: menuItem?.label || '',
    description: menuItem?.description || '',
    imageUrl: menuItem?.previewImage || '',
    ...(menuItem ? getMenuPreviewSetting(menuItem.route) : {}),
  }))
  const [confirmAction, setConfirmAction] = useState(null)

  if (!menuItem) return null

  const updateField = (field, value) => setForm((current) => ({ ...current, [field]: value }))

  const runConfirmedAction = () => {
    if (confirmAction === 'save') {
      saveMenuPreviewSetting(menuItem.route, form)
      onClose()
    }

    if (confirmAction === 'reset') {
      resetMenuPreviewSetting(menuItem.route)
      setForm({
        ...defaultMenuPreviewSettings,
        title: menuItem.label,
        description: menuItem.description,
        imageUrl: menuItem.previewImage,
      })
      onClose()
    }

    setConfirmAction(null)
  }

  return (
    <>
      <StudioDrawer open={open} onClose={onClose} eyebrow={menuItem.label} title="Menu Preview Editor">
        <div className="grid gap-5">
          <Field label="Menu item title"><TextInput value={form.title} onChange={(event) => updateField('title', event.target.value)} /></Field>
          <Field label="Preview description"><TextArea value={form.description} onChange={(event) => updateField('description', event.target.value)} /></Field>
          <Field label="Preview image URL"><TextInput value={form.imageUrl} onChange={(event) => updateField('imageUrl', event.target.value)} /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Preview type">
              <SelectInput value={form.previewType} onChange={(event) => updateField('previewType', event.target.value)}>
                {['image', 'gallery', 'cards', 'text'].map((item) => <option key={item} value={item}>{item}</option>)}
              </SelectInput>
            </Field>
            <Field label="Overlay darkness percentage"><TextInput type="number" min="0" max="100" value={form.overlayDarkness} onChange={(event) => updateField('overlayDarkness', Number(event.target.value))} /></Field>
            <Field label="Preview alignment">
              <SelectInput value={form.alignment} onChange={(event) => updateField('alignment', event.target.value)}>
                {['left', 'center', 'right'].map((item) => <option key={item} value={item}>{item}</option>)}
              </SelectInput>
            </Field>
          </div>
          <ToggleField label="Show preview" checked={form.showPreview} onChange={(value) => updateField('showPreview', value)} />
        </div>

        <EditorActions onSave={() => setConfirmAction('save')} onReset={() => setConfirmAction('reset')} onCancel={onClose} />
      </StudioDrawer>

      <ConfirmPinModal
        open={Boolean(confirmAction)}
        title={confirmAction === 'reset' ? 'Reset menu preview settings?' : 'Save these design changes?'}
        onCancel={() => setConfirmAction(null)}
        onConfirm={runConfirmedAction}
      />
    </>
  )
}
