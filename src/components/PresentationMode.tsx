import { useEffect, useState } from 'react'
import '../styles/user-journey-demo.css'

type PresentationModeProps = {
  active: boolean
  isMobile: boolean
  onExit: () => void
}

const presentationScreens = [
  { id: 'top', label: 'Hero' },
  { id: 'concept', label: 'Проблема' },
  { id: 'solution', label: 'Решение' },
  { id: 'food', label: 'Полезная еда' },
  { id: 'app', label: 'Приложение' },
  { id: 'qr', label: 'QR-сценарий' },
  { id: 'location', label: 'Локация' },
  { id: 'flow', label: 'Поток / финал' },
] as const

export function PresentationMode({ active, isMobile, onExit }: PresentationModeProps) {
  const [screenIndex, setScreenIndex] = useState(0)

  useEffect(() => {
    if (!active || isMobile) return undefined

    document.body.classList.add('presentation-mode')
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()

    const goTo = (nextIndex: number) => {
      const boundedIndex = Math.max(0, Math.min(presentationScreens.length - 1, nextIndex))
      setScreenIndex(boundedIndex)
      document.getElementById(presentationScreens[boundedIndex].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    goTo(0)

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null

      if (event.key === 'Escape') {
        event.preventDefault()
        onExit()
        return
      }

      if (target?.matches('input, textarea, select')) return
      if (target?.matches('button') && event.key === ' ') return

      if (event.key === 'ArrowDown' || event.key === ' ' || event.key === 'PageDown') {
        event.preventDefault()
        setScreenIndex((current) => {
          const next = Math.min(presentationScreens.length - 1, current + 1)
          document.getElementById(presentationScreens[next].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return next
        })
      }

      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault()
        setScreenIndex((current) => {
          const next = Math.max(0, current - 1)
          document.getElementById(presentationScreens[next].id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return next
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.classList.remove('presentation-mode')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [active, isMobile, onExit])

  if (!active || isMobile) return null

  return (
    <aside className="presentation-hud" aria-live="polite">
      <div>
        <small>Режим презентации</small>
        <strong>{presentationScreens[screenIndex].label}</strong>
      </div>
      <span>{String(screenIndex + 1).padStart(2, '0')} / {String(presentationScreens.length).padStart(2, '0')}</span>
      <button type="button" onClick={onExit}>Выйти <kbd>Esc</kbd></button>
    </aside>
  )
}

export default PresentationMode
