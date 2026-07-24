import type { Goal } from '../utils/nutritionCalculator'
import { productsById, type Product, type ProductId } from './products'

export type MealSlot = 'breakfast' | 'lunch' | 'snack' | 'dinner'

export type MealPlanEntry = {
  slot: MealSlot
  label: string
  productIds: ProductId[]
}

export type MealPlan = {
  goal: Goal
  label: string
  description: string
  entries: MealPlanEntry[]
}

export const mealPlans: Record<Goal, MealPlan> = {
  lose: {
    goal: 'lose',
    label: 'Снижение веса',
    description: 'Лёгкий день с акцентом на белок и понятные порции.',
    entries: [
      { slot: 'breakfast', label: 'Завтрак', productIds: ['syrniki'] },
      { slot: 'lunch', label: 'Обед', productIds: ['caesar'] },
      { slot: 'snack', label: 'Перекус', productIds: ['protein-shake'] },
      { slot: 'dinner', label: 'Ужин', productIds: ['bowl'] },
    ],
  },
  maintain: {
    goal: 'maintain',
    label: 'Баланс',
    description: 'Ровный рацион на день без жёстких ограничений.',
    entries: [
      { slot: 'breakfast', label: 'Завтрак', productIds: ['syrniki'] },
      { slot: 'lunch', label: 'Обед', productIds: ['bowl'] },
      { slot: 'snack', label: 'Перекус', productIds: ['brownie'] },
      { slot: 'dinner', label: 'Ужин', productIds: ['khinkali'] },
    ],
  },
  gain: {
    goal: 'gain',
    label: 'Набор массы',
    description: 'Больше энергии и белка для восстановления и роста.',
    entries: [
      { slot: 'breakfast', label: 'Завтрак', productIds: ['syrniki', 'protein-shake'] },
      { slot: 'lunch', label: 'Обед', productIds: ['bowl'] },
      { slot: 'snack', label: 'Перекус', productIds: ['brownie'] },
      { slot: 'dinner', label: 'Ужин', productIds: ['khinkali'] },
    ],
  },
}

export function getEntryProducts(entry: MealPlanEntry): Product[] {
  return entry.productIds.map((id) => productsById[id])
}

export function getEntryTotals(entry: MealPlanEntry) {
  return getEntryProducts(entry).reduce(
    (totals, product) => ({
      calories: totals.calories + product.calories,
      protein: totals.protein + product.protein,
      fat: totals.fat + product.fat,
      carbs: totals.carbs + product.carbs,
      price: totals.price + product.price,
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0, price: 0 },
  )
}

export function getPlanTotals(plan: MealPlan) {
  return plan.entries.reduce(
    (totals, entry) => {
      const entryTotals = getEntryTotals(entry)
      return {
        calories: totals.calories + entryTotals.calories,
        protein: totals.protein + entryTotals.protein,
        fat: totals.fat + entryTotals.fat,
        carbs: totals.carbs + entryTotals.carbs,
        price: totals.price + entryTotals.price,
      }
    },
    { calories: 0, protein: 0, fat: 0, carbs: 0, price: 0 },
  )
}
