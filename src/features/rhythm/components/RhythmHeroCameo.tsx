import { useState } from 'react'
import { RhythmStage } from './RhythmStage'

export function RhythmHeroCameo() {
  const [active, setActive] = useState(false)

  return (
    <button
      className={`rhythm-hero-cameo ${active ? 'is-active' : ''}`}
      type="button"
      aria-label="Познакомиться с помощником Ритмом"
      onClick={() => setActive((value) => !value)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <RhythmStage state="supportive" size="small" loading="eager" decorative />
      <span>Ритм рядом</span>
      <p>Помогу выбрать следующий шаг.</p>
    </button>
  )
}
