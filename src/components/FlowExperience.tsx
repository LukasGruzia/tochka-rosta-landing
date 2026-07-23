import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'
import '../styles/flow-experience.css'

export type FlowReward = {
  days: number
  unit: string
  reward: string
}

type FlowFlameProps = {
  active?: boolean
  className?: string
}

type FlowTimelineProps = {
  active?: boolean
  rewards?: FlowReward[]
  className?: string
}

type FlowExperienceProps = {
  rewards?: FlowReward[]
  currentDays?: number
  className?: string
}

const defaultRewards: FlowReward[] = [
  { days: 3, unit: 'дня', reward: 'Бонус +5%' },
  { days: 7, unit: 'дней', reward: 'Напиток в подарок' },
  { days: 14, unit: 'дней', reward: 'Скидка 10%' },
  { days: 30, unit: 'дней', reward: 'Особый подарок' },
  { days: 60, unit: 'дней', reward: 'VIP-статус' },
]

const sparkSettings = [
  { left: 20, drift: -7, travel: -50, duration: 2.7, delay: 0.2 },
  { left: 34, drift: 5, travel: -68, duration: 3.2, delay: 1.1 },
  { left: 46, drift: -3, travel: -44, duration: 2.5, delay: 1.8 },
  { left: 58, drift: 7, travel: -62, duration: 3.1, delay: 0.6 },
  { left: 72, drift: -6, travel: -48, duration: 2.8, delay: 1.5 },
  { left: 82, drift: 4, travel: -58, duration: 3.4, delay: 2.2 },
]

function Checkmark() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <motion.path
        d="m4.2 9.2 3.1 3.1 6.7-7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.1"
      />
    </svg>
  )
}

export function FlowFlame({ active: controlledActive, className = '' }: FlowFlameProps) {
  const flameRef = useRef<HTMLDivElement>(null)
  const reduceMotion = Boolean(useReducedMotion())
  const isMobile = useIsMobile()
  const isInView = useInView(flameRef, { amount: 0.45, once: false })
  const active = reduceMotion || (controlledActive ?? isInView)
  const isAnimated = active && !reduceMotion && !isMobile

  return (
    <motion.div
      ref={flameRef}
      className={`flow-flame ${active ? 'flow-flame--active' : ''} ${className}`.trim()}
      initial={false}
      animate={{ opacity: active ? 1 : 0.46, scale: active ? 1 : 0.9 }}
      transition={{ duration: reduceMotion ? 0 : 0.7, delay: active && !reduceMotion ? 0.2 : 0, ease: [0.16, 1, 0.3, 1] }}
      role="img"
      aria-label="Зелёный огонь серии «Поток»"
    >
      <span className="flow-flame__halo" aria-hidden="true" />
      <span className="flow-flame__ring" aria-hidden="true" />

      <motion.span
        className="flow-flame__tongue flow-flame__tongue--outer"
        aria-hidden="true"
        animate={isAnimated
          ? { y: [0, -3, 1, -2, 0], scaleX: [1, 0.96, 1.035, 0.98, 1], scaleY: [1, 1.045, 0.985, 1.025, 1], rotate: [0, -1.2, 0.7, -0.5, 0] }
          : { y: 0, scaleX: 1, scaleY: 1, rotate: 0 }}
        transition={isAnimated ? { duration: 3.4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
      />
      <motion.span
        className="flow-flame__tongue flow-flame__tongue--middle"
        aria-hidden="true"
        animate={isAnimated
          ? { y: [0, -2, 1, -3, 0], scaleX: [1, 1.04, 0.97, 1.02, 1], scaleY: [1, 0.98, 1.06, 1.02, 1], rotate: [0, 1.3, -0.8, 0.6, 0] }
          : { y: 0, scaleX: 1, scaleY: 1, rotate: 0 }}
        transition={isAnimated ? { duration: 2.65, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
      />
      <motion.span
        className="flow-flame__tongue flow-flame__tongue--core"
        aria-hidden="true"
        animate={isAnimated
          ? { y: [0, -1, 1, -2, 0], scale: [1, 1.04, 0.96, 1.025, 1], rotate: [0, -1.5, 1, 0] }
          : { y: 0, scale: 1, rotate: 0 }}
        transition={isAnimated ? { duration: 2.25, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.2 }}
      />

      <span className="flow-flame__sparks" aria-hidden="true">
        {sparkSettings.map((spark, index) => (
          <motion.i
            key={index}
            style={{ left: `${spark.left}%` }}
            initial={false}
            animate={isAnimated
              ? { x: [0, spark.drift * 0.4, spark.drift], y: [8, spark.travel * 0.45, spark.travel], opacity: [0, 0.76, 0], scale: [0.45, 1, 0.35] }
              : { x: 0, y: 8, opacity: 0, scale: 0.45 }}
            transition={isAnimated
              ? { duration: spark.duration, delay: spark.delay, repeat: Infinity, ease: 'easeOut' }
              : { duration: 0.15 }}
          />
        ))}
      </span>
    </motion.div>
  )
}

export function FlowTimeline({ active: controlledActive, rewards = defaultRewards, className = '' }: FlowTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const reduceMotion = Boolean(useReducedMotion())
  const isInView = useInView(timelineRef, { amount: 0.3, once: false, margin: '-5% 0px -5% 0px' })
  const active = reduceMotion || (controlledActive ?? isInView)
  const timing = (index: number) => reduceMotion ? 0 : 0.5 + index * 0.5

  return (
    <div ref={timelineRef} className={`flow-timeline ${className}`.trim()} aria-label="Этапы наград системы «Поток»">
      <span className="flow-timeline__track" aria-hidden="true" />
      <motion.span
        className="flow-timeline__fill"
        aria-hidden="true"
        initial={false}
        animate={{ scaleY: active ? 1 : 0, opacity: active ? 1 : 0.35 }}
        transition={{ duration: reduceMotion ? 0 : active ? 2.45 : 0.25, delay: active && !reduceMotion ? 0.45 : 0, ease: [0.16, 1, 0.3, 1] }}
      />

      <ol className="flow-timeline__list">
        {rewards.map((item, index) => {
          const delay = timing(index)

          return (
            <motion.li
              className="flow-timeline__stage"
              key={`${item.days}-${item.reward}`}
              initial={false}
              animate={{ opacity: active ? 1 : 0.42, x: active ? 0 : -5 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, delay: active ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                className="flow-timeline__stage-glass"
                aria-hidden="true"
                initial={false}
                animate={{ opacity: active ? 1 : 0, scaleX: active ? 1 : 0.94 }}
                transition={{ duration: reduceMotion ? 0 : 0.55, delay: active ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
              />

              <motion.span
                className="flow-timeline__node"
                aria-hidden="true"
                initial={false}
                animate={{ opacity: active ? 1 : 0.48, scale: active ? [0.82, 1.16, 1] : 0.82 }}
                transition={{ duration: reduceMotion ? 0 : 0.48, delay: active ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.span
                  className="flow-timeline__check"
                  initial={false}
                  animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.35 }}
                  transition={{ duration: reduceMotion ? 0 : 0.32, delay: active ? delay + 0.08 : 0, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Checkmark />
                </motion.span>
              </motion.span>

              <div className="flow-timeline__days">
                <strong>{item.days}</strong>
                <span>{item.unit}</span>
              </div>
              <div className="flow-timeline__reward">
                <small>{String(index + 1).padStart(2, '0')}</small>
                <p>{item.reward}</p>
              </div>
            </motion.li>
          )
        })}
      </ol>
    </div>
  )
}

function MobileFlowExperience({ rewards, currentDays, className }: Required<FlowExperienceProps>) {
  const milestones = rewards.map(({ days }) => days)

  return (
    <motion.div
      className={`mobile-flow ${className}`.trim()}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
    >
      <header className="mobile-flow__intro">
        <span>ПОТОК</span>
        <h3>Держи ритм каждый день.</h3>
        <p>Отмечай питание, собирай дни подряд и получай награды за стабильность.</p>
      </header>

      <section className="mobile-flow__streak" aria-label={`Текущий поток — ${currentDays} дней`}>
        <div>
          <span>Текущий поток</span>
          <strong>{currentDays} дней</strong>
          <small>Серия активна · следующий рубеж 14 дней</small>
        </div>
        <span className="mobile-flow__flame" aria-hidden="true">
          <i />
          <b />
        </span>
      </section>

      <div className="mobile-flow__milestones" aria-label="Линейка наград">
        {milestones.map((days) => (
          <span className={days <= currentDays ? 'is-reached' : ''} key={days}>
            {days}
            <small>дн.</small>
          </span>
        ))}
      </div>

      <div className="mobile-flow__rewards">
        {rewards.slice(0, 3).map((item, index) => (
          <article key={`${item.days}-${item.reward}`}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <strong>{item.days} {item.unit}</strong>
              <p>{item.reward}</p>
            </div>
            <i aria-hidden="true">✓</i>
          </article>
        ))}
      </div>
    </motion.div>
  )
}

function DesktopFlowExperience({ rewards = defaultRewards, currentDays = 7, className = '' }: FlowExperienceProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const reduceMotion = Boolean(useReducedMotion())
  const isInView = useInView(rootRef, { amount: 0.32, once: false, margin: '-6% 0px -6% 0px' })
  const active = reduceMotion || isInView

  return (
    <div ref={rootRef} className={`flow-experience ${className}`.trim()}>
      <span className="flow-experience__scan" aria-hidden="true" />

      <div className="flow-experience__signal">
        <FlowFlame active={active} />
        <div className="flow-experience__status">
          <span><i /> Серия активна</span>
          <strong>{currentDays} дней</strong>
          <p>Движение к новой награде</p>
        </div>
      </div>

      <div className="flow-experience__journey">
        <div className="flow-experience__heading">
          <span>Путь наград</span>
          <small>FLOW / 01</small>
        </div>
        <FlowTimeline active={active} rewards={rewards} />
      </div>
    </div>
  )
}

export function FlowExperience({ rewards = defaultRewards, currentDays = 7, className = '' }: FlowExperienceProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <MobileFlowExperience rewards={rewards} currentDays={currentDays} className={className} />
  }

  return <DesktopFlowExperience rewards={rewards} currentDays={currentDays} className={className} />
}

export default FlowExperience
