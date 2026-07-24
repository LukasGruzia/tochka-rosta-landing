import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import logoMain from '../assets/brand/logo-main.png'
import { FlowFlame } from './FlowExperience'
import '../styles/ecosystem-finale.css'

const ease = [0.16, 1, 0.3, 1] as const

const ecosystemItems = [
  {
    number: '01',
    kind: 'store',
    title: 'Магазин',
    text: 'Готовые блюда и напитки. КБЖУ указаны сразу.',
  },
  {
    number: '02',
    kind: 'app',
    title: 'Приложение',
    text: 'Норма, рацион, каталог и история питания.',
  },
  {
    number: '03',
    kind: 'flow',
    title: 'Поток',
    text: 'Закрытые дни и награды за регулярность.',
  },
] as const

function StoreVisual() {
  return (
    <div className="ecosystem-visual ecosystem-visual--store" aria-hidden="true">
      <span className="eco-store__label">SMART STORE</span>
      <div className="eco-store__shelf">
        <i className="eco-store__product eco-store__product--one" />
        <i className="eco-store__product eco-store__product--two" />
        <i className="eco-store__product eco-store__product--three" />
      </div>
      <div className="eco-store__meta">
        <span><b>42 г</b> белка</span>
        <span><b>520</b> ккал</span>
      </div>
    </div>
  )
}

function AppVisual() {
  return (
    <div className="ecosystem-visual ecosystem-visual--app" aria-hidden="true">
      <div className="eco-app__phone">
        <div className="eco-app__sensor" />
        <span className="eco-app__caption">Рацион сегодня</span>
        <div className="eco-app__score"><b>1 840</b><small>ккал</small></div>
        <div className="eco-app__ring"><i /></div>
        <div className="eco-app__bars"><i /><i /><i /></div>
      </div>
      <span className="eco-app__signal"><i /> синхронизация</span>
    </div>
  )
}

function FlowVisual() {
  return (
    <div className="ecosystem-visual ecosystem-visual--flow" aria-hidden="true">
      <div className="eco-flow__flame"><FlowFlame active /></div>
      <div className="eco-flow__status">
        <small>СЕРИЯ АКТИВНА</small>
        <strong>14 дней</strong>
        <span><i /> +10% к бонусам</span>
      </div>
    </div>
  )
}

function EcosystemVisual({ kind }: { kind: (typeof ecosystemItems)[number]['kind'] }) {
  if (kind === 'store') return <StoreVisual />
  if (kind === 'app') return <AppVisual />
  return <FlowVisual />
}

export function EcosystemSection() {
  const reduceMotion = Boolean(useReducedMotion())

  return (
    <section className="section ecosystem-section" id="ecosystem" aria-labelledby="ecosystem-title">
      <div className="ecosystem-section__grid" aria-hidden="true" />
      <div className="ecosystem-section__glow" aria-hidden="true" />
      <div className="container ecosystem-section__container">
        <motion.header
          className="ecosystem-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 46, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.48 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, ease }}
        >
          <span className="ecosystem-heading__eyebrow"><i /> 04 / 10</span>
          <h2 id="ecosystem-title">
            <span>Магазин, приложение</span>
            <span>и твой план на день.</span>
            <strong>Всё связано.</strong>
          </h2>
          <p>Ты задаёшь цель. Мы считаем норму и показываем, что взять на сегодня.</p>
        </motion.header>

        <div className="ecosystem-cards">
          {[0, 1].map((line) => (
            <motion.span
              className={`ecosystem-link ecosystem-link--${line + 1}`}
              key={line}
              aria-hidden="true"
              initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: false, amount: 0.65 }}
              transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : 0.48 + line * 0.2, ease }}
            >
              <i />
            </motion.span>
          ))}

          {ecosystemItems.map((item, index) => (
            <motion.article
              className={`ecosystem-card ecosystem-card--${item.kind}`}
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, y: 58, scale: 0.965 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={reduceMotion ? undefined : { y: -9, rotateX: index === 1 ? 1.2 : -1.2, rotateY: index === 1 ? 0 : index === 0 ? 1.3 : -1.3 }}
              viewport={{ once: false, amount: 0.28 }}
              transition={{ duration: reduceMotion ? 0 : 0.72, delay: reduceMotion ? 0 : index * 0.11, ease }}
            >
              <div className="ecosystem-card__topline">
                <span>{item.number}</span>
                <i />
                <small>SYSTEM NODE</small>
              </div>
              <EcosystemVisual kind={item.kind} />
              <div className="ecosystem-card__copy">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <span className="ecosystem-card__corner" aria-hidden="true" />
            </motion.article>
          ))}
        </div>

        <motion.div
          className="ecosystem-caption"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.8 }}
          transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.8 }}
        >
          <span>FOOD</span><i /><span>DATA</span><i /><span>HABIT</span>
        </motion.div>
      </div>
    </section>
  )
}

type CinematicFinalCTAProps = {
  onCalculate?: () => void
  onDemo?: () => void
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 6l4 4-4 4" />
    </svg>
  )
}

function DailyRationCard({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      className="final-ration"
      initial={reduceMotion ? false : { opacity: 0, x: 36, rotate: 2.5 }}
      whileInView={{ opacity: 1, x: 0, rotate: 1.5 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.34, ease }}
    >
      <div className="final-ration__head"><span>Рацион дня</span><small>ГОТОВ</small></div>
      <div className="final-ration__energy"><strong>1 840</strong><span>из 2 100 ккал</span></div>
      <div className="final-ration__progress"><i /></div>
      <div className="final-ration__macros">
        <span><b>132 г</b>белок</span>
        <span><b>68 г</b>жиры</span>
        <span><b>174 г</b>углеводы</span>
      </div>
      <div className="final-ration__meal"><i>12:30</i><span>Боул с курицей</span><b>520</b></div>
      <div className="final-ration__meal"><i>17:40</i><span>Протеиновый шейк</span><b>250</b></div>
    </motion.div>
  )
}

export function CinematicFinalCTA({ onCalculate, onDemo }: CinematicFinalCTAProps) {
  const reduceMotion = Boolean(useReducedMotion())
  const [showToast, setShowToast] = useState(false)
  const toastTimer = useRef<number | null>(null)

  useEffect(() => () => {
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current)
  }, [])

  const showDemoToast = () => {
    setShowToast(true)
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setShowToast(false), 2800)
  }

  const handleCalculate = () => {
    if (onCalculate) onCalculate()
    else window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  const handleDemo = () => {
    onDemo?.()
    showDemoToast()
  }

  return (
    <section className="cinematic-final" id="final" aria-labelledby="cinematic-final-title">
      <div className="cinematic-final__depth" aria-hidden="true" />
      <div className="cinematic-final__grid" aria-hidden="true" />
      <motion.div
        className="cinematic-final__gold-line"
        aria-hidden="true"
        initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.7 }}
        transition={{ duration: reduceMotion ? 0 : 1.35, ease }}
      />

      <motion.img
        className="cinematic-final__watermark"
        src={logoMain}
        alt=""
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.82, filter: 'blur(18px)' }}
        whileInView={{ opacity: 0.13, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.32 }}
        transition={{ duration: reduceMotion ? 0 : 1.25, ease }}
      />

      <div className="container cinematic-final__container">
        <motion.div
          className="cinematic-final__flame-pod"
          initial={reduceMotion ? false : { opacity: 0, x: -38 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: reduceMotion ? 0 : 0.85, delay: reduceMotion ? 0 : 0.28, ease }}
        >
          <div className="cinematic-final__flame"><FlowFlame active /></div>
          <span><i /> Поток активен</span>
        </motion.div>

        <DailyRationCard reduceMotion={reduceMotion} />

        <motion.div
          className="cinematic-final__content"
          initial={reduceMotion ? false : { opacity: 0, y: 54, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.34 }}
          transition={{ duration: reduceMotion ? 0 : 1, ease }}
        >
          <span className="cinematic-final__eyebrow"><i /> СИСТЕМА НА КАЖДЫЙ ДЕНЬ <i /></span>
          <h2 id="cinematic-final-title">Питание становится<br /><em>системой.</em></h2>
          <p>Готовые блюда, персональный расчёт и привычка, которую легче сохранить.</p>
          <div className="cinematic-final__actions">
            <motion.button
              className="cinematic-final__button"
              type="button"
              onClick={handleCalculate}
              whileHover={reduceMotion ? undefined : { y: -3, scale: 1.025 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            >
              Рассчитать свой рацион <ArrowIcon />
            </motion.button>
            <motion.button
              className="cinematic-final__button cinematic-final__button--secondary"
              type="button"
              onClick={handleDemo}
              whileHover={reduceMotion ? undefined : { y: -3 }}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            >
              Посмотреть демонстрацию
            </motion.button>
          </div>
          <div className="cinematic-final__signature"><span /> Презентационный прототип проекта Луки Чихладзе, город Тюмень <span /></div>
        </motion.div>
      </div>

      <div
        className={`cinematic-final__toast ${showToast ? 'cinematic-final__toast--visible' : ''}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {showToast && <><i /> Демонстрационная версия проекта</>}
      </div>
    </section>
  )
}

export default EcosystemSection
