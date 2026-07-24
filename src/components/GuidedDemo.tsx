import { useEffect } from 'react'
import '../styles/user-journey-demo.css'

type GuidedDemoProps = {
  step: number | null
  onNext: () => void
  onSkip: () => void
}

const steps = [
  { title: 'Выбери цель', body: 'Начни с параметров и цели питания.', selector: '#implementation', progress: 0.08 },
  { title: 'Получен расчёт', body: 'Система рассчитала дневную норму и КБЖУ.', selector: '#implementation', progress: 0.42 },
  { title: 'Вот пример рациона', body: 'Рацион собран из реальных блюд проекта.', selector: '#day-plan', progress: 0.12 },
  { title: 'Отсканируй блюдо', body: 'Основная камера считывает QR на упаковке.', selector: '#qr', progress: 0.3 },
  { title: 'Добавь его в день', body: 'Нажми «Добавить в рацион» на карточке Цезаря.', selector: '#qr', progress: 0.7 },
  { title: 'Продолжи Поток', body: 'Закрытые дни формируют серию и открывают этапы.', selector: '#flow', progress: 0.12 },
] as const

export function GuidedDemo({ step, onNext, onSkip }: GuidedDemoProps) {
  const activeStep = step === null ? null : steps[step]

  useEffect(() => {
    document.body.classList.toggle('guided-demo-active', Boolean(activeStep))
    document.querySelectorAll('.guided-demo-target').forEach((element) => element.classList.remove('guided-demo-target'))

    if (!activeStep || step === null) return () => document.body.classList.remove('guided-demo-active')

    const stepClass = `guided-demo-step-${step + 1}`
    document.body.classList.add(stepClass)
    const target = document.querySelector<HTMLElement>(activeStep.selector)
    target?.classList.add('guided-demo-target')

    let frame = 0
    if (target) {
      // Stop the previous guided scroll before starting the next story beat.
      // This is especially important inside the long sticky QR scene.
      window.scrollTo({ top: window.scrollY, behavior: 'auto' })
      frame = window.requestAnimationFrame(() => {
        const sectionTop = target.getBoundingClientRect().top + window.scrollY
        const top = sectionTop + target.offsetHeight * activeStep.progress - window.innerHeight * 0.42
        const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        window.scrollTo({ top: Math.max(0, top), behavior })
      })
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      target?.classList.remove('guided-demo-target')
      document.body.classList.remove(stepClass)
      document.body.classList.remove('guided-demo-active')
    }
  }, [activeStep, step])

  if (!activeStep || step === null) return null

  return (
    <>
      <div className="guided-demo__scrim" aria-hidden="true" />
      <aside className="guided-demo" aria-live="polite" aria-label={`Шаг ${step + 1} из ${steps.length}: ${activeStep.title}`}>
        <div className="guided-demo__topline">
          <span>GUIDED DEMO</span>
          <strong>{step + 1} / {steps.length}</strong>
        </div>
        <div className="guided-demo__progress"><i style={{ transform: `scaleX(${(step + 1) / steps.length})` }} /></div>
        <h3>{activeStep.title}</h3>
        <p>{activeStep.body}</p>
        <div className="guided-demo__actions">
          <button type="button" onClick={onSkip}>Пропустить</button>
          <button type="button" onClick={onNext}>{step === steps.length - 1 ? 'Завершить' : 'Далее'} →</button>
        </div>
      </aside>
    </>
  )
}

export const guidedDemoStepsCount = steps.length

export default GuidedDemo
