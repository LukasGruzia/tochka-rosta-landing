import type { RhythmState } from './rhythmAssets'

export type RhythmLayoutPreset = {
  scale: number
  offsetX: number
  offsetY: number
}

/**
 * Optical adjustments applied after the raster assets have been normalized.
 * Values stay deliberately small: asset preparation handles the real centering.
 */
export const rhythmLayout: Record<RhythmState, RhythmLayoutPreset> = {
  idle: { scale: 1, offsetX: 0, offsetY: 0 },
  thinking: { scale: 1, offsetX: 0, offsetY: 0 },
  happy: { scale: 1, offsetX: 0, offsetY: 0 },
  motivated: { scale: 1, offsetX: 0, offsetY: 0 },
  caring: { scale: 1, offsetX: 0, offsetY: 0 },
  surprised: { scale: 1, offsetX: 0, offsetY: 0 },
  supportive: { scale: 1, offsetX: 0, offsetY: 0 },
  advice: { scale: 0.98, offsetX: 0, offsetY: -2 },
  food: { scale: 0.98, offsetX: 0, offsetY: -2 },
  activity: { scale: 1, offsetX: 0, offsetY: 0 },
  celebrating: { scale: 0.98, offsetX: 0, offsetY: 0 },
  sleeping: { scale: 1, offsetX: 0, offsetY: 0 },
}
