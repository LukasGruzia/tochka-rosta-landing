import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import logoMain from '../assets/brand/logo-main.png'
import appProfile from '../assets/app/app-profile.png'
import khinkaliImage from '../assets/food/khinkali.png'
import khinkaliMobileImage from '../assets/mobile/food/khinkali.jpg'
import { CinematicBackground } from '../components/CinematicBackground'
import { BrandPreloader, ScrollStoryProgress } from '../components/CinematicShell'
import { ComparisonSection } from '../components/ComparisonSection'
import { DailyProgress } from '../components/DailyProgress'
import { CinematicFinalCTA, EcosystemSection } from '../components/EcosystemFinale'
import { FlowExperience } from '../components/FlowExperience'
import { GuidedDemo, guidedDemoStepsCount } from '../components/GuidedDemo'
import { InteractiveDayPlanner } from '../components/InteractiveDayPlanner'
import { InteractiveHowItWorks, UserDayJourney } from '../components/InteractiveStory'
import { LiveFlowAppScreen, LiveFoodAppScreen } from '../components/LiveAppScreens'
import LocationMap from '../components/LocationMap'
import { PresentationMode } from '../components/PresentationMode'
import { QrScenarioSection } from '../components/QrScenarioSection'
import { RhythmFooterEasterEgg } from '../features/rhythm/components/RhythmFooterEasterEgg'
import { RhythmHeroCameo } from '../features/rhythm/components/RhythmHeroCameo'
import { RhythmSection } from '../features/rhythm/sections/RhythmSection'
import { foodShowcase } from '../data/foodShowcase'
import type { MealSlot } from '../data/mealPlans'
import { useIsMobile } from '../hooks/useIsMobile'
import type { Goal, NutritionInput, NutritionResult } from '../utils/nutritionCalculator'

const demoStorageKey = 'tochka-rosta-demo-meals'
const mealSlots: MealSlot[] = ['breakfast', 'lunch', 'snack', 'dinner']

function readDemoSlots(): MealSlot[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = JSON.parse(window.localStorage.getItem(demoStorageKey) ?? '[]')
    return Array.isArray(stored)
      ? stored.filter((slot): slot is MealSlot => mealSlots.includes(slot))
      : []
  } catch {
    return []
  }
}

const navItems = [
  ['concept', 'Концепция'],
  ['implementation', 'Как работает'],
  ['ecosystem', 'Экосистема'],
  ['qr', 'QR'],
  ['app', 'Приложение'],
  ['rhythm', 'Ритм'],
  ['flow', 'Поток'],
] as const

const conceptCards = [
  ['01', 'Блюда с КБЖУ', 'Состав и цифры — прямо на карточке.'],
  ['02', 'Рацион в телефоне', 'Цель, норма и блюда на сегодня.'],
  ['03', 'Поток без давления', 'Закрываешь день. Получаешь бонусы.'],
]

const steps = [
  ['01', 'Рассказываешь о себе', 'Цель, параметры и предпочтения.'],
  ['02', 'Видишь свою норму', 'Калории и БЖУ на день.'],
  ['03', 'Выбираешь блюда', 'Из того, что есть в магазине.'],
  ['04', 'Закрываешь день', 'Рацион закрыт. Прогресс сохранён.'],
]

const locationFacts = [
  ['60–80', 'м² — компактный городской формат'],
  ['КБЖУ', 'готовые блюда с понятным составом'],
  ['QR', 'состав и рацион в телефоне'],
  ['BAR', 'протеиновые напитки и кофе'],
]

const appFeatures = [
  ['Расчёт КБЖУ', 'Норма на день — под твою цель и активность.'],
  ['Рацион на день', 'Готовый набор из блюд, которые есть в магазине.'],
  ['Каталог блюд', 'Состав, КБЖУ и цена без мелкого шрифта.'],
  ['Поток и награды', 'Серия дней и бонусы за ритм.'],
  ['История питания', 'Блюда и прогресс за каждый день.'],
  ['Бонусы', 'Напитки, скидки и подарки за закрытые дни.'],
]

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 6l4 4-4 4" /></svg>
}

function CheckIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 4 4 8-9" /></svg>
}

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const lightMotion = Boolean(reduceMotion) || isMobile
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: isMobile ? 16 : 34, filter: isMobile ? 'blur(0px)' : 'blur(10px)' }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: isMobile, amount: isMobile ? 0.12 : 0.16, margin: '-4% 0px -4% 0px' }}
      transition={{ duration: lightMotion ? 0.5 : 0.72, delay: isMobile ? Math.min(delay, 0.08) : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ eyebrow, title, text, align = 'left' }: { eyebrow: string; title: string; text?: string; align?: 'left' | 'center' }) {
  return (
    <Reveal className={`section-heading section-heading--${align}`}>
      <span className="eyebrow"><i />{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  )
}

function AppPlaceholder({ type }: { type: 'home' | 'product' }) {
  return (
    <div className={`app-placeholder app-placeholder--${type}`} aria-label="Демонстрационный экран приложения">
      <div className="app-status"><span>9:41</span><span>● ◔ ▰</span></div>
      <div className="app-greeting">{type === 'home' ? 'Добрый день, Лука' : 'Ваш обед'}</div>
      {type === 'home' ? (
        <>
          <div className="app-ring"><strong>1 840</strong><span>из 2 240 ккал</span></div>
          <div className="app-macros"><span>Б<strong>92</strong></span><span>Ж<strong>58</strong></span><span>У<strong>176</strong></span></div>
          <div className="app-mini-card"><i /><div><strong>Рацион на сегодня</strong><small>4 приёма пищи</small></div></div>
          <div className="app-mini-card"><i /><div><strong>Поток: 7 дней</strong><small>Продолжай в том же ритме</small></div></div>
        </>
      ) : (
        <>
          <div className="app-product-art"><i /><i /><i /></div>
          <strong className="app-product-name">Боул с курицей</strong>
          <p className="app-product-copy">Рис, курица, свежие овощи и фирменный соус</p>
          <div className="app-macros"><span>ккал<strong>520</strong></span><span>Б<strong>42</strong></span><span>Ж<strong>17</strong></span></div>
          <div className="app-add">Добавить в рацион</div>
        </>
      )}
    </div>
  )
}

export function LandingPage() {
  const [activeSection, setActiveSection] = useState('concept')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [heroReady, setHeroReady] = useState(false)
  const [plannerGoal, setPlannerGoal] = useState<Goal>('maintain')
  const [targetCalories, setTargetCalories] = useState<number | null>(null)
  const [addedSlots, setAddedSlots] = useState<MealSlot[]>(readDemoSlots)
  const [progressVisible, setProgressVisible] = useState(false)
  const [plannerHighlighted, setPlannerHighlighted] = useState(false)
  const [guidedStep, setGuidedStep] = useState<number | null>(null)
  const [presentationActive, setPresentationActive] = useState(false)
  const isMobile = useIsMobile()
  const khinkaliSectionRef = useRef<HTMLDivElement>(null)
  const appSectionRef = useRef<HTMLElement>(null)
  const highlightTimerRef = useRef<number | null>(null)
  const reduceMotion = useReducedMotion()
  const lightMotion = Boolean(reduceMotion) || isMobile
  const { scrollYProgress } = useScroll()
  const { scrollYProgress: khinkaliProgress } = useScroll({
    target: khinkaliSectionRef,
    offset: ['start end', 'end start'],
  })
  const { scrollYProgress: appProgress } = useScroll({
    target: appSectionRef,
    offset: ['start end', 'end start'],
  })
  const heroOrbY = useTransform(scrollYProgress, [0, 0.22], [0, reduceMotion ? 0 : 180])
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const khinkaliY = useTransform(khinkaliProgress, [0, 0.4, 0.68, 1], reduceMotion ? [0, 0, 0, 0] : [80, 0, -10, 34])
  const khinkaliRotate = useTransform(khinkaliProgress, [0, 0.4, 0.68, 1], reduceMotion ? [0, 0, 0, 0] : [-4, 0, 1, 4])
  const khinkaliScale = useTransform(khinkaliProgress, [0, 0.42, 0.68, 1], reduceMotion ? [1, 1, 1, 1] : [0.82, 1.08, 1.06, 0.92])
  const khinkaliOpacity = useTransform(khinkaliProgress, [0, 0.22, 0.78, 1], reduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0.72])
  const khinkaliBlur = useTransform(khinkaliProgress, [0, 0.3, 0.78, 1], reduceMotion ? ['blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(0px)'] : ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(3px)'])
  const appStageY = useTransform(appProgress, [0, 0.5, 1], reduceMotion ? [0, 0, 0] : [56, 0, -34])
  const appStageScale = useTransform(appProgress, [0, 0.46, 1], reduceMotion ? [1, 1, 1] : [0.965, 1, 0.985])

  const observedIds = useMemo(() => navItems.map(([id]) => id), [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.05, 0.25, 0.5] },
    )
    observedIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [observedIds])

  useEffect(() => {
    window.localStorage.setItem(demoStorageKey, JSON.stringify(addedSlots))
  }, [addedSlots])

  useEffect(() => {
    if (guidedStep === 2) highlightPlanner()
  }, [guidedStep])

  useEffect(() => () => {
    if (highlightTimerRef.current !== null) window.clearTimeout(highlightTimerRef.current)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    setMobileNavOpen(false)
  }

  const highlightPlanner = () => {
    setPlannerHighlighted(true)
    if (highlightTimerRef.current !== null) window.clearTimeout(highlightTimerRef.current)
    highlightTimerRef.current = window.setTimeout(() => setPlannerHighlighted(false), 1700)
  }

  const handleCalculated = (input: NutritionInput, result: NutritionResult) => {
    setPlannerGoal(input.goal)
    setTargetCalories(result.calories)
    setProgressVisible(true)
  }

  const handleShowMealPlan = () => {
    highlightPlanner()
    setProgressVisible(true)
    scrollTo('day-plan')
  }

  const handleToggleSlot = (slot: MealSlot) => {
    setAddedSlots((current) => current.includes(slot) ? current.filter((item) => item !== slot) : [...current, slot])
    setProgressVisible(true)
  }

  const handleQrAdd = () => {
    setPlannerGoal('lose')
    setAddedSlots((current) => current.includes('lunch') ? current : [...current, 'lunch'])
    setProgressVisible(true)
    highlightPlanner()
  }

  const resetDemo = () => {
    setAddedSlots([])
    setTargetCalories(null)
    setPlannerGoal('maintain')
    setProgressVisible(false)
  }

  const startGuidedDemo = () => {
    setPresentationActive(false)
    setGuidedStep(0)
    setProgressVisible(true)
  }

  const advanceGuidedDemo = () => {
    setGuidedStep((current) => {
      if (current === null || current >= guidedDemoStepsCount - 1) return null
      return current + 1
    })
  }

  const exitPresentation = useCallback(() => setPresentationActive(false), [])
  const dayComplete = addedSlots.length === mealSlots.length

  return (
    <div className="landing-shell">
      <BrandPreloader onComplete={() => setHeroReady(true)} />
      <CinematicBackground />
      <ScrollStoryProgress />
      <motion.div className="page-progress" style={isMobile ? undefined : { scaleX: progressScale }} />

      <header className="floating-nav" aria-label="Навигация по странице">
        <button className="nav-brand" onClick={() => scrollTo('top')} aria-label="Наверх">
          <img src={logoMain} alt="" />
          <span>ТОЧКА РОСТА</span>
        </button>
        <nav className={mobileNavOpen ? 'nav-links nav-links--open' : 'nav-links'}>
          {navItems.map(([id, label]) => (
            <button key={id} className={activeSection === id ? 'active' : ''} onClick={() => scrollTo(id)}>
              {label}
            </button>
          ))}
        </nav>
        <button className="nav-cta" onClick={() => scrollTo('implementation')}>Начать путь <ArrowIcon /></button>
        <button className="nav-menu" onClick={() => setMobileNavOpen((value) => !value)} aria-label="Открыть меню" aria-expanded={mobileNavOpen}>
          <span /><span />
        </button>
      </header>

      <main>
        <section className="hero" id="top">
          <motion.div className="hero-orbit" style={isMobile ? undefined : { y: heroOrbY }} aria-hidden="true">
            <span /><span /><span />
          </motion.div>
          <div className="hero-grid container">
            <div className="hero-copy">
              <motion.div className="hero-kicker" initial={{ opacity: 0 }} animate={heroReady ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.8, delay: 0.06 }}>
                <span>Healthy Hub</span><i />Тюмень · ARSIB Tower · 2026
              </motion.div>
              <motion.h1
                initial={reduceMotion ? false : { opacity: 0, y: isMobile ? 12 : 45, filter: isMobile ? 'blur(0px)' : 'blur(14px)' }}
                animate={heroReady
                  ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                  : { opacity: 0, y: isMobile ? 12 : 45, filter: isMobile ? 'blur(0px)' : 'blur(14px)' }}
                transition={{ duration: lightMotion ? 0.48 : 0.9, delay: isMobile ? 0.04 : 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                ТОЧКА<br /><em>РОСТА</em>
              </motion.h1>
              <motion.p className="hero-subtitle" initial={{ opacity: 0, y: 22 }} animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} transition={{ duration: 0.75, delay: 0.3 }}>
                Еда, расчёт и привычка.<br />В одной системе.
              </motion.p>
              <motion.p className="hero-lead" initial={{ opacity: 0, y: 22 }} animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} transition={{ duration: 0.75, delay: 0.42 }}>
                Магазин полезной еды и приложение, которое собирает рацион под твою цель.
              </motion.p>
              <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.7, delay: 0.56 }}>
                <button className="button button--primary" onClick={() => scrollTo('implementation')}>Начать путь <ArrowIcon /></button>
                <button className="button button--ghost" onClick={startGuidedDemo}>Запустить демо</button>
              </motion.div>
              <motion.p className="hero-note" initial={{ opacity: 0 }} animate={heroReady ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.72 }}>
                <span /> Первая точка — ARSIB Tower, Тюмень.
              </motion.p>
            </div>

            <motion.div
              className="hero-visual"
              initial={reduceMotion ? false : { opacity: 0, scale: isMobile ? 0.96 : 0.82, filter: isMobile ? 'blur(0px)' : 'blur(18px)' }}
              animate={heroReady
                ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
                : { opacity: 0, scale: isMobile ? 0.96 : 0.82, filter: isMobile ? 'blur(0px)' : 'blur(18px)' }}
              transition={{ duration: lightMotion ? 0.52 : 1.15, delay: isMobile ? 0.06 : 0.02, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="logo-halo" />
              <div className="hero-signal-silhouettes" aria-hidden="true"><span /><span /><span /></div>
              <div className="hero-emblem-sphere">
                <i aria-hidden="true" />
                <img src={logoMain} decoding="async" fetchPriority="high" alt="Логотип Точка Роста" className="hero-logo" />
              </div>
              <div className="hero-flow-card glass-card">
                <span>Персональный путь</span>
                <div><b>Данные</b><i /><b>Рацион</b><i /><b>Еда</b><i /><b>Поток</b></div>
              </div>
              <RhythmHeroCameo />
            </motion.div>
          </div>
          <button className="scroll-cue" onClick={() => scrollTo('concept')} aria-label="Прокрутить к концепции"><span>Листай</span><i /></button>
        </section>

        <section className="section concept" id="concept">
          <div className="container">
            <span className="section-index" aria-hidden="true">01 / 11</span>
            <SectionHeading eyebrow="Концепция" title="Рацион, который не нужно считать вручную." text="Задаёшь цель. Получаешь норму и блюда на день." />
            <div className="concept-grid">
              {conceptCards.map(([number, title, text], index) => (
                <Reveal className="concept-card glass-card" delay={index * 0.09} key={number}>
                  <div className="card-number">{number}</div>
                  <div className="concept-icon"><span /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <div className="card-corner" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section implementation" id="solution">
          <div className="container">
            <span className="section-index section-index--center" aria-hidden="true">02 / 11</span>
            <SectionHeading eyebrow="Решение" title="Цель → расчёт → готовые блюда." text="Четыре шага. Всё в одном ритме." align="center" />
            <div className="steps-line" aria-hidden="true">
              <motion.i
                initial={isMobile ? false : { scaleX: 0 }}
                whileInView={isMobile ? undefined : { scaleX: 1 }}
                viewport={{ once: isMobile, amount: 0.4 }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <div className="steps-grid">
              {steps.map(([number, title, text], index) => (
                <Reveal className="step" delay={index * 0.1} key={number}>
                  <div className="step-number">{number}</div>
                  <span className="step-dot" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <InteractiveHowItWorks
          guidedStep={guidedStep}
          onCalculated={handleCalculated}
          onShowMealPlan={handleShowMealPlan}
        />
        <InteractiveDayPlanner
          goal={plannerGoal}
          targetCalories={targetCalories}
          addedSlots={addedSlots}
          highlighted={plannerHighlighted}
          onGoalChange={(goal) => {
            setPlannerGoal(goal)
            setTargetCalories(null)
            setProgressVisible(true)
          }}
          onToggleSlot={handleToggleSlot}
          onDetails={() => scrollTo('food')}
          onReset={resetDemo}
        />
        <EcosystemSection />

        <section className="section location section-tech-grid" id="location">
          <div className="container location-grid">
            <div>
              <span className="section-index" aria-hidden="true">05 / 11</span>
              <SectionHeading eyebrow="Первая точка" title="Первый магазин — в Тюмени." text="ARSIB Tower — офисы, спорт и ежедневный трафик. Зайти за обедом легко." />
              <Reveal className="location-address">
                <span className="location-pin"><i /></span>
                <div><small>Первый магазин</small><strong>Тюмень · ARSIB Tower</strong><p>ул. Мельникайте, 116, корп. 1</p></div>
              </Reveal>
              <Reveal className="location-facts">
                {locationFacts.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}
              </Reveal>
            </div>
            <LocationMap />
          </div>
        </section>

        <QrScenarioSection isAdded={addedSlots.includes('lunch')} onAdd={handleQrAdd} />

        <section className="section app-section section-tech-grid" id="app" ref={appSectionRef}>
          <div className="container">
            <span className="section-index section-index--center" aria-hidden="true">07 / 11</span>
            <SectionHeading eyebrow="Приложение" title="Рацион из реальных блюд. В твоём ритме." text="Приложение считает норму, показывает блюда и помогает держать ритм без ручных подсчётов." align="center" />
            <motion.div className="phones-stage" style={isMobile ? undefined : { y: appStageY, scale: appStageScale }}>
              {!isMobile && (
                <>
                  <motion.div className="phone phone--far-left" initial={{ opacity: 0, x: 100, rotate: 0 }} whileInView={{ opacity: 0.58, x: 0, rotate: -5 }} viewport={{ once: false, amount: 0.18 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                    <div className="phone-shell"><AppPlaceholder type="home" /></div>
                  </motion.div>
                  <motion.div className="phone phone--left" initial={{ opacity: 0, y: 80, rotate: 0 }} whileInView={{ opacity: 0.94, y: 0, rotate: -2 }} viewport={{ once: false, amount: 0.18 }} transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}>
                    <div className="phone-shell phone-shell--image"><img src={appProfile} loading="lazy" decoding="async" alt="Экран профиля приложения Точка Роста" /></div>
                  </motion.div>
                </>
              )}
              <motion.div
                className="phone phone--center"
                initial={isMobile ? false : { opacity: 0, y: 100, scale: 0.9 }}
                whileInView={isMobile ? undefined : { opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: isMobile, amount: 0.18 }}
                transition={{ duration: 1, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="phone-shell phone-shell--live"><LiveFlowAppScreen /></div>
              </motion.div>
              {!isMobile && (
                <motion.div className="phone phone--right" initial={{ opacity: 0, x: -100, rotate: 0 }} whileInView={{ opacity: 0.88, x: 0, rotate: 4 }} viewport={{ once: false, amount: 0.18 }} transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}>
                  <div className="phone-shell phone-shell--live"><LiveFoodAppScreen /></div>
                </motion.div>
              )}
              <div className="phone-pedestal" />
            </motion.div>
            <div className="feature-strip glass-card">
              {appFeatures.map(([title, description], index) => (
                <Reveal className="feature-item" delay={index * 0.055} key={title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <RhythmSection />

        <UserDayJourney />

        <section className="section food-section" id="food">
          <div className="container">
            <span className="section-index" aria-hidden="true">09 / 11</span>
            <SectionHeading eyebrow="Ассортимент" title="Привычная еда — в полезной версии." text="Хинкали, боулы, салаты, десерты без сахара и напитки с высоким содержанием белка." />
            <div className="khinkali-showcase" ref={khinkaliSectionRef}>
              <Reveal className="khinkali-copy glass-card">
                <span className="showcase-label">Знакомый вкус · точные цифры</span>
                <h3>Хинкали остаются хинкали.<br /><em>Просто теперь — в рационе.</em></h3>
                <strong className="khinkali-statement">35 г белка · 460 ккал</strong>
                <p>Тонкое тесто, индейка или курица, понятные КБЖУ.</p>
                <div className="khinkali-points">
                  {[
                    'Более лёгкое тесто',
                    'Индейка или курица',
                    'Больше белка',
                    'Меньше лишнего жира',
                    'Контроль калорийности',
                    'Легко встроить в рацион',
                  ].map((point) => <span key={point}><CheckIcon />{point}</span>)}
                </div>
                <div className="khinkali-nutrition"><span><b>460</b> ккал</span><span><b>35 г</b> белка</span><strong>Вкус сохранён</strong></div>
              </Reveal>
              <div className="khinkali-stage" aria-label="ПП-хинкали — премиальная демонстрация блюда">
                <div className="khinkali-glow" />
                <motion.div
                  className="khinkali-object"
                  style={isMobile
                    ? { opacity: 1 }
                    : { y: khinkaliY, rotate: khinkaliRotate, scale: khinkaliScale, opacity: khinkaliOpacity, filter: khinkaliBlur }}
                >
                  <motion.div
                    className="khinkali-levitation"
                    animate={lightMotion ? undefined : { y: [-8, 8, -8] }}
                    transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <picture>
                      <source media="(max-width: 767px)" srcSet={khinkaliMobileImage} />
                      <img src={khinkaliImage} loading="lazy" decoding="async" alt="Хинкали в премиальной подаче" />
                    </picture>
                    <span className="khinkali-reflection" />
                  </motion.div>
                </motion.div>
                <div className="khinkali-pedestal"><i /><span>Healthy edition · 01</span></div>
                <div className="showcase-orbit showcase-orbit--one" />
                <div className="showcase-orbit showcase-orbit--two" />
              </div>
            </div>
            <Reveal className="food-grid-intro">
              <span>Коллекция</span><h3>Знакомые блюда. Честные цифры.</h3><p>Состав, КБЖУ и цена — без мелкого шрифта.</p>
            </Reveal>
            <div className="food-grid">
              {foodShowcase.map((food, index) => (
                <Reveal className="food-card glass-card" delay={(index % 3) * 0.08} key={food.name}>
                  <div className={`food-art food-art--photo food-art--${food.id}`} role="img" aria-label={`Визуал блюда: ${food.name}`}>
                    <span className="food-badge">{food.badge}</span><i /><i /><i />
                    <picture>
                      <source media="(max-width: 767px)" srcSet={food.mobileImage} />
                      <img src={food.image} loading="lazy" decoding="async" alt="" />
                    </picture>
                  </div>
                  <div className="food-info">
                    <h3>{food.name}</h3>
                    <div className="food-meta"><span><b>{food.calories}</b> ккал</span><span>Б <b>{food.protein}</b> г</span><strong>{food.price} ₽</strong></div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ComparisonSection />

        <section className="section flow-section section-tech-grid" id="flow">
          <div className="container flow-grid">
            {!isMobile && (
              <div className="flow-copy">
                <span className="section-index" aria-hidden="true">10 / 11</span>
                <SectionHeading eyebrow="Система «Поток»" title="Регулярность превращается в результат." text="Закрывай дни питания, сохраняй серию и открывай награды за стабильность." />
                <Reveal className="flow-current glass-card">
                  <div><small>Текущий поток</small><strong>{dayComplete ? 8 : 7} дней</strong></div>
                  <div className="flow-progress"><motion.i initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: false, amount: 0.5 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} /></div>
                  <span>{dayComplete ? 'День закрыт. Поток продолжается.' : 'До следующей награды — 7 дней'}</span>
                </Reveal>
              </div>
            )}
            <Reveal delay={0.14}><FlowExperience currentDays={dayComplete ? 8 : 7} dayComplete={dayComplete} /></Reveal>
          </div>
        </section>

        <CinematicFinalCTA onCalculate={() => scrollTo('implementation')} onDemo={startGuidedDemo} />
      </main>

      <DailyProgress
        visible={progressVisible}
        addedSlots={addedSlots}
        onClose={() => setProgressVisible(false)}
        onOpenFlow={() => scrollTo('flow')}
      />
      <GuidedDemo step={guidedStep} onNext={advanceGuidedDemo} onSkip={() => setGuidedStep(null)} />
      <PresentationMode active={presentationActive} isMobile={isMobile} onExit={exitPresentation} />

      <footer>
        <RhythmFooterEasterEgg />
        <div className="container">
          <span>© 2026 Точка Роста</span>
          <span>Проект Луки Чихладзе, город Тюмень</span>
          {!isMobile && (
            <button
              className="presentation-toggle"
              type="button"
              onClick={() => {
                setGuidedStep(null)
                setPresentationActive(true)
              }}
            >
              Режим презентации
            </button>
          )}
        </div>
      </footer>
    </div>
  )
}
