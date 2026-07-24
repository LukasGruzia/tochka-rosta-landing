import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { getEntryProducts, getEntryTotals, getPlanTotals, mealPlans, type MealSlot } from '../data/mealPlans'
import type { Goal } from '../utils/nutritionCalculator'
import '../styles/user-journey-demo.css'

type InteractiveDayPlannerProps = {
  goal: Goal
  targetCalories?: number | null
  addedSlots: MealSlot[]
  highlighted?: boolean
  onGoalChange: (goal: Goal) => void
  onToggleSlot: (slot: MealSlot) => void
  onDetails: () => void
  onReset: () => void
}

const goals: Goal[] = ['lose', 'maintain', 'gain']

function scaled(value: number, factor: number) {
  return Math.round(value * factor)
}

export function InteractiveDayPlanner({
  goal,
  targetCalories,
  addedSlots,
  highlighted = false,
  onGoalChange,
  onToggleSlot,
  onDetails,
  onReset,
}: InteractiveDayPlannerProps) {
  const reduceMotion = Boolean(useReducedMotion())
  const plan = mealPlans[goal]
  const baseTotals = getPlanTotals(plan)
  const portionFactor = targetCalories
    ? Math.max(0.85, Math.min(1.25, targetCalories / baseTotals.calories))
    : 1
  const totals = {
    calories: scaled(baseTotals.calories, portionFactor),
    protein: scaled(baseTotals.protein, portionFactor),
    fat: scaled(baseTotals.fat, portionFactor),
    carbs: scaled(baseTotals.carbs, portionFactor),
    price: baseTotals.price,
  }

  return (
    <section
      className={`section day-planner section-tech-grid ${highlighted ? 'day-planner--highlighted' : ''}`}
      id="day-plan"
      aria-labelledby="day-planner-title"
    >
      <div className="container day-planner__container">
        <motion.header
          className="section-heading section-heading--center day-planner__heading"
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: reduceMotion ? 0 : 0.68, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-index section-index--center">ДЕМО / РАЦИОН</span>
          <span className="eyebrow"><i /> Интерактивная демонстрация</span>
          <h2 id="day-planner-title">Собери свой день питания.</h2>
          <p>Выбери цель — система покажет пример рациона из блюд, которые можно купить в «Точке Роста».</p>
        </motion.header>

        <div className="day-planner__goals" role="group" aria-label="Цель рациона">
          {goals.map((goalOption) => (
            <button
              type="button"
              key={goalOption}
              className={goal === goalOption ? 'is-active' : ''}
              aria-pressed={goal === goalOption}
              onClick={() => onGoalChange(goalOption)}
            >
              {mealPlans[goalOption].label}
            </button>
          ))}
        </div>

        <div className="day-planner__context" aria-live="polite">
          <span><i /> {plan.description}</span>
          {targetCalories && (
            <strong>
              Ориентир расчёта: {targetCalories.toLocaleString('ru-RU')} ккал
              <small>Порции масштабированы · демо</small>
            </strong>
          )}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="day-planner__grid"
            key={`${goal}-${targetCalories ?? 'base'}`}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            {plan.entries.map((entry, index) => {
              const entryProducts = getEntryProducts(entry)
              const primaryProduct = entryProducts[0]
              const entryTotals = getEntryTotals(entry)
              const isAdded = addedSlots.includes(entry.slot)
              const displayName = entryProducts.map(({ name }) => name.replace('Протеиновый коктейль', 'протеиновый коктейль')).join(' и ')

              return (
                <motion.article
                  className={`day-meal-card ${isAdded ? 'day-meal-card--added' : ''}`}
                  key={entry.slot}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.48, delay: reduceMotion ? 0 : index * 0.06 }}
                >
                  <div className="day-meal-card__image">
                    <picture>
                      <source media="(max-width: 767px)" srcSet={primaryProduct.mobileImage} />
                      <img src={primaryProduct.image} alt={displayName} loading="lazy" decoding="async" />
                    </picture>
                    <span>{entry.label}</span>
                    {entryProducts.length > 1 && <small>2 блюда</small>}
                  </div>
                  <div className="day-meal-card__body">
                    <div className="day-meal-card__title">
                      <h3>{displayName}</h3>
                      {isAdded && <span><i /> Добавлено</span>}
                    </div>
                    <div className="day-meal-card__macros">
                      <span><b>{scaled(entryTotals.calories, portionFactor)}</b> ккал</span>
                      <span>Б <b>{scaled(entryTotals.protein, portionFactor)}</b></span>
                      <span>Ж <b>{scaled(entryTotals.fat, portionFactor)}</b></span>
                      <span>У <b>{scaled(entryTotals.carbs, portionFactor)}</b></span>
                    </div>
                    <div className="day-meal-card__actions">
                      <strong>{entryTotals.price} ₽</strong>
                      <button type="button" className="day-meal-card__details" onClick={onDetails}>Подробнее</button>
                      <button
                        type="button"
                        className="day-meal-card__add"
                        aria-label={isAdded
                          ? `Убрать из демонстрационного рациона: ${displayName}`
                          : `Добавить в демонстрационный рацион: ${displayName}`}
                        onClick={() => onToggleSlot(entry.slot)}
                      >
                        {isAdded ? '✓' : '+'}
                      </button>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="day-planner__summary"
          aria-live="polite"
          animate={highlighted && !reduceMotion ? { boxShadow: ['0 0 0 rgba(141,255,53,0)', '0 0 42px rgba(141,255,53,.18)', '0 0 0 rgba(141,255,53,0)'] } : undefined}
          transition={{ duration: 1.5 }}
        >
          <div>
            <span>Итого за день</span>
            <motion.strong key={totals.calories} initial={reduceMotion ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
              {totals.calories.toLocaleString('ru-RU')} <small>ккал</small>
            </motion.strong>
          </div>
          {[
            ['Белки', totals.protein, 'г'],
            ['Жиры', totals.fat, 'г'],
            ['Углеводы', totals.carbs, 'г'],
            ['Стоимость', totals.price.toLocaleString('ru-RU'), '₽'],
          ].map(([label, value, unit]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value} <small>{unit}</small></strong>
            </div>
          ))}
          <button type="button" onClick={onReset}>Сбросить демо</button>
        </motion.div>

        <p className="day-planner__disclaimer">
          Демонстрационный рацион. Финальные значения будут рассчитываться по технологическим картам блюд.
        </p>
      </div>
    </section>
  )
}

export default InteractiveDayPlanner
