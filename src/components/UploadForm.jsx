import { Calendar, Camera, Check, FileText, ImagePlus, MapPin, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { galleryCategories } from '../data/gallery.js'

const initialForm = {
  title: '',
  category: galleryCategories[0],
  location: '',
  device: '',
  caption: '',
  date: '',
}

export default function UploadForm() {
  const fileInputRef = useRef(null)
  const [form, setForm] = useState(initialForm)
  const [preview, setPreview] = useState('')
  const [fileName, setFileName] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [status, setStatus] = useState('')

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const readFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = () => {
      setPreview(reader.result)
      setFileName(file.name)
      setStatus('')
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    readFile(event.dataTransfer.files?.[0])
  }

  const handleSave = (event) => {
    event.preventDefault()
    if (!preview || !form.title.trim()) {
      setStatus('Add an image and title before saving.')
      return
    }

    const newItem = {
      id: `upload-${Date.now()}`,
      src: preview,
      title: form.title.trim(),
      category: form.category,
      location: form.location.trim() || 'Personal Archive',
      device: form.device.trim() || 'Unknown Device',
      caption: form.caption.trim() || 'Uploaded into K-Works.',
      date: form.date || new Date().toISOString().slice(0, 10),
      featured: false,
    }

    // Demo storage only: this saves uploaded photo data in the browser with localStorage.
    // Later, this can be replaced with a backend or cloud storage upload flow.
    const savedItems = JSON.parse(window.localStorage.getItem('kworksUploads') || '[]')
    window.localStorage.setItem('kworksUploads', JSON.stringify([newItem, ...savedItems]))

    setForm(initialForm)
    setPreview('')
    setFileName('')
    setStatus('Saved to the demo archive.')
  }

  return (
    <form onSubmit={handleSave} className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div
        className={`flex min-h-[28rem] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center transition ${
          isDragging ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-white/20 bg-white/5'
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => readFile(event.target.files?.[0])}
        />

        {preview ? (
          <img src={preview} alt="Upload preview" className="max-h-[25rem] w-full rounded-md object-cover" />
        ) : (
          <div className="mx-auto max-w-sm">
            <Upload className="mx-auto text-[#d4af37]" size={42} strokeWidth={1.4} aria-hidden="true" />
            <h2 className="mt-6 font-serif text-3xl text-[#f8f1df]">Drop a frame here</h2>
            <p className="mt-3 text-sm leading-6 text-[#f8f1df]/60">Choose an image and add its archive details.</p>
          </div>
        )}

        {fileName && <p className="mt-4 text-sm text-[#d4af37]">{fileName}</p>}
      </div>

      <div className="glass-panel p-5 sm:p-7">
        <div className="grid gap-4">
          <label className="field-label">
            Photo title
            <span className="field-shell">
              <ImagePlus size={17} aria-hidden="true" />
              <input value={form.title} onChange={(event) => updateField('title', event.target.value)} placeholder="Golden hour street" />
            </span>
          </label>

          <label className="field-label">
            Category
            <span className="field-shell">
              <FileText size={17} aria-hidden="true" />
              <select value={form.category} onChange={(event) => updateField('category', event.target.value)}>
                {galleryCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </span>
          </label>

          <label className="field-label">
            Location
            <span className="field-shell">
              <MapPin size={17} aria-hidden="true" />
              <input value={form.location} onChange={(event) => updateField('location', event.target.value)} placeholder="Hyderabad" />
            </span>
          </label>

          <label className="field-label">
            Device used
            <span className="field-shell">
              <Camera size={17} aria-hidden="true" />
              <input value={form.device} onChange={(event) => updateField('device', event.target.value)} placeholder="Mobile Camera" />
            </span>
          </label>

          <label className="field-label">
            Caption
            <textarea
              value={form.caption}
              onChange={(event) => updateField('caption', event.target.value)}
              placeholder="A small story behind the frame."
              rows="4"
              className="field-textarea"
            />
          </label>

          <label className="field-label">
            Date
            <span className="field-shell">
              <Calendar size={17} aria-hidden="true" />
              <input type="date" value={form.date} onChange={(event) => updateField('date', event.target.value)} />
            </span>
          </label>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button type="submit" className="primary-button">
            <Check size={18} aria-hidden="true" />
            Save/Add to Archive
          </button>
          <Link to="/archive" className="secondary-button">
            View Archive
          </Link>
        </div>

        {status && <p className="mt-4 text-sm text-[#d4af37]">{status}</p>}
      </div>
    </form>
  )
}
