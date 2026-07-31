import type { RhythmState } from './rhythmAssets'

export type RhythmStage = {
  id: 'support' | 'analyze' | 'suggest' | 'grow'
  number: string
  label: string
  title: string
  text: string
  message: string
  state: RhythmState
}

export const rhythmStages: RhythmStage[] = [
  {
    id: 'support',
    number: '01',
    label: 'Поддержка',
    title: 'Поддерживает, а не осуждает',
    text: 'Спокойно отмечает прогресс и помогает продолжить день без давления.',
    message: 'Обед добавлен. Баланс обновлён.',
    state: 'supportive',
  },
  {
    id: 'analyze',
    number: '02',
    label: 'Анализ',
    title: 'Видит дневной баланс',
    text: 'Смотрит на КБЖУ и заполненные приёмы пищи, учитывая твою цель.',
    message: 'До ориентира по белку осталось 38 г.',
    state: 'thinking',
  },
  {
    id: 'suggest',
    number: '03',
    label: 'Следующий шаг',
    title: 'Предлагает подходящий приём пищи',
    text: 'Показывает варианты из ассортимента, которые подходят к текущему дню.',
    message: 'Нашёл несколько подходящих вариантов ужина.',
    state: 'food',
  },
  {
    id: 'grow',
    number: '04',
    label: 'Рост',
    title: 'Развивается вместе с Потоком',
    text: 'Становится ярче вместе с серией дней и помогает сохранять ритм.',
    message: 'Все основные приёмы заполнены. Поток продолжается.',
    state: 'motivated',
  },
]

export const rhythmFeatures = [
  ['Баланс', 'Сверяет дневной ориентир'],
  ['Выбор', 'Подбирает следующий шаг'],
  ['Поддержка', 'Помогает сохранять Поток'],
] as const
