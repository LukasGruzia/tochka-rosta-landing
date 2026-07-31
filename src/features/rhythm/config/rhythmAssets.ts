export const rhythmAssets = {
  idle: '/rhythm/rhythm-idle.webp',
  thinking: '/rhythm/rhythm-thinking.webp',
  happy: '/rhythm/rhythm-motivated.webp',
  motivated: '/rhythm/rhythm-motivated.webp',
  caring: '/rhythm/rhythm-idle.webp',
  surprised: '/rhythm/rhythm-motivated.webp',
  supportive: '/rhythm/rhythm-idle.webp',
  advice: '/rhythm/rhythm-food.webp',
  food: '/rhythm/rhythm-food.webp',
  activity: '/rhythm/rhythm-motivated.webp',
  celebrating: '/rhythm/rhythm-motivated.webp',
  sleeping: '/rhythm/rhythm-idle.webp',
} as const

export type RhythmState = keyof typeof rhythmAssets

const compactFiles = {
  idle: '/rhythm/rhythm-idle-400.webp',
  thinking: '/rhythm/rhythm-thinking-400.webp',
  motivated: '/rhythm/rhythm-motivated-400.webp',
  food: '/rhythm/rhythm-food-400.webp',
} as const

const compactStateMap: Record<RhythmState, keyof typeof compactFiles> = {
  idle: 'idle',
  thinking: 'thinking',
  happy: 'motivated',
  motivated: 'motivated',
  caring: 'idle',
  surprised: 'motivated',
  supportive: 'idle',
  advice: 'food',
  food: 'food',
  activity: 'motivated',
  celebrating: 'motivated',
  sleeping: 'idle',
}

export function getRhythmCompactAsset(state: RhythmState) {
  return compactFiles[compactStateMap[state]]
}
