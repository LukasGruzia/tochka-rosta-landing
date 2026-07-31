import type { RhythmState } from '../config/rhythmAssets'
import { RhythmCharacter } from './RhythmCharacter'

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
      <RhythmCharacter state={state} size="tiny" animated={false} decorative />
      <div>
        <span>{eyebrow}</span>
        <p>{message}</p>
      </div>
      {action && <button type="button">{action}</button>}
    </div>
  )
}
