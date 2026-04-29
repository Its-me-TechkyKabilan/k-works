import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { site } from '../data/site.js'

// Adjust this total duration to make the full preloader shorter or longer.
const TOTAL_DURATION_MS = 5800
const FADE_OUT_DURATION_SECONDS = 0.7
const CAMERA_DRAW_DELAY_SECONDS = 0.55
const CAMERA_DRAW_DURATION_SECONDS = 1.45

// Time before transition: source wordmark stays readable before "abilan" dissolves.
const WORDMARK_TRANSITION_DELAY_SECONDS = 3.15
// Pixel fade duration: controls how quickly the middle letters dissolve.
const PIXEL_FADE_DURATION_SECONDS = 1
// Closing movement distance: this width collapses so "K" and " - Works" meet.
const MIDDLE_WORD_WIDTH_EM = 3.95

export default function Preloader({ onComplete }) {
  const navigate = useNavigate()

  useEffect(() => {
    const completeTimer = window.setTimeout(() => {
      navigate('/', { replace: true })
      onComplete()
    }, TOTAL_DURATION_MS)

    return () => window.clearTimeout(completeTimer)
  }, [navigate, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#030303] text-[#f8f1df]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: FADE_OUT_DURATION_SECONDS, ease: 'easeInOut' } }}
    >
      <style>
        {`
          @keyframes kworksPixelDissolve {
            0% {
              opacity: 1;
              filter: blur(0);
              clip-path: inset(0 0 0 0);
              text-shadow: 0 0 18px rgba(248, 241, 223, 0.24);
              -webkit-mask-image: linear-gradient(#000, #000);
              mask-image: linear-gradient(#000, #000);
            }

            38% {
              opacity: 0.82;
              filter: blur(0.4px);
              clip-path: inset(0 10% 0 10%);
              text-shadow:
                1px 0 rgba(212, 175, 55, 0.55),
                -1px 1px rgba(248, 241, 223, 0.32);
              -webkit-mask-image: repeating-linear-gradient(90deg, #000 0 5px, transparent 5px 7px);
              mask-image: repeating-linear-gradient(90deg, #000 0 5px, transparent 5px 7px);
            }

            68% {
              opacity: 0.38;
              filter: blur(1px);
              clip-path: inset(0 26% 0 26%);
              text-shadow:
                2px 0 rgba(212, 175, 55, 0.45),
                -2px 2px rgba(248, 241, 223, 0.22),
                0 -2px rgba(212, 175, 55, 0.24);
              -webkit-mask-image: repeating-linear-gradient(0deg, #000 0 4px, transparent 4px 7px);
              mask-image: repeating-linear-gradient(0deg, #000 0 4px, transparent 4px 7px);
            }

            100% {
              opacity: 0;
              filter: blur(1.8px);
              clip-path: inset(0 48% 0 48%);
              text-shadow:
                3px 1px rgba(212, 175, 55, 0.2),
                -3px -1px rgba(248, 241, 223, 0.14);
              -webkit-mask-image: repeating-linear-gradient(90deg, #000 0 3px, transparent 3px 8px);
              mask-image: repeating-linear-gradient(90deg, #000 0 3px, transparent 3px 8px);
            }
          }

          .kworks-middle-dissolve {
            animation-name: kworksPixelDissolve;
            animation-fill-mode: forwards;
            animation-timing-function: steps(8, end);
          }
        `}
      </style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(212,175,55,0.12),transparent_28%),radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.28)_54%,rgba(0,0,0,0.82)_100%),linear-gradient(135deg,#020202,#111111_48%,#040404)]" />
      <div className="preloader-grain absolute inset-0" />

      <motion.div
        className="absolute h-[34rem] w-[34rem] rounded-full border border-[#d4af37]/10"
        animate={{ scale: [0.92, 1.04, 0.96], opacity: [0.18, 0.38, 0.22] }}
        transition={{ duration: 5.4, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative flex w-full max-w-4xl flex-col items-center px-6 text-center"
        initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
      >
        <CameraEmblem />

        <motion.div
          className="mt-9"
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 1.75, duration: 0.9, ease: 'easeOut' }}
        >
          <AnimatedWordmark />
        </motion.div>

        <motion.p
          className="mt-7 text-xs uppercase tracking-[0.35em] text-[#d4af37] drop-shadow-[0_0_18px_rgba(212,175,55,0.36)] sm:text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.2, duration: 0.85, ease: 'easeOut' }}
        >
          {site.tagline}
        </motion.p>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute h-[24rem] w-[24rem] rounded-full bg-[#d4af37]/10 blur-3xl"
        initial={{ opacity: 0, scale: 0.72 }}
        animate={{ opacity: [0, 0.26, 0], scale: [0.72, 1.05, 1.18] }}
        transition={{ delay: 3.55, duration: 1.25, ease: 'easeOut' }}
      />
    </motion.div>
  )
}

function AnimatedWordmark() {
  return (
    <h1
      aria-label="K - Works"
      className="whitespace-nowrap font-serif text-3xl leading-none tracking-[0.2em] text-[#f8f1df] drop-shadow-[0_0_26px_rgba(248,241,223,0.22)] sm:text-5xl md:text-6xl lg:text-7xl"
    >
      <span className="inline-flex items-center justify-center whitespace-nowrap leading-none">
        <span className="inline-block leading-none">K</span>
        <motion.span
          aria-hidden="true"
          className="inline-flex h-[1em] flex-none items-center justify-center overflow-hidden whitespace-nowrap align-middle leading-none"
          initial={{ width: `${MIDDLE_WORD_WIDTH_EM}em` }}
          animate={{ width: '0em' }}
          transition={{
            delay: WORDMARK_TRANSITION_DELAY_SECONDS,
            duration: PIXEL_FADE_DURATION_SECONDS,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span
            className="kworks-middle-dissolve inline-block flex-none whitespace-nowrap leading-none"
            style={{
              animationDelay: `${WORDMARK_TRANSITION_DELAY_SECONDS}s`,
              animationDuration: `${PIXEL_FADE_DURATION_SECONDS}s`,
              minWidth: `${MIDDLE_WORD_WIDTH_EM}em`,
            }}
          >
            abilan
          </span>
        </motion.span>
        <span className="inline-block leading-none text-[#f8f1df]"> - Works</span>
      </span>
    </h1>
  )
}

function CameraEmblem() {
  const drawTransition = {
    duration: CAMERA_DRAW_DURATION_SECONDS,
    delay: CAMERA_DRAW_DELAY_SECONDS,
    ease: 'easeInOut',
  }

  return (
    <motion.svg
      width="220"
      height="158"
      viewBox="0 0 220 158"
      fill="none"
      aria-label="K-Works camera emblem"
      className="w-[11rem] max-w-[66vw] drop-shadow-[0_0_28px_rgba(212,175,55,0.45)] sm:w-[13.5rem]"
    >
      <defs>
        <linearGradient id="cleanCameraGold" x1="24" y1="16" x2="196" y2="142" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f2d98a" />
          <stop offset="0.5" stopColor="#d4af37" />
          <stop offset="1" stopColor="#8f6e1f" />
        </linearGradient>
      </defs>

      <motion.path
        d="M33 55h36l12-18h58l12 18h36c9.4 0 17 7.6 17 17v47c0 9.4-7.6 17-17 17H33c-9.4 0-17-7.6-17-17V72c0-9.4 7.6-17 17-17Z"
        stroke="url(#cleanCameraGold)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0.2 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={drawTransition}
      />
      <motion.path
        d="M72 55 84 30h52l12 25M43 44h26M154 39h27v16"
        stroke="url(#cleanCameraGold)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.9 }}
        transition={{ ...drawTransition, delay: CAMERA_DRAW_DELAY_SECONDS + 0.18 }}
      />
      <motion.rect
        x="36"
        y="72"
        width="34"
        height="18"
        rx="4"
        stroke="#f8f1df"
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.72 }}
        transition={{ ...drawTransition, delay: CAMERA_DRAW_DELAY_SECONDS + 0.35 }}
      />
      <motion.circle
        cx="110"
        cy="92"
        r="39"
        stroke="url(#cleanCameraGold)"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ ...drawTransition, delay: CAMERA_DRAW_DELAY_SECONDS + 0.24 }}
      />
      <motion.circle
        cx="110"
        cy="92"
        r="27"
        stroke="#f8f1df"
        strokeWidth="1.35"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ ...drawTransition, delay: CAMERA_DRAW_DELAY_SECONDS + 0.42 }}
      />
      <motion.circle
        cx="110"
        cy="92"
        r="38"
        stroke="#d4af37"
        strokeWidth="1"
        initial={{ opacity: 0.08, r: 36 }}
        animate={{ opacity: [0.08, 0.28, 0.1], r: [36, 40, 37] }}
        transition={{ delay: 2.2, duration: 2.2, ease: 'easeInOut' }}
      />
    </motion.svg>
  )
}
