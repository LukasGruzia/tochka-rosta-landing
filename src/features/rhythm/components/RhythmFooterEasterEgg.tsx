import { useState } from 'react'
import { RhythmStage } from './RhythmStage'

export function RhythmFooterEasterEgg() {
  const [active, setActive] = useState(false)

  return (
    <button
      type="button"
      className={`rhythm-footer-egg ${active ? 'is-active' : ''}`}
      aria-label="Сообщение от Ритма"
      onClick={() => setActive((value) => !value)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <RhythmStage state="supportive" size="small" animated decorative />
      <span>Увидимся в Потоке.</span>
    </button>
  )
}
