import { useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { foodShowcase } from '../data/foodShowcase'
import { NutritionCalculator, NutritionResultPanel } from './NutritionCalculator'
import type { NutritionInput, NutritionResult } from '../utils/nutritionCalculator'
import '../styles/interactive-story.css'

type StepVisualProps = {
  reduceMotion: boolean
}

type StoryStep = {
  number: string
  title: string
  body: string
  shortLabel: string
}

const steps: StoryStep[] = [
  {
    number: '01',
    title: 'Задаёшь цель',
    body: 'Рост, вес, активность и продукты, которые ты любишь.',
    shortLabel: 'Профиль',
  },
  {
    number: '02',
    title: 'Видишь рацион',
    body: 'Приложение считает КБЖУ и подбирает блюда на день.',
    shortLabel: 'Расчёт',
  },
  {
    number: '03',
    title: 'Забираешь блюда',
    body: 'В карточке уже есть цена, состав и КБЖУ.',
    shortLabel: 'Выбор',
  },
]

const journeyItems = [
  {
    time: '08:10',
    title: 'Утро',
    body: 'Приложение показывает норму КБЖУ.',
    meta: '2 140 ккал',
    icon: 'sun',
  },
  {
    time: '13:20',
    title: 'Обед',
    body: 'Выбираешь готовое блюдо под свой план.',
    meta: '520 ккал',
    icon: 'bowl',
  },
  {
    time: '18:00',
    title: 'Тренировка',
    body: 'После нагрузки берёшь протеиновый коктейль.',
    meta: '32 г белка',
    icon: 'pulse',
  },
  {
    time: '20:30',
    title: 'Ужин',
    body: 'Вечером отмечаешь день в Потоке.',
    meta: 'День закрыт',
    icon: 'moon',
  },
  {
    time: '21:00',
    title: 'Поток',
    body: 'Получаешь прогресс и бонусы.',
    meta: '+1 день',
    icon: 'flame',
  },
]

function NutritionVisual({ reduceMotion }: StepVisualProps) {
  const macros = [
    { name: 'Белки', value: '148 г', width: '78%' },
    { name: 'Жиры', value: '72 г', width: '62%' },
    { name: 'Углеводы', value: '226 г', width: '86%' },
  ]

  return (
    <div className="is-nutrition">
      <div className="is-visual__topline">
        <span>Рацион / сегодня</span>
        <strong><i /> Синхронизирован</strong>
      </div>

      <div className="is-nutrition__summary">
        <div>
          <span>Дневная норма</span>
          <strong>2 140 <small>ккал</small></strong>
        </div>
        <div className="is-nutrition__ring" aria-label="Рацион собран на 78 процентов">
          <span>78<small>%</small></span>
        </div>
      </div>

      <div className="is-nutrition__macros">
        {macros.map((macro, index) => (
          <div className="is-nutrition__macro" key={macro.name}>
            <div><span>{macro.name}</span><strong>{macro.value}</strong></div>
            <i>
              <motion.b
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.75, delay: reduceMotion ? 0 : 0.13 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: macro.width }}
              />
            </i>
          </div>
        ))}
      </div>

      <div className="is-nutrition__day">
        {['Завтрак', 'Обед', 'Ужин'].map((meal, index) => (
          <motion.span
            key={meal}
            initial={reduceMotion ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.42 + index * 0.08 }}
          >
            <i>{index + 1}</i>{meal}<b>✓</b>
          </motion.span>
        ))}
      </div>
    </div>
  )
}

function FoodVisual({ reduceMotion }: StepVisualProps) {
  const featuredFoods = [foodShowcase[0], foodShowcase[1], foodShowcase[4]]

  return (
    <div className="is-food">
      <div className="is-visual__topline">
        <span>Витрина / 03 блюда</span>
        <strong><i /> Подходят тебе</strong>
      </div>

      <div className="is-food__list">
        {featuredFoods.map((food, index) => (
          <motion.article
            key={food.id}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: reduceMotion ? 0 : 0.08 + index * 0.09, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="is-food__image">
              <img src={food.image} alt={food.name} loading="lazy" />
              <span>{food.badge}</span>
            </div>
            <div className="is-food__copy">
              <h3>{food.name}</h3>
              <p>{food.calories} ккал · Б {food.protein} г</p>
              <strong>{food.price} ₽</strong>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="is-food__footer">
        <span>Рацион совпадает с целью</span>
        <strong>Выбрать блюда <i>→</i></strong>
      </div>
    </div>
  )
}

export function InteractiveHowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const [nutritionInput, setNutritionInput] = useState<NutritionInput | null>(null)
  const [nutritionResult, setNutritionResult] = useState<NutritionResult | null>(null)
  const reduceMotion = Boolean(useReducedMotion())

  const handleNutritionCalculated = (input: NutritionInput, result: NutritionResult) => {
    setNutritionInput(input)
    setNutritionResult(result)
    setActiveStep(1)
  }

  return (
    <section className="section interactive-how section-tech-grid" id="implementation" aria-labelledby="interactive-how-title">
      <div className="container">
        <motion.header
          className="section-heading interactive-how__heading"
          initial={reduceMotion ? false : { opacity: 0, y: 54 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.55 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-index">03 / 10</span>
          <span className="eyebrow"><i /> Три шага</span>
          <h2 id="interactive-how-title">Как это работает</h2>
          <p>Цель, расчёт и готовые блюда. Без таблиц и догадок.</p>
        </motion.header>

        <div className="interactive-how__layout">
          <div className="interactive-how__steps" role="group" aria-label="Шаги подбора рациона">
            <span className="interactive-how__connector" aria-hidden="true">
              <motion.i
                initial={false}
                animate={{ scaleY: (activeStep + 1) / steps.length }}
                transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>

            {steps.map((step, index) => (
              <motion.button
                type="button"
                id={`how-step-${index + 1}`}
                aria-controls="how-step-panel"
                aria-pressed={activeStep === index}
                className={`interactive-step ${activeStep === index ? 'interactive-step--active' : ''}`}
                key={step.number}
                onClick={() => setActiveStep(index)}
                onPointerEnter={(event) => {
                  if (event.pointerType === 'mouse') setActiveStep(index)
                }}
                initial={reduceMotion ? false : { opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.span
                  className="interactive-step__number"
                  animate={{ scale: activeStep === index && !reduceMotion ? 1.08 : 1 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  {step.number}
                </motion.span>
                <span className="interactive-step__copy">
                  <small>{step.shortLabel}</small>
                  <strong>{step.title}</strong>
                  <span>{step.body}</span>
                </span>
                <span className="interactive-step__arrow" aria-hidden="true">↗</span>
              </motion.button>
            ))}
          </div>

          <motion.div
            className="interactive-how__visual-shell"
            initial={reduceMotion ? false : { opacity: 0, y: 46, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: reduceMotion ? 0 : 0.85, delay: reduceMotion ? 0 : 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="interactive-how__visual-grid" aria-hidden="true" />
            <span className="interactive-how__visual-glow" aria-hidden="true" />
            <div className="interactive-how__visual-frame">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  id="how-step-panel"
                  role="region"
                  aria-labelledby={`how-step-${activeStep + 1}`}
                  className="interactive-how__visual"
                  key={`${activeStep}-${activeStep === 1 && nutritionResult ? 'calculated' : 'preview'}`}
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 24, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -18, filter: 'blur(4px)' }}
                  transition={{ duration: reduceMotion ? 0 : 0.48, ease: [0.16, 1, 0.3, 1] }}
                >
                  {activeStep === 0 && (
                    <NutritionCalculator
                      initialInput={nutritionInput}
                      onCalculated={handleNutritionCalculated}
                    />
                  )}
                  {activeStep === 1 && nutritionInput && nutritionResult && (
                    <NutritionResultPanel
                      input={nutritionInput}
                      result={nutritionResult}
                      reduceMotion={reduceMotion}
                      onEdit={() => setActiveStep(0)}
                      onShowFood={() => setActiveStep(2)}
                    />
                  )}
                  {activeStep === 1 && (!nutritionInput || !nutritionResult) && (
                    <NutritionVisual reduceMotion={reduceMotion} />
                  )}
                  {activeStep === 2 && <FoodVisual reduceMotion={reduceMotion} />}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="interactive-how__visual-meta" aria-hidden="true">
              <span>TOCHKA / SYSTEM</span>
              <i />
              <strong>0{activeStep + 1}</strong>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function JourneyIcon({ type }: { type: string }) {
  if (type === 'flame') {
    return (
      <span className="is-journey__flame" aria-hidden="true">
        <i />
        <b />
      </span>
    )
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      {type === 'sun' && <><circle cx="16" cy="16" r="5" /><path d="M16 3v4m0 18v4M3 16h4m18 0h4M6.8 6.8l2.8 2.8m12.8 12.8 2.8 2.8M25.2 6.8l-2.8 2.8M9.6 22.4l-2.8 2.8" /></>}
      {type === 'bowl' && <><path d="M6 14h20c0 7-4.5 11-10 11S6 21 6 14Z" /><path d="M9 10c2-2 4 2 6 0s4 2 8 0M10 27h12" /></>}
      {type === 'pulse' && <><path d="M4 17h6l3-8 5 15 3-7h7" /><circle cx="16" cy="16" r="13" /></>}
      {type === 'moon' && <path d="M23.5 21.8A11 11 0 0 1 10.2 8.5 11 11 0 1 0 23.5 21.8Z" />}
    </svg>
  )
}

export function UserDayJourney() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = Boolean(useReducedMotion())
  const journeyInView = useInView(sectionRef, { amount: 0.2 })
  const [activeJourneyIndex, setActiveJourneyIndex] = useState(0)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 78%', 'end 38%'],
  })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 88, damping: 24, mass: 0.45 })
  const routePosition = useTransform(smoothProgress, (value) => `${Math.max(0, Math.min(1, value)) * 100}%`)

  useMotionValueEvent(smoothProgress, 'change', (value) => {
    if (reduceMotion) return

    const nextIndex = Math.min(
      journeyItems.length - 1,
      Math.max(0, Math.floor(value * journeyItems.length)),
    )

    setActiveJourneyIndex((currentIndex) => currentIndex === nextIndex ? currentIndex : nextIndex)
  })

  const currentJourneyIndex = reduceMotion ? journeyItems.length - 1 : activeJourneyIndex

  return (
    <section
      ref={sectionRef}
      className={`section user-journey ${journeyInView && !reduceMotion ? 'user-journey--visible' : ''}`}
      id="journey"
      aria-labelledby="user-journey-title"
    >
      <div className="container">
        <motion.header
          className="section-heading section-heading--center user-journey__heading"
          initial={reduceMotion ? false : { opacity: 0, y: 52 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.78, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-index section-index--center">ДЕНЬ / СИСТЕМА</span>
          <span className="eyebrow"><i /> Путь пользователя</span>
          <h2 id="user-journey-title">Один день с Точкой Роста</h2>
          <p>Утром видишь план. Днём выбираешь блюда. Вечером закрываешь день.</p>
        </motion.header>

        <div className="user-journey__track-wrap">
          <div className="user-journey__track user-journey__track--horizontal" aria-hidden="true">
            <motion.i style={{ scaleX: reduceMotion ? 1 : smoothProgress }} />
            <motion.b
              className="user-journey__route-spark"
              style={{ left: reduceMotion ? '100%' : routePosition }}
            />
          </div>
          <div className="user-journey__track user-journey__track--vertical" aria-hidden="true">
            <motion.i style={{ scaleY: reduceMotion ? 1 : smoothProgress }} />
            <motion.b
              className="user-journey__route-spark"
              style={{ top: reduceMotion ? '100%' : routePosition }}
            />
          </div>

          <ol className="user-journey__list">
            {journeyItems.map((item, index) => {
              const isActive = index === currentJourneyIndex
              const isPassed = index <= currentJourneyIndex

              return (
                <motion.li
                  className={`user-journey__item ${item.icon === 'flame' ? 'user-journey__item--flow' : ''} ${isPassed ? 'user-journey__item--passed' : ''} ${isActive ? 'user-journey__item--active' : ''}`}
                  key={item.title}
                  aria-current={isActive ? 'step' : undefined}
                  initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.48 }}
                  transition={{ duration: reduceMotion ? 0 : 0.62, delay: reduceMotion ? 0 : index * 0.11, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.span
                    className="user-journey__node"
                    aria-hidden="true"
                    initial={reduceMotion ? false : { scale: 0.55, opacity: 0.25 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.65 }}
                    transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.12 + index * 0.11, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <i />
                  </motion.span>

                  <motion.article
                    className="user-journey__card"
                    initial={false}
                    animate={journeyInView && !reduceMotion ? {
                      x: [0, index % 2 === 0 ? 1.5 : -1.5, 0, index % 2 === 0 ? -1 : 1, 0],
                      y: [0, -4, 0, 2, 0],
                      rotate: [0, index % 2 === 0 ? 0.16 : -0.16, 0, index % 2 === 0 ? -0.1 : 0.1, 0],
                    } : { x: 0, y: 0, rotate: 0 }}
                    transition={journeyInView && !reduceMotion ? {
                      duration: 8.4 + index * 0.45,
                      delay: 0.9 + index * 0.12,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    } : { duration: 0.35 }}
                  >
                    <div className="user-journey__card-top">
                      <time>{item.time}</time>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="user-journey__icon"><JourneyIcon type={item.icon} /></div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <strong>{item.meta}</strong>
                  </motion.article>
                </motion.li>
              )
            })}
          </ol>
        </div>

        <motion.div
          className="user-journey__footer"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.7 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.45 }}
        >
          <span><i /> День сохранён</span>
          <p>Пять действий. Один спокойный ритм.</p>
          <strong>FLOW / +1</strong>
        </motion.div>
      </div>
    </section>
  )
}

export default InteractiveHowItWorks
