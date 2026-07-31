import type { ReactNode } from 'react'
import { RhythmCharacter, type RhythmCharacterProps } from './RhythmCharacter'

export type RhythmStageProps = RhythmCharacterProps & {
  orbit?: boolean
  children?: ReactNode
  className?: string
  characterClassName?: string
}

export function RhythmStage({
  orbit = false,
  children,
  className = '',
  characterClassName = '',
  size = 'medium',
  ...characterProps
}: RhythmStageProps) {
  return (
    <div className={`rhythm-stage rhythm-stage--${size} ${orbit ? 'rhythm-stage--orbit' : ''} ${className}`.trim()}>
      {orbit && <span className="rhythm-stage__orbit" aria-hidden="true" />}
      <span className="rhythm-stage__glow" aria-hidden="true" />
      <span className="rhythm-stage__shadow" aria-hidden="true" />
      <RhythmCharacter {...characterProps} size={size} className={characterClassName} />
      {children && <div className="rhythm-stage__message">{children}</div>}
    </div>
  )
}

export default RhythmStage
