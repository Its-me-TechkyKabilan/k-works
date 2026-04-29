import { useEffect, useMemo, useState } from 'react'
import { Filter, Search } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import GalleryGrid from '../components/GalleryGrid.jsx'
import ImageModal from '../components/ImageModal.jsx'
import { galleryCategories, galleryItems } from '../data/gallery.js'

export default function VisualArchive() {
  const [searchParams] = useSearchParams()
  const [uploadedItems, setUploadedItems] = useState([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    try {
      // Static gallery data comes from src/data/gallery.js.
      // Demo uploaded images may come from localStorage.
      // A backend API can later replace both the static file and demo browser storage.
      const currentUploads = JSON.parse(window.localStorage.getItem('kworks_gallery_uploads') || '[]')
      const legacyUploads = JSON.parse(window.localStorage.getItem('kworksUploads') || '[]')
      const normalizedUploads = [...currentUploads, ...legacyUploads].map((item, index) => ({
        id: item.id || `upload-${index}`,
        title: item.title || 'Uploaded Visual',
        category: item.category || 'Random Dumps',
        location: item.location || 'Personal Archive',
        device: item.device || 'Unknown Device',
        caption: item.caption || 'Uploaded into K-Works.',
        date: item.date || 'Demo Upload',
        image: item.image || item.src,
        src: item.src || item.image,
      }))

      setUploadedItems(normalizedUploads.filter((item) => item.image || item.src))
    } catch {
      setUploadedItems([])
    }
  }, [])

  const allItems = useMemo(() => [...uploadedItems, ...galleryItems], [uploadedItems])
  const categories = ['All', ...galleryCategories]

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    if (!categoryFromUrl) {
      setCategory('All')
      return
    }

    setCategory(galleryCategories.includes(categoryFromUrl) ? categoryFromUrl : 'All')
  }, [searchParams])

  const filteredItems = useMemo(() => {
    const searchText = query.trim().toLowerCase()

    return allItems.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category
      const haystack = `${item.title} ${item.category} ${item.location} ${item.device} ${item.caption}`.toLowerCase()
      return matchesCategory && (!searchText || haystack.includes(searchText))
    })
  }, [allItems, category, query])

  const selectedIndex = selectedImage ? filteredItems.findIndex((item) => item.id === selectedImage.id) : -1
  const showPreviousImage = () => {
    if (selectedIndex < 0 || !filteredItems.length) return
    setSelectedImage(filteredItems[(selectedIndex - 1 + filteredItems.length) % filteredItems.length])
  }
  const showNextImage = () => {
    if (selectedIndex < 0 || !filteredItems.length) return
    setSelectedImage(filteredItems[(selectedIndex + 1) % filteredItems.length])
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030303] text-[#f8f1df]">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_78%_14%,rgba(212,175,55,0.12),transparent_26%),linear-gradient(135deg,#030303,#111111_52%,#030303)]" />

      <section className="page-shell relative z-10 pb-10 pt-28 sm:pt-32">
        <div className="max-w-5xl">
          <p className="kicker">Master Gallery</p>
          <h1 className="mt-5 font-serif text-6xl uppercase leading-none text-[#f8f1df] sm:text-8xl lg:text-[8.5rem]">
            VISUAL ARCHIVE
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f8f1df]/70">
            A complete archive of captured moments, edits, memories, and visual stories inside K-Works.
          </p>
        </div>
      </section>

      <section className="page-shell relative z-10 pb-8">
        <div className="glass-panel grid gap-4 p-4 lg:grid-cols-[1fr_auto]">
          <label className="field-shell">
            <Search size={18} aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, place, device, caption..." />
          </label>

          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter size={18} className="flex-none text-[#d4af37]" aria-hidden="true" />
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`filter-pill ${category === item ? 'filter-pill-active' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell relative z-10 pb-16">
        <GalleryGrid items={filteredItems} onSelect={setSelectedImage} />
      </section>

      <section className="page-shell relative z-10 pb-24">
        <div className="rounded-2xl border border-[#d4af37]/25 bg-black/30 p-6 text-center shadow-2xl shadow-black/25 backdrop-blur-xl">
          <p className="mx-auto max-w-3xl font-serif text-xl leading-8 text-[#f8f1df]/80">
            The Visual Archive will continue to grow as K-Works collects more frames, edits, stories, and everyday visual
            memories.
          </p>
        </div>
      </section>

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        onPrevious={showPreviousImage}
        onNext={showNextImage}
        hasNavigation={filteredItems.length > 1}
      />
    </main>
  )
}
