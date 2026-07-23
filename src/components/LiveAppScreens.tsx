import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { foodShowcase } from '../data/foodShowcase'
import { FlowFlame } from './FlowExperience'
import '../styles/live-app-screens.css'

const flowRewards = [
  { days: '3 дня', label: '+5% бонусов', state: 'complete' },
  { days: '7 дней', label: 'Напиток в подарок', state: 'current' },
  { days: '14 дней', label: 'Скидка 10%', state: 'next' },
  { days: '30 дней', label: 'Особый подарок', state: 'locked' },
  { days: '60 дней', label: 'VIP-статус', state: 'locked' },
] as const

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

function StatusBar() {
  return (
    <div className="live-app-status" aria-hidden="true">
      <strong>9:41</strong>
      <span className="live-app-status__signals">
        <i className="live-app-status__cell" />
        <i className="live-app-status__wifi" />
        <i className="live-app-status__battery" />
      </span>
    </div>
  )
}

function BackIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m12.5 4-6 6 6 6" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="7.2" />
      <path d="M10 9v4M10 6.4h.01" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="m3.4 8.2 3 3 6.2-6.4" />
    </svg>
  )
}

function GiftIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3.2 8h13.6v9H3.2zM2.4 5.5h15.2V8H2.4zM10 5.5V17M10 5.5C8.8 2.2 5 2.2 5.4 4.3 5.7 5.5 7.6 5.5 10 5.5Zm0 0c1.2-3.3 5-3.3 4.6-1.2-.3 1.2-2.2 1.2-4.6 1.2Z" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect x="4.2" y="8.3" width="11.6" height="8.4" rx="2" />
      <path d="M7 8.3V6.5a3 3 0 0 1 6 0v1.8M10 11.4v2.3" />
    </svg>
  )
}

function FlowNavIcon({ type }: { type: 'home' | 'plan' | 'flow' | 'profile' }) {
  if (type === 'home') {
    return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m3.4 9 6.6-5.4L16.6 9v7.2h-4.1v-4.5h-5v4.5H3.4Z" /></svg>
  }

  if (type === 'plan') {
    return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 3.5v4M7.5 3.5v4M5 6.4h2.5M6.25 7.5v9M13.8 3.5c-1.7 1.8-1.8 5.5 0 6.5v6.5M13.8 3.5v6.8" /></svg>
  }

  if (type === 'flow') {
    return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M11.1 2.7c.6 3-1.7 4.2-2 6.2-.7-.8-1.1-1.7-1-2.9-2 1.8-3.2 4.1-2.5 6.6.7 2.7 3 4.2 5.5 3.8 2.8-.4 4.5-2.7 4.2-5.5-.3-2.6-2.1-5.8-4.2-8.2Z" /><path d="M10.6 9.2c.4 1.7-1 2.5-.9 3.7 0 1.2.9 2 2 1.8 1.4-.2 2-1.5 1.6-2.7-.4-1.1-1.3-2.1-2.7-2.8Z" /></svg>
  }

  return <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="6.4" r="3" /><path d="M4.4 16.3c.8-3 2.7-4.6 5.6-4.6s4.8 1.6 5.6 4.6" /></svg>
}

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 3.4h10v13.2l-5-3.2-5 3.2z" />
    </svg>
  )
}

export function LiveFlowAppScreen() {
  const screenRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = Boolean(useReducedMotion())
  const isInView = useInView(screenRef, { amount: 0.28, once: false })
  const active = prefersReducedMotion || isInView

  return (
    <div
      ref={screenRef}
      className={`live-app-screen live-flow-app ${active ? 'is-active' : ''}`}
      aria-label="Экран серии Поток: семь дней регулярного питания"
    >
      <StatusBar />
      <header className="live-app-header">
        <button type="button" aria-label="Назад"><BackIcon /></button>
        <strong>Поток</strong>
        <button type="button" aria-label="О системе Поток"><InfoIcon /></button>
      </header>

      <div className="live-flow-app__intro">
        <span><i /> Серия активна</span>
        <p>Чем дольше ты в потоке,<br />тем ценнее награды.</p>
      </div>

      <div className="live-flow-app__signal">
        <span className="live-flow-app__aurora" aria-hidden="true" />
        <span className="live-flow-app__smoke live-flow-app__smoke--one" aria-hidden="true" />
        <span className="live-flow-app__smoke live-flow-app__smoke--two" aria-hidden="true" />
        <motion.div
          className="live-flow-app__flame-wrap"
          animate={active && !prefersReducedMotion
            ? { y: [0, -3, 1, 0], scale: [1, 1.018, 0.99, 1] }
            : { y: 0, scale: 1 }}
          transition={active && !prefersReducedMotion
            ? { duration: 3.8, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0 }}
        >
          <FlowFlame active={active} />
        </motion.div>
        <span className="live-flow-app__signal-label" aria-hidden="true">FLOW / 07</span>
      </div>

      <motion.section
        className="live-flow-app__progress"
        initial={false}
        animate={{ opacity: active ? 1 : 0.52, y: active ? 0 : 7 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.55, delay: prefersReducedMotion ? 0 : 0.18 }}
        aria-label="Прогресс текущей серии"
      >
        <div className="live-flow-app__progress-copy">
          <span>Текущая серия</span>
          <strong>7 дней</strong>
        </div>
        <div className="live-flow-app__progress-track" aria-hidden="true">
          <motion.i
            initial={false}
            animate={{ scaleX: active ? 0.5 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.2, delay: prefersReducedMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
        <small>Ещё 7 дней до скидки 10%</small>
      </motion.section>

      <ol className="live-flow-app__rewards" aria-label="Награды Потока">
        {flowRewards.map((reward, index) => (
          <motion.li
            key={reward.days}
            className={`live-flow-app__reward is-${reward.state}`}
            initial={false}
            animate={{ opacity: active ? 1 : 0.3, y: active ? 0 : 6 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45, delay: prefersReducedMotion ? 0 : 0.42 + index * 0.12 }}
          >
            <span className="live-flow-app__reward-icon">
              {reward.state === 'complete' ? <CheckIcon /> : reward.state === 'locked' ? <LockIcon /> : <GiftIcon />}
            </span>
            <strong>{reward.days}</strong>
            <small>{reward.label}</small>
          </motion.li>
        ))}
      </ol>

      <motion.section
        className="live-flow-app__streak"
        initial={false}
        animate={{ opacity: active ? 1 : 0.4, y: active ? 0 : 7 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.55, delay: prefersReducedMotion ? 0 : 0.78, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Активность за неделю: семь дней из семи"
      >
        <div className="live-flow-app__streak-head">
          <span><i /> Неделя в балансе</span>
          <strong>7 / 7</strong>
        </div>
        <ol className="live-flow-app__week" aria-hidden="true">
          {weekDays.map((day, index) => (
            <li key={day}>
              <motion.i
                initial={false}
                animate={{ opacity: active ? 1 : 0.25, scale: active ? 1 : 0.55 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.35, delay: prefersReducedMotion ? 0 : 0.86 + index * 0.055 }}
              >
                <CheckIcon />
              </motion.i>
              <span>{day}</span>
            </li>
          ))}
        </ol>
        <div className="live-flow-app__streak-foot">
          <span>Личный рекорд</span>
          <strong>12 дней <i>↗</i></strong>
        </div>
        <div className="live-flow-app__next">
          <div>
            <span>Следующая цель</span>
            <strong>14 дней</strong>
          </div>
          <i aria-hidden="true">
            <motion.b
              initial={false}
              animate={{ scaleX: active ? 0.5 : 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.9, delay: prefersReducedMotion ? 0 : 1.08, ease: [0.16, 1, 0.3, 1] }}
            />
          </i>
          <small>осталось 7 дней</small>
        </div>
      </motion.section>

      <motion.nav
        className="live-flow-app__nav"
        aria-label="Навигация приложения"
        initial={false}
        animate={{ opacity: active ? 1 : 0.45, y: active ? 0 : 5 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.95 }}
      >
        <span><FlowNavIcon type="home" /><small>Главная</small></span>
        <span><FlowNavIcon type="plan" /><small>Рацион</small></span>
        <span className="is-active"><FlowNavIcon type="flow" /><small>Поток</small></span>
        <span><FlowNavIcon type="profile" /><small>Профиль</small></span>
      </motion.nav>

      <div className="live-app-home-indicator" aria-hidden="true" />
    </div>
  )
}

export function LiveFoodAppScreen() {
  const screenRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = Boolean(useReducedMotion())
  const isInView = useInView(screenRef, { amount: 0.3, once: false })
  const active = prefersReducedMotion || isInView
  const bowl = foodShowcase.find((item) => item.id === 'bowl') ?? foodShowcase[0]

  return (
    <div ref={screenRef} className="live-app-screen live-food-app" aria-label="Карточка блюда Боул с курицей и рисом">
      <StatusBar />
      <header className="live-app-header">
        <button type="button" aria-label="Назад"><BackIcon /></button>
        <strong>Ваш обед</strong>
        <button type="button" aria-label="Добавить блюдо в избранное"><BookmarkIcon /></button>
      </header>

      <motion.figure
        className="live-food-app__visual"
        initial={false}
        animate={{ opacity: active ? 1 : 0.46, y: active ? 0 : 10, scale: active ? 1 : 0.96 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src={bowl.image}
          alt="Боул с курицей, рисом и свежими овощами"
          loading="lazy"
          animate={active && !prefersReducedMotion ? { scale: [1.015, 1.055, 1.015] } : { scale: 1.015 }}
          transition={active && !prefersReducedMotion ? { duration: 8, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
        />
        <span className="live-food-app__badge"><i /> Сытный обед</span>
        <figcaption>Готово к выдаче · 4 мин</figcaption>
      </motion.figure>

      <motion.div
        className="live-food-app__content"
        initial={false}
        animate={{ opacity: active ? 1 : 0.45, y: active ? 0 : 8 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.55, delay: prefersReducedMotion ? 0 : 0.18 }}
      >
        <div className="live-food-app__title-row">
          <div>
            <small>Осознанный выбор</small>
            <h3>Боул с курицей<br />и рисом</h3>
          </div>
          <strong>{bowl.price} ₽</strong>
        </div>
        <p>Курица, рис, свежие овощи и фирменный соус.</p>

        <dl className="live-food-app__macros">
          <div><dt>Ккал</dt><dd>520</dd></div>
          <div><dt>Белки</dt><dd>42 <small>г</small></dd></div>
          <div><dt>Жиры</dt><dd>17 <small>г</small></dd></div>
          <div><dt>Углеводы</dt><dd>49 <small>г</small></dd></div>
        </dl>

        <button className="live-food-app__add" type="button">
          <span>Добавить в рацион</span>
          <i aria-hidden="true">+</i>
        </button>
      </motion.div>

      <div className="live-app-home-indicator" aria-hidden="true" />
    </div>
  )
}
