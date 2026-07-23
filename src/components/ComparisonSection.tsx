import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import '../styles/comparison-section.css'

const comparisonRows = [
  ['Обычные магазины', 'Продают продукты', 'Готовый рацион под твою цель'],
  ['Калькуляторы калорий', 'Считают цифры', 'Связываем расчёт с реальными блюдами'],
  ['Доставка рационов', 'Привозит наборы', 'Точка, куда удобно зайти каждый день'],
  ['Фитнес-бары', 'Продают перекусы', 'Питание, приложение и мотивация вместе'],
]

function ComparisonCheck() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m4 10 4 4 8-9" />
    </svg>
  )
}

export function ComparisonSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = Boolean(useReducedMotion())
  const isInView = useInView(sectionRef, { amount: 0.18 })

  return (
    <section
      ref={sectionRef}
      className={`section comparison-section ${isInView && !reduceMotion ? 'comparison-section--visible' : ''}`}
      id="why"
      aria-labelledby="comparison-section-title"
    >
      <span className="comparison-section__ambient" aria-hidden="true" />

      <div className="container">
        <motion.header
          className="comparison-section__heading"
          initial={reduceMotion ? false : { opacity: 0, y: 46, filter: 'blur(9px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.54 }}
          transition={{ duration: reduceMotion ? 0 : 0.82, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="eyebrow"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.7 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 0.05 }}
          >
            <i /> Почему мы
          </motion.span>
          <h2 id="comparison-section-title">Не просто магазин. Экосистема питания.</h2>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.7 }}
            transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            Готовые блюда, понятный расчёт и приложение, которое помогает держать ритм каждый день.
          </motion.p>
        </motion.header>

        <motion.div
          className="comparison-section__panel"
          role="table"
          aria-label="Сравнение Точки Роста с привычными форматами"
          aria-colcount={3}
          aria-rowcount={comparisonRows.length + 1}
          initial={reduceMotion ? false : { opacity: 0, y: 34, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.16 }}
          transition={{ duration: reduceMotion ? 0 : 0.76, delay: reduceMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="comparison-section__head" role="row">
            <span role="columnheader">Обычное решение</span>
            <span role="columnheader">Привычный формат</span>
            <strong role="columnheader"><i /> Точка Роста</strong>
          </div>

          <div className="comparison-section__rows" role="rowgroup">
            {comparisonRows.map(([type, common, advantage], index) => (
              <motion.div
                className="comparison-section__row"
                role="row"
                key={type}
                initial={reduceMotion ? false : { opacity: 0, y: 26, filter: 'blur(5px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                whileHover={reduceMotion ? undefined : { y: -2 }}
                viewport={{ once: false, amount: 0.42 }}
                transition={{ duration: reduceMotion ? 0 : 0.62, delay: reduceMotion ? 0 : index * 0.085, ease: [0.16, 1, 0.3, 1] }}
              >
                <strong className="comparison-section__type" role="cell">{type}</strong>
                <span className="comparison-section__common" role="cell">
                  <small>Привычный формат</small>
                  {common}
                </span>
                <motion.span
                  className="comparison-section__advantage"
                  role="cell"
                  initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: reduceMotion ? 0 : 0.58, delay: reduceMotion ? 0 : 0.13 + index * 0.085, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.b
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.35, rotate: -18 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: false, amount: 0.6 }}
                    transition={{ duration: reduceMotion ? 0 : 0.46, delay: reduceMotion ? 0 : 0.24 + index * 0.085, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ComparisonCheck />
                  </motion.b>
                  <span className="comparison-section__advantage-copy">
                    <small>Точка Роста</small>
                    {advantage}
                  </span>
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ComparisonSection
