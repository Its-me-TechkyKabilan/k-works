import { motion } from 'framer-motion'

export default function PageTitle({ eyebrow, title, description }) {
  return (
    <section className="page-shell pb-10 pt-28 sm:pt-32">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-4xl"
      >
        {eyebrow && <p className="kicker">{eyebrow}</p>}
        <h1 className="mt-4 font-serif text-5xl leading-none text-[#f8f1df] sm:text-7xl lg:text-8xl">{title}</h1>
        {description && <p className="mt-6 max-w-2xl text-lg leading-8 text-[#f8f1df]/70">{description}</p>}
      </motion.div>
    </section>
  )
}
