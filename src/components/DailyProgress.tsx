import type { MealSlot } from '../data/mealPlans'
import '../styles/user-journey-demo.css'

type DailyProgressProps = {
  visible: boolean
  addedSlots: MealSlot[]
  onClose: () => void
  onOpenFlow: () => void
}

export function DailyProgress({ visible, addedSlots, onClose, onOpenFlow }: DailyProgressProps) {
  if (!visible) return null

  const count = addedSlots.length
  const complete = count === 4

  return (
    <aside className={`daily-progress ${complete ? 'daily-progress--complete' : ''}`} aria-live="polite">
      <button className="daily-progress__close" type="button" onClick={onClose} aria-label="Скрыть прогресс дня">×</button>
      <span className="daily-progress__flame" aria-hidden="true"><i /><b /></span>
      <div className="daily-progress__copy">
        <small>{complete ? 'День закрыт' : 'Сегодня'}</small>
        <strong>{complete ? 'Поток продолжается.' : `${count} из 4 приёмов пищи`}</strong>
        <span><i style={{ transform: `scaleX(${count / 4})` }} /></span>
      </div>
      {complete && <button className="daily-progress__flow" type="button" onClick={onOpenFlow}>К Потоку →</button>}
    </aside>
  )
}

export default DailyProgress
