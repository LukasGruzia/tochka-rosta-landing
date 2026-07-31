import type { RhythmState } from '../config/rhythmAssets'
import { RhythmStage } from './RhythmStage'

type RhythmMessageCardProps = {
  message: string
  state?: RhythmState
  eyebrow?: string
  action?: string
  className?: string
}

export function RhythmMessageCard({ message, state = 'supportive', eyebrow = 'Ритм · сейчас', action, className = '' }: RhythmMessageCardProps) {
  return (
    <div className={`rhythm-message-glass ${className}`.trim()}>
      <RhythmStage state={state} size="tiny" animated={false} decorative />
      <div>
        <span>{eyebrow}</span>
        <p>{message}</p>
      </div>
      {action && <button type="button">{action}</button>}
    </div>
  )
}
