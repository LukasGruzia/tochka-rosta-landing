import { useState } from 'react'
import { RhythmCharacter } from './RhythmCharacter'

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
      <RhythmCharacter state="supportive" size="small" animated decorative />
      <span>Увидимся в Потоке.</span>
    </button>
  )
}
