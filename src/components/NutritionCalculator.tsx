import { type FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { foodShowcase, type FoodShowcaseItem } from '../data/foodShowcase'
import { RhythmMessageCard } from '../features/rhythm/components/RhythmMessageCard'
import {
  calculateNutrition,
  type Gender,
  type Goal,
  type NutritionInput,
  type NutritionResult,
  type TrainingLevel,
} from '../utils/nutritionCalculator'
import '../styles/nutrition-calculator.css'

type CalculatorDraft = {
  name: string
  gender: Gender
  age: string
  heightCm: string
  weightKg: string
  trainingLevel: TrainingLevel
  goal: Goal
  preference: string
}

type NutritionCalculatorProps = {
  initialInput?: NutritionInput | null
  onCalculated: (input: NutritionInput, result: NutritionResult) => void
}

type NutritionResultPanelProps = {
  input: NutritionInput
  result: NutritionResult
  reduceMotion: boolean
  onEdit: () => void
  onShowFood: () => void
}

const defaultDraft: CalculatorDraft = {
  name: '',
  gender: 'male',
  age: '30',
  heightCm: '178',
  weightKg: '76',
  trainingLevel: 'medium',
  goal: 'maintain',
  preference: 'all',
}

const trainingOptions: Array<{ value: TrainingLevel; label: string }> = [
  { value: 'none', label: '0 тренировок' },
  { value: 'low', label: '1–2 тренировки' },
  { value: 'medium', label: '3–4 тренировки' },
  { value: 'high', label: '5–6 тренировок' },
  { value: 'athlete', label: '7+ тренировок' },
]

const preferenceOptions = [
  { value: 'all', label: 'Ем всё' },
  { value: 'protein', label: 'Больше белка' },
  { value: 'no-sugar', label: 'Без сахара' },
  { value: 'light', label: 'Лёгкие блюда' },
  { value: 'filling', label: 'Сытный рацион' },
]

const mealPlanByPreference: Record<string, string[]> = {
  all: ['syrniki', 'bowl', 'protein-shake', 'khinkali'],
  protein: ['syrniki', 'caesar', 'protein-shake', 'bowl'],
  'no-sugar': ['syrniki', 'bowl', 'brownie', 'caesar'],
  light: ['syrniki', 'caesar', 'protein-shake', 'bowl'],
  filling: ['syrniki', 'khinkali', 'protein-shake', 'bowl'],
}

const mealLabels = ['Завтрак', 'Обед', 'Перекус', 'Ужин']
const mealShares = [0.25, 0.35, 0.15, 0.25]

function draftFromInput(input?: NutritionInput | null): CalculatorDraft {
  if (!input) return defaultDraft

  return {
    name: input.name ?? '',
    gender: input.gender,
    age: String(input.age),
    heightCm: String(input.heightCm),
    weightKg: String(input.weightKg),
    trainingLevel: input.trainingLevel,
    goal: input.goal,
    preference: input.preference ?? 'all',
  }
}

function getMealPlan(preference: string | undefined) {
  const ids = mealPlanByPreference[preference ?? 'all'] ?? mealPlanByPreference.all
  return ids
    .map((id) => foodShowcase.find((food) => food.id === id))
    .filter((food): food is FoodShowcaseItem => Boolean(food))
}

export function NutritionCalculator({ initialInput, onCalculated }: NutritionCalculatorProps) {
  const [draft, setDraft] = useState<CalculatorDraft>(() => draftFromInput(initialInput))

  const update = <Key extends keyof CalculatorDraft>(key: Key, value: CalculatorDraft[Key]) => {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const input: NutritionInput = {
      name: draft.name.trim() || undefined,
      gender: draft.gender,
      age: Number(draft.age),
      heightCm: Number(draft.heightCm),
      weightKg: Number(draft.weightKg),
      trainingLevel: draft.trainingLevel,
      goal: draft.goal,
      preference: draft.preference,
    }

    onCalculated(input, calculateNutrition(input))
  }

  return (
    <form className="nutrition-calculator" onSubmit={handleSubmit}>
      <div className="is-visual__topline">
        <span>Калькулятор / Mifflin–St Jeor</span>
        <strong><i /> Локальный расчёт</strong>
      </div>

      <div className="nutrition-calculator__intro">
        <strong>Соберём твой день питания</strong>
        <p>Введи параметры — расчёт займёт пару секунд.</p>
      </div>

      <div className="nutrition-calculator__form-grid">
        <label className="nutrition-calculator__field nutrition-calculator__field--name">
          <span>Имя</span>
          <input
            name="name"
            type="text"
            value={draft.name}
            onChange={(event) => update('name', event.target.value)}
            placeholder="Как к тебе обращаться"
            maxLength={32}
            autoComplete="given-name"
          />
        </label>

        <fieldset className="nutrition-calculator__field nutrition-calculator__field--gender">
          <legend>Пол</legend>
          <div className="nutrition-calculator__segments nutrition-calculator__segments--two">
            {([
              ['male', 'Мужской'],
              ['female', 'Женский'],
            ] as Array<[Gender, string]>).map(([value, label]) => (
              <label key={value}>
                <input
                  type="radio"
                  name="gender"
                  value={value}
                  checked={draft.gender === value}
                  onChange={() => update('gender', value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="nutrition-calculator__field">
          <span>Возраст</span>
          <span className="nutrition-calculator__input-unit">
            <input
              name="age"
              type="number"
              inputMode="numeric"
              min="14"
              max="90"
              required
              value={draft.age}
              onChange={(event) => update('age', event.target.value)}
            />
            <i>лет</i>
          </span>
        </label>

        <label className="nutrition-calculator__field">
          <span>Рост</span>
          <span className="nutrition-calculator__input-unit">
            <input
              name="height"
              type="number"
              inputMode="numeric"
              min="130"
              max="230"
              required
              value={draft.heightCm}
              onChange={(event) => update('heightCm', event.target.value)}
            />
            <i>см</i>
          </span>
        </label>

        <label className="nutrition-calculator__field">
          <span>Вес</span>
          <span className="nutrition-calculator__input-unit">
            <input
              name="weight"
              type="number"
              inputMode="decimal"
              min="35"
              max="250"
              step="0.1"
              required
              value={draft.weightKg}
              onChange={(event) => update('weightKg', event.target.value)}
            />
            <i>кг</i>
          </span>
        </label>

        <label className="nutrition-calculator__field nutrition-calculator__field--wide">
          <span>Тренировки в неделю</span>
          <select
            name="trainingLevel"
            value={draft.trainingLevel}
            onChange={(event) => update('trainingLevel', event.target.value as TrainingLevel)}
          >
            {trainingOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>

        <label className="nutrition-calculator__field nutrition-calculator__field--wide">
          <span>Предпочтение</span>
          <select
            name="preference"
            value={draft.preference}
            onChange={(event) => update('preference', event.target.value)}
          >
            {preferenceOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>

        <fieldset className="nutrition-calculator__field nutrition-calculator__field--goal">
          <legend>Цель</legend>
          <div className="nutrition-calculator__segments nutrition-calculator__segments--three">
            {([
              ['lose', 'Похудение'],
              ['maintain', 'Баланс'],
              ['gain', 'Набор массы'],
            ] as Array<[Goal, string]>).map(([value, label]) => (
              <label key={value}>
                <input
                  type="radio"
                  name="goal"
                  value={value}
                  checked={draft.goal === value}
                  onChange={() => update('goal', value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <button className="nutrition-calculator__submit" type="submit">
        Рассчитать рацион <span aria-hidden="true">→</span>
      </button>
      <p className="nutrition-calculator__note">Демонстрационный расчёт, не медицинская рекомендация.</p>
    </form>
  )
}

export function NutritionResultPanel({
  input,
  result,
  reduceMotion,
  onEdit,
  onShowFood,
}: NutritionResultPanelProps) {
  const meals = getMealPlan(input.preference)
  const macros = [
    { label: 'Белки', value: result.protein, unit: 'г' },
    { label: 'Жиры', value: result.fat, unit: 'г' },
    { label: 'Углеводы', value: result.carbs, unit: 'г' },
  ]

  return (
    <div className="nutrition-result" aria-live="polite">
      <div className="is-visual__topline">
        <span>Рацион / готов</span>
        <strong><i /> Mifflin–St Jeor</strong>
      </div>

      <div className="nutrition-result__hero">
        <div>
          <span>{input.name ? `${input.name}, твоя норма` : 'Твоя дневная норма'}</span>
          <strong>{result.calories.toLocaleString('ru-RU')} <small>ккал</small></strong>
          <p>{result.goalLabel} · {result.activityLabel}</p>
        </div>
        <span className="nutrition-result__ready">готово</span>
      </div>

      <div className="nutrition-result__macros" aria-label="Рассчитанные белки, жиры и углеводы">
        {macros.map((macro, index) => (
          <motion.div
            key={macro.label}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.1 + index * 0.08 }}
          >
            <span>{macro.label}</span>
            <strong>{macro.value}<small>{macro.unit}</small></strong>
          </motion.div>
        ))}
      </div>

      <p className="nutrition-result__recommendation">{result.recommendation}</p>
      <RhythmMessageCard
        className="rhythm-calculator-message"
        state="supportive"
        eyebrow="Ритм · ориентир готов"
        message="Готово. Это твой текущий ориентир — его всегда можно изменить."
      />
      <p className="nutrition-result__journey-message">
        <i /> Расчёт готов. Ниже — пример дня из ассортимента «Точки Роста».
      </p>

      <div className="nutrition-result__plan-head">
        <div>
          <strong>Примерный день</strong>
          <span>Мы собрали примерный день питания из блюд Точки Роста.</span>
        </div>
        <small>Базовый обмен: {result.bmr} ккал</small>
      </div>

      <div className="nutrition-result__meals">
        {meals.map((meal, index) => (
          <motion.article
            key={`${meal.id}-${mealLabels[index]}`}
            initial={reduceMotion ? false : { opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.48, delay: reduceMotion ? 0 : 0.28 + index * 0.07 }}
          >
            <picture>
              <source media="(max-width: 767px)" srcSet={meal.mobileImage} />
              <img src={meal.image} alt="" loading="lazy" decoding="async" />
            </picture>
            <div>
              <span>{mealLabels[index]}</span>
              <strong>{meal.name}</strong>
            </div>
            <b>≈ {Math.round((result.calories * mealShares[index]) / 10) * 10} ккал</b>
          </motion.article>
        ))}
      </div>

      <div className="nutrition-result__actions">
        <button type="button" onClick={onEdit}>Изменить данные</button>
        <button type="button" onClick={onShowFood}>Показать пример рациона <span aria-hidden="true">→</span></button>
      </div>
      <p className="nutrition-result__note">MVP-демонстрация. Точный рацион зависит от состава и размера порций.</p>
    </div>
  )
}
