import { useRef, type CSSProperties, type MouseEvent } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { getRhythmCompactAsset, rhythmAssets, type RhythmState } from '../config/rhythmAssets'
import { rhythmLayout } from '../config/rhythmLayout'

export type RhythmCharacterProps = {
  state?: RhythmState
  size?: 'tiny' | 'small' | 'medium' | 'large'
  animated?: boolean
  decorative?: boolean
  loading?: 'eager' | 'lazy'
  className?: string
}

const stateLabels: Record<RhythmState, string> = {
  idle: 'Ритм спокойно приветствует пользователя',
  thinking: 'Ритм анализирует дневной баланс',
  happy: 'Ритм радуется прогрессу',
  motivated: 'Ритм поддерживает движение к цели',
  caring: 'Ритм проявляет заботу',
  surprised: 'Ритм показывает удивление',
  supportive: 'Ритм поддерживает пользователя',
  advice: 'Ритм предлагает следующий шаг',
  food: 'Ритм предлагает подходящее блюдо',
  activity: 'Ритм поддерживает активность',
  celebrating: 'Ритм отмечает новый этап',
  sleeping: 'Ритм отдыхает',
}

export function RhythmCharacter({
  state = 'idle',
  size = 'medium',
  animated = true,
  decorative = false,
  loading = 'lazy',
  className = '',
}: RhythmCharacterProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)
  const reduceMotion = Boolean(useReducedMotion())
  const isInView = useInView(rootRef, { once: false, amount: 0.16, margin: '80px 0px 80px 0px' })
  const canAnimate = animated && isInView && !reduceMotion
  const imageSizes = size === 'tiny' ? '72px' : size === 'small' ? '170px' : size === 'medium' ? '360px' : '(max-width: 700px) 310px, 540px'
  const layout = rhythmLayout[state]
  const layoutStyle = {
    '--rhythm-offset-x': `${layout.offsetX}px`,
    '--rhythm-offset-y': `${layout.offsetY}px`,
    '--rhythm-state-scale': layout.scale,
  } as CSSProperties

  const handlePointerMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!window.matchMedia('(pointer: fine)').matches || reduceMotion) return
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    const { clientX, clientY, currentTarget } = event
    frameRef.current = requestAnimationFrame(() => {
      const bounds = currentTarget.getBoundingClientRect()
      const x = Math.max(-1, Math.min(1, (clientX - bounds.left) / bounds.width * 2 - 1))
      const y = Math.max(-1, Math.min(1, (clientY - bounds.top) / bounds.height * 2 - 1))
      currentTarget.style.setProperty('--rhythm-look-x', `${x * 4}px`)
      currentTarget.style.setProperty('--rhythm-look-y', `${y * 2.5}px`)
      currentTarget.style.setProperty('--rhythm-look-r', `${x * 0.7}deg`)
    })
  }

  const resetPointer = () => {
    const node = rootRef.current
    if (!node) return
    node.style.setProperty('--rhythm-look-x', '0px')
    node.style.setProperty('--rhythm-look-y', '0px')
    node.style.setProperty('--rhythm-look-r', '0deg')
  }

  return (
    <div
      ref={rootRef}
      className={`rhythm-character rhythm-character--${size} rhythm-character--${state} ${canAnimate ? 'is-animated' : ''} ${className}`.trim()}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : stateLabels[state]}
      aria-hidden={decorative || undefined}
      style={layoutStyle}
    >
      <div className="rhythm-character__position-layer">
        <div className="rhythm-character__pointer-layer">
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              className="rhythm-character__image-shell"
              key={state}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: -5 }}
              transition={{ duration: reduceMotion ? 0.12 : 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="rhythm-character__animation-layer">
                <img
                  src={rhythmAssets[state]}
                  srcSet={`${getRhythmCompactAsset(state)} 400w, ${rhythmAssets[state]} 800w`}
                  sizes={imageSizes}
                  width="800"
                  height="800"
                  loading={loading}
                  decoding="async"
                  alt=""
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default RhythmCharacter
