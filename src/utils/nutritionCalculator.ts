export type Gender = 'male' | 'female'
export type Goal = 'lose' | 'maintain' | 'gain'
export type TrainingLevel = 'none' | 'low' | 'medium' | 'high' | 'athlete'

export interface NutritionInput {
  name?: string
  gender: Gender
  age: number
  heightCm: number
  weightKg: number
  trainingLevel: TrainingLevel
  goal: Goal
  preference?: string
}

export interface NutritionResult {
  bmr: number
  tdee: number
  calories: number
  protein: number
  fat: number
  carbs: number
  goalLabel: string
  activityLabel: string
  recommendation: string
}

const activityMap: Record<TrainingLevel, number> = {
  none: 1.2,
  low: 1.375,
  medium: 1.55,
  high: 1.725,
  athlete: 1.9,
}

const activityLabels: Record<TrainingLevel, string> = {
  none: 'минимальная активность',
  low: '1–2 тренировки в неделю',
  medium: '3–4 тренировки в неделю',
  high: '5–6 тренировок в неделю',
  athlete: '7+ тренировок в неделю',
}

const goalLabels: Record<Goal, string> = {
  lose: 'похудение',
  maintain: 'баланс',
  gain: 'набор массы',
}

function roundToNearest10(value: number) {
  return Math.round(value / 10) * 10
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function calculateNutrition(input: NutritionInput): NutritionResult {
  const { gender, age, heightCm, weightKg, trainingLevel, goal } = input

  const bmr = gender === 'male'
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161

  const tdee = bmr * activityMap[trainingLevel]

  const goalMultiplier: Record<Goal, number> = {
    lose: 0.85,
    maintain: 1,
    gain: 1.12,
  }

  const rawCalories = tdee * goalMultiplier[goal]
  const calories = roundToNearest10(clamp(rawCalories, 1300, 4200))

  const macroSplit: Record<Goal, { protein: number; fat: number; carbs: number }> = {
    lose: { protein: 0.3, fat: 0.25, carbs: 0.45 },
    maintain: { protein: 0.25, fat: 0.25, carbs: 0.5 },
    gain: { protein: 0.25, fat: 0.25, carbs: 0.5 },
  }

  const split = macroSplit[goal]
  const protein = Math.round((calories * split.protein) / 4)
  const fat = Math.round((calories * split.fat) / 9)
  const carbs = Math.round((calories * split.carbs) / 4)

  const recommendationMap: Record<Goal, string> = {
    lose: 'Сделаем рацион легче: больше белка, контролируемая калорийность и блюда, которые удобно встроить в день.',
    maintain: 'Сохраняем баланс: полноценный день питания без ручного подсчёта и хаоса в выборе еды.',
    gain: 'Добавим больше энергии: сытные блюда, белок и углеводы для восстановления после тренировок.',
  }

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    calories,
    protein,
    fat,
    carbs,
    goalLabel: goalLabels[goal],
    activityLabel: activityLabels[trainingLevel],
    recommendation: recommendationMap[goal],
  }
}
