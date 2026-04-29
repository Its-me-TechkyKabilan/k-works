import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { menuItems } from '../data/menu.js'

export default function FullscreenMenu({ isOpen, onClose }) {
  const [hovered, setHovered] = useState(menuItems[0])
  const location = useLocation()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          className="fixed inset-0 z-40 overflow-hidden bg-[#030303] text-[#f8f1df]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[28vw_1fr]">
            <section className="relative z-10 flex h-screen min-h-0 flex-col bg-[#050505]/92 px-6 pb-7 pt-24 shadow-2xl shadow-black/40 backdrop-blur-xl sm:px-8 lg:px-7">
              <motion.div
                className="min-h-0 flex-1 overflow-y-auto pr-2 [scrollbar-width:thin] [scrollbar-color:rgba(212,175,55,0.45)_rgba(255,255,255,0.08)]"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } },
                }}
              >
                {menuItems.map((item) => {
                  const dimmed = hovered.route !== item.route
                  const active = location.pathname === item.route

                  return (
                    <motion.div
                      key={item.route}
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.38, ease: 'easeOut' }}
                      onMouseEnter={() => setHovered(item)}
                      onFocus={() => setHovered(item)}
                    >
                      <Link
                        to={item.route}
                        onClick={onClose}
                        className={`group flex items-center gap-3 border-b border-white/10 py-2.5 transition duration-300 sm:py-3 ${
                          dimmed ? 'text-[#f8f1df]/48 hover:text-[#f8f1df]' : 'text-[#f8f1df]'
                        }`}
                      >
                        <span className="w-8 flex-none text-[0.68rem] text-[#d4af37] sm:w-10">{item.number}</span>
                        <span className="font-serif text-2xl leading-tight sm:text-3xl lg:text-[2.05rem] xl:text-[2.25rem]">{item.label}</span>
                        <ArrowUpRight
                          className={`ml-auto flex-none transition ${active ? 'text-[#d4af37]' : 'text-[#f8f1df]/35 group-hover:text-[#d4af37]'}`}
                          size={18}
                          aria-hidden="true"
                        />
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.div>
            </section>

            <section className="relative hidden min-h-screen overflow-hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.img
                  key={hovered.route}
                  src={hovered.previewImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.025 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-black/15" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(212,175,55,0.14),transparent_24%),linear-gradient(90deg,rgba(3,3,3,0.08),rgba(3,3,3,0.02)_42%,rgba(3,3,3,0.18))]" />

              <div className="absolute bottom-12 left-12 max-w-xl">
                <motion.div
                  key={hovered.route}
                  className="border-l border-[#d4af37]/70 bg-black/10 py-2 pl-6 pr-4 backdrop-blur-[2px]"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                >
                  <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#d4af37]">{hovered.number}</p>
                  <h2 className="font-serif text-5xl text-white [text-shadow:0_4px_24px_rgba(0,0,0,0.6)]">{hovered.label}</h2>
                  <p className="mt-5 text-lg leading-8 text-[#f8f1df] [text-shadow:0_3px_20px_rgba(0,0,0,0.72)]">{hovered.description}</p>
                </motion.div>
              </div>
            </section>

            <section className="relative min-h-screen overflow-hidden lg:hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={hovered.route}
                  src={hovered.previewImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-75"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.75, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.025 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-black/20" />
              <motion.div
                key={hovered.route}
                className="absolute inset-x-6 bottom-8 border-l border-[#d4af37]/70 pl-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, ease: 'easeOut' }}
              >
                <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#d4af37]">{hovered.number}</p>
                <h2 className="font-serif text-4xl text-white">{hovered.label}</h2>
                <p className="mt-3 text-base leading-7 text-[#f8f1df]">{hovered.description}</p>
              </motion.div>
            </section>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
