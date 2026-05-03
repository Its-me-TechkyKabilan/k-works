import { ChevronDown, Link as LinkIcon, Mail, MessageSquare, Send, Trash2, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AdminSectionAction } from '../components/AdminControls.jsx'
import { galleryItems } from '../data/gallery.js'
import { usePageSettings } from '../hooks/useStudioSettings.js'
import { getTextSettings } from '../utils/pageTextStyles.js'

const initialForm = {
  name: '',
  email: '',
  preferredContactMethod: '',
  contactLink: '',
  message: '',
}

const contactMethods = ['Instagram', 'Email', 'Phone', 'Any']

// Change these placeholder contact values later when real K-Works links are ready.
const connectLinks = [
  { label: 'Instagram', value: '@your_instagram', href: 'https://instagram.com/your_instagram' },
  { label: 'Email', value: 'yourmail@example.com', href: 'mailto:yourmail@example.com' },
  { label: 'LinkedIn', value: 'LinkedIn Profile', href: 'https://linkedin.com' },
]

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [savedMessages, setSavedMessages] = useState([])
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const pageSettings = usePageSettings('/contact')
  const background = pageSettings.background
  const hasTextSettings = Boolean(pageSettings.text)
  const text = getTextSettings(pageSettings.text, 'START A\nVISUAL\nSTORY', 'For collaborations, event coverage, creative edits, or visual ideas, leave a message for K-Works.')

  const backgroundImage = background?.showImage && background.imageUrl ? background.imageUrl : galleryItems[10]?.src || galleryItems[0]?.src

  useEffect(() => {
    try {
      setSavedMessages(JSON.parse(window.localStorage.getItem('kworksContactMessages') || '[]'))
    } catch {
      setSavedMessages([])
    }
  }, [])

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setStatus('')
    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.preferredContactMethod || !form.message.trim()) {
      setError('Please fill Name, Email, Preferred Contact Method, and Message.')
      setStatus('')
      return
    }

    const newMessage = {
      name: form.name.trim(),
      email: form.email.trim(),
      preferredContactMethod: form.preferredContactMethod,
      contactLink: form.contactLink.trim(),
      message: form.message.trim(),
      submittedAt: new Date().toISOString(),
    }

    // Frontend demo storage only: messages are saved in this browser with localStorage.
    // Later, replace this block with a backend endpoint, email service, or CRM integration.
    const nextMessages = [newMessage, ...savedMessages]
    window.localStorage.setItem('kworksContactMessages', JSON.stringify(nextMessages))
    setSavedMessages(nextMessages)
    setForm(initialForm)
    setStatus('Message saved successfully.')
    setError('')
  }

  const clearMessages = () => {
    window.localStorage.removeItem('kworksContactMessages')
    setSavedMessages([])
    setStatus('')
    setError('')
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] text-[#f8f1df]">
      <img
        src={backgroundImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          objectPosition: background?.position || undefined,
          objectFit: background?.size || 'cover',
          filter: background?.blur ? `blur(${background.blur}px)` : undefined,
          transform: background?.blur ? 'scale(1.04)' : undefined,
        }}
      />
      <div className="absolute inset-0 bg-black" style={{ opacity: background?.imageUrl ? (Number(background.overlayDarkness) || 40) / 100 : 0.4 }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(212,175,55,0.16),transparent_24%),linear-gradient(90deg,rgba(3,3,3,0.58),rgba(3,3,3,0.22)_48%,rgba(3,3,3,0.5))]" />

      <section className="relative z-10 grid min-h-screen items-center gap-10 px-5 pb-10 pt-28 sm:px-8 lg:grid-cols-[0.9fr_1fr] lg:px-12">
        <div className="max-w-3xl">
          <p className="kicker">Contact</p>
          {hasTextSettings ? (
            text.showHeading && (
              <h1 className="mt-5 font-serif text-6xl font-semibold uppercase leading-[0.88] tracking-normal text-[#f8f1df] [text-shadow:0_6px_28px_rgba(0,0,0,0.82)] sm:text-8xl lg:text-[7.8rem]" style={text.headingStyle}>
                {text.headingText}
              </h1>
            )
          ) : (
            <h1 className="mt-5 font-serif text-6xl font-semibold uppercase leading-[0.88] tracking-normal text-[#f8f1df] [text-shadow:0_6px_28px_rgba(0,0,0,0.82)] sm:text-8xl lg:text-[7.8rem]">
              START A
              <span className="block text-[#d4af37]">VISUAL</span>
              <span className="block">STORY</span>
            </h1>
          )}
          {text.showSubtitle && (
            <p className="mt-7 max-w-xl font-serif text-xl leading-8 text-[#f8f1df]/90 [text-shadow:0_4px_22px_rgba(0,0,0,0.8)]" style={text.subtitleStyle}>
              {text.subtitleText}
            </p>
          )}
          <div className="mt-6">
            <AdminSectionAction>View Messages / Manage Messages</AdminSectionAction>
          </div>
        </div>

        <div className="mx-auto w-full max-w-2xl rounded-2xl border border-[#d4af37]/40 bg-black/40 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
          <form onSubmit={handleSubmit} className="grid gap-5">
            <ContactField label="Name" icon={User}>
              <input
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                placeholder="Your name"
                className="contact-line-input"
              />
            </ContactField>

            <ContactField label="Email" icon={Mail}>
              <input
                type="email"
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                placeholder="you@example.com"
                className="contact-line-input"
              />
            </ContactField>

            <ContactField label="Preferred Contact Method" icon={ChevronDown}>
              <select
                value={form.preferredContactMethod}
                onChange={(event) => updateField('preferredContactMethod', event.target.value)}
                className="contact-line-input appearance-none"
              >
                <option value="">Select one</option>
                {contactMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </ContactField>

            <ContactField label="Instagram Handle / Contact Link" icon={LinkIcon}>
              <input
                value={form.contactLink}
                onChange={(event) => updateField('contactLink', event.target.value)}
                placeholder="@handle or link"
                className="contact-line-input"
              />
            </ContactField>

            <ContactField label="Message" icon={MessageSquare}>
              <textarea
                value={form.message}
                onChange={(event) => updateField('message', event.target.value)}
                placeholder="Tell me what you want to create..."
                rows="4"
                className="contact-line-input min-h-28 resize-none py-3"
              />
            </ContactField>

            <button type="submit" className="group mt-2 inline-flex w-full items-center justify-center gap-3 rounded-full border border-[#d4af37]/60 px-6 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-[#d4af37] transition duration-300 hover:bg-[#d4af37] hover:text-black">
              SEND MESSAGE →
              <Send size={17} className="transition group-hover:translate-x-1" aria-hidden="true" />
            </button>

            {status && <p className="text-sm text-[#d4af37]">{status}</p>}
            {error && <p className="text-sm text-[#f8f1df]">{error}</p>}
          </form>

          <div className="mt-8 border-t border-white/10 pt-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4af37]">Connect Through</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {connectLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs text-[#f8f1df]/80 transition hover:border-[#d4af37]/70 hover:text-[#d4af37]"
                >
                  {item.label}: {item.value}
                </a>
              ))}
            </div>
          </div>

          {savedMessages.length > 0 && (
            <div className="mt-7 border-t border-white/10 pt-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f8f1df]/70">
                  Saved Messages ({savedMessages.length})
                </h2>
                <button
                  type="button"
                  onClick={clearMessages}
                  className="inline-flex items-center gap-2 text-xs text-[#d4af37] transition hover:text-[#f8f1df]"
                >
                  <Trash2 size={14} aria-hidden="true" />
                  Clear Messages
                </button>
              </div>
              <div className="mt-4 space-y-3">
                {savedMessages.slice(0, 2).map((message) => (
                  <article key={`${message.email}-${message.submittedAt}`} className="border-l border-[#d4af37]/50 pl-4">
                    <p className="text-sm text-[#f8f1df]">{message.name}</p>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#f8f1df]/60">{message.message}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function ContactField({ label, icon: Icon, children }) {
  return (
    <label className="grid gap-2 text-sm text-[#f8f1df]/80">
      <span className="flex items-center gap-2">
        <Icon size={15} className="text-[#d4af37]" aria-hidden="true" />
        {label}
      </span>
      {children}
    </label>
  )
}
