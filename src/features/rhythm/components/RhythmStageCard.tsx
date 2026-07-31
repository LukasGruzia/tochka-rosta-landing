import type { RhythmStage } from '../config/rhythmContent'

type RhythmStageCardProps = {
  stage: RhythmStage
  index: number
  active: boolean
  register: (node: HTMLElement | null) => void
  onActivate: () => void
}

export function RhythmStageCard({ stage, index, active, register, onActivate }: RhythmStageCardProps) {
  return (
    <article
      ref={register}
      className={`rhythm-stage-glass ${active ? 'is-active' : ''}`}
      data-rhythm-index={index}
      tabIndex={0}
      role="button"
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onActivate()
        }
      }}
      aria-current={active ? 'step' : undefined}
    >
      <span>{stage.number}</span>
      <div>
        <small>{stage.label}</small>
        <h3>{stage.title}</h3>
        <p>{stage.text}</p>
      </div>
      <i aria-hidden="true" />
    </article>
  )
}
