import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import logoMain from '../assets/brand/logo-main.png'
import { useIsMobile } from '../hooks/useIsMobile'
import '../styles/cinematic-shell.css'

export type StoryChapter = {
  id: string
  number: string
  label: string
}

const DEFAULT_STORY_CHAPTERS: StoryChapter[] = [
  { id: 'concept', number: '01', label: 'Концепция' },
  { id: 'solution', number: '02', label: 'Решение' },
  { id: 'implementation', number: '03', label: 'Как это работает' },
  { id: 'ecosystem', number: '04', label: 'Экосистема' },
  { id: 'location', number: '05', label: 'Локация' },
  { id: 'qr', number: '06', label: 'QR-сценарий' },
  { id: 'app', number: '07', label: 'Приложение' },
  { id: 'rhythm', number: '08', label: 'Ритм' },
  { id: 'food', number: '09', label: 'Блюда' },
  { id: 'flow', number: '10', label: 'Поток' },
  { id: 'final', number: '11', label: 'Баланс' },
]

type BrandPreloaderProps = {
  /** Invoked after the overlay has completely left the viewport. */
  onComplete?: () => void
  /** Time before the short exit transition starts. Kept below one second. */
  holdMs?: number
}

/**
 * Short, self-removing brand reveal. The default timing is about 1.25 seconds,
 * including the exit transition.
 */
export function BrandPreloader({ onComplete, holdMs = 900 }: BrandPreloaderProps) {
  const reduceMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const lightMotion = Boolean(reduceMotion) || isMobile
  const [visible, setVisible] = useState(true)
  const callbackRef = useRef(onComplete)
  const hasCompleted = useRef(false)

  useEffect(() => {
    callbackRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    const safeHold = reduceMotion ? 80 : isMobile ? 340 : Math.min(Math.max(holdMs, 500), 980)
    const timer = window.setTimeout(() => setVisible(false), safeHold)
    return () => window.clearTimeout(timer)
  }, [holdMs, isMobile, reduceMotion])

  useEffect(() => {
    if (!visible) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [visible])

  const handleExitComplete = useCallback(() => {
    if (hasCompleted.current) return
    hasCompleted.current = true
    callbackRef.current?.()
  }, [])

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          className="cinematic-preloader"
          role="status"
          aria-live="polite"
          aria-label="Точка Роста. Сила в балансе"
          initial={lightMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: lightMotion ? 0.16 : 0.32, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="cinematic-preloader__grid" aria-hidden="true" />
          <motion.div
            className="cinematic-preloader__brand"
            initial={lightMotion ? false : { opacity: 0, scale: 0.9, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: lightMotion ? 0 : 0.62, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cinematic-preloader__orbit" aria-hidden="true">
              <span />
              <i />
            </div>
            <img src={logoMain} decoding="async" fetchPriority="high" alt="" />
          </motion.div>
          <motion.p
            initial={lightMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: lightMotion ? 0 : 0.48, delay: lightMotion ? 0 : 0.2 }}
          >
            Сила в балансе
          </motion.p>
          <span className="cinematic-preloader__signal" aria-hidden="true" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

type ScrollStoryProgressProps = {
  chapters?: StoryChapter[]
  className?: string
}

export function ScrollStoryProgress({
  chapters = DEFAULT_STORY_CHAPTERS,
  className = '',
}: ScrollStoryProgressProps) {
  const reduceMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const [activeId, setActiveId] = useState(chapters[0]?.id ?? '')
  const navRef = useRef<HTMLElement>(null)
  const activeLockRef = useRef<{ id: string; until: number } | null>(null)
  const chapterIds = useMemo(() => chapters.map(({ id }) => id).join('|'), [chapters])

  useEffect(() => {
    if (isMobile) return undefined

    const existingSections = chapterIds
      .split('|')
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (!existingSections.length) return undefined
    let frame = 0

    const updateActiveChapter = () => {
      frame = 0
      const activeLock = activeLockRef.current
      if (activeLock && performance.now() < activeLock.until) {
        setActiveId(activeLock.id)
        return
      }
      activeLockRef.current = null

      const anchor = window.innerHeight * 0.42
      const reachedChapters = existingSections.filter((section) => section.getBoundingClientRect().top <= anchor)
      const currentChapter = reachedChapters.at(-1) ?? existingSections[0]

      setActiveId(currentChapter.id)
    }

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveChapter)
    }

    updateActiveChapter()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [chapterIds, isMobile])

  const activeIndex = Math.max(0, chapters.findIndex(({ id }) => id === activeId))
  const progress = chapters.length > 1 ? activeIndex / (chapters.length - 1) : 1

  const goToChapter = (id: string) => {
    const section = document.getElementById(id)
    if (!section) return
    setActiveId(id)
    activeLockRef.current = reduceMotion ? null : { id, until: performance.now() + 800 }
    section.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  const handleMouseMove = (event: ReactMouseEvent<HTMLElement>) => {
    const nav = navRef.current
    if (!nav) return
    const rect = nav.getBoundingClientRect()
    nav.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`)
    nav.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`)
    nav.style.setProperty('--mouse-glow-opacity', '1')
  }

  const setGlowVisibility = (visible: boolean) => {
    navRef.current?.style.setProperty('--mouse-glow-opacity', visible ? '1' : '0')
  }

  if (!chapters.length || isMobile) return null

  return (
    <>
      <nav
        ref={navRef}
        className={`story-progress ${className}`.trim()}
        aria-label="Навигация по истории"
        onMouseEnter={() => setGlowVisibility(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setGlowVisibility(false)}
      >
        <div className="story-progress__rail" aria-hidden="true">
          <motion.i
            initial={false}
            animate={{ scaleY: progress }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <ol>
          {chapters.map((chapter, index) => {
            const isActive = chapter.id === activeId
            const isPassed = index < activeIndex
            return (
              <li key={chapter.id}>
                <button
                  type="button"
                  className={isActive ? 'is-active' : isPassed ? 'is-passed' : ''}
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`${chapter.number}. ${chapter.label}`}
                  onClick={() => goToChapter(chapter.id)}
                >
                  {isActive && (
                    <motion.span
                      className="story-progress__active-surface"
                      layoutId="story-progress-active-surface"
                      aria-hidden="true"
                      transition={reduceMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 320, damping: 34, mass: 0.72 }}
                    />
                  )}
                  <span className="story-progress__dot" aria-hidden="true" />
                  <span className="story-progress__number">{chapter.number}</span>
                  <span className="story-progress__label">{chapter.label}</span>
                </button>
              </li>
            )
          })}
        </ol>
      </nav>

      <div className="story-progress-mobile" aria-hidden="true">
        <span>{chapters[activeIndex]?.number ?? chapters[0].number}</span>
        <i><b style={{ transform: `scaleX(${progress})` }} /></i>
        <span>{chapters.at(-1)?.number}</span>
      </div>
    </>
  )
}
