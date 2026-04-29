import { forwardRef, useEffect, useRef } from 'react'

// Adjust this value to control image travel speed. Lower duration = faster scroll.
const IMAGE_TRAVEL_DURATION_SECONDS = 20

// Pause duration after manual scroll.
const MANUAL_PAUSE_MS = 700

// Adjust manual wheel/touch sensitivity here.
const MANUAL_SCROLL_MULTIPLIER = 0.86

export default function VerticalImageReel({ images }) {
  const trackRef = useRef(null)
  const sequenceRef = useRef(null)
  const sequenceHeightRef = useRef(0)
  const offsetRef = useRef(0)
  const autoDirectionRef = useRef(1)
  const pauseUntilRef = useRef(0)
  const lastFrameTimeRef = useRef(0)
  const lastTouchYRef = useRef(null)
  const animationFrameRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    const sequence = sequenceRef.current
    if (!track || !sequence) return undefined

    const wrapOffset = (value) => {
      const height = sequenceHeightRef.current
      if (!height) return value
      return ((value % height) + height) % height
    }

    const applyTransform = () => {
      track.style.transform = `translate3d(0, ${-offsetRef.current}px, 0)`
    }

    const getAutoScrollSpeed = () => {
      const frameHeight = sequence.firstElementChild?.offsetHeight || window.innerHeight
      return (frameHeight + window.innerHeight) / IMAGE_TRAVEL_DURATION_SECONDS
    }

    const measure = () => {
      sequenceHeightRef.current = sequence.scrollHeight
      offsetRef.current = wrapOffset(offsetRef.current)
      applyTransform()
    }

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(sequence)
    measure()

    const step = (time) => {
      if (!lastFrameTimeRef.current) lastFrameTimeRef.current = time
      const deltaSeconds = Math.min((time - lastFrameTimeRef.current) / 1000, 0.08)
      lastFrameTimeRef.current = time

      if (time > pauseUntilRef.current && sequenceHeightRef.current) {
        offsetRef.current = wrapOffset(offsetRef.current + getAutoScrollSpeed() * autoDirectionRef.current * deltaSeconds)
        applyTransform()
      }

      animationFrameRef.current = window.requestAnimationFrame(step)
    }

    animationFrameRef.current = window.requestAnimationFrame(step)

    return () => {
      window.cancelAnimationFrame(animationFrameRef.current)
      resizeObserver.disconnect()
    }
  }, [])

  const moveReel = (delta) => {
    const height = sequenceHeightRef.current
    if (!height) return

    // Direction logic:
    // positive delta moves the image reel bottom-to-top, negative delta moves it top-to-bottom.
    autoDirectionRef.current = delta >= 0 ? 1 : -1
    pauseUntilRef.current = performance.now() + MANUAL_PAUSE_MS
    offsetRef.current = ((offsetRef.current + delta * MANUAL_SCROLL_MULTIPLIER) % height + height) % height

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(0, ${-offsetRef.current}px, 0)`
    }
  }

  const handleWheel = (event) => {
    event.preventDefault()
    moveReel(event.deltaY)
  }

  const handleTouchStart = (event) => {
    lastTouchYRef.current = event.touches[0]?.clientY ?? null
  }

  const handleTouchMove = (event) => {
    const currentY = event.touches[0]?.clientY
    if (currentY == null || lastTouchYRef.current == null) return

    event.preventDefault()
    const delta = lastTouchYRef.current - currentY
    lastTouchYRef.current = currentY
    moveReel(delta)
  }

  return (
    <div
      className="home-reel"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div ref={trackRef} className="home-reel-track">
        <ImageSequence ref={sequenceRef} images={images} sequenceId="primary" />
        <ImageSequence images={images} sequenceId="duplicate" />
      </div>
    </div>
  )
}

const ImageSequence = forwardRef(function ImageSequence({ images, sequenceId }, ref) {
  return (
    <div ref={ref} className="home-reel-sequence">
      {images.map((item, index) => (
        <figure key={`${sequenceId}-${item.id}-${index}`} className="home-reel-frame">
          {/* Adjust image sizing in the .home-reel-frame and .home-reel-image CSS classes. */}
          <img src={item.src} alt="" className="home-reel-image" draggable="false" loading={index < 2 ? 'eager' : 'lazy'} />
        </figure>
      ))}
    </div>
  )
})
