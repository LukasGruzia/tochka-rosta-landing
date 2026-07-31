import { motion, useReducedMotion } from 'framer-motion'
import { RhythmCharacter } from '../components/RhythmCharacter'
import { RhythmMessageCard } from '../components/RhythmMessageCard'
import { RhythmStageCard } from '../components/RhythmStageCard'
import { rhythmFeatures, rhythmStages } from '../config/rhythmContent'
import { useRhythmViewportState } from '../hooks/useRhythmViewportState'

export function RhythmSection() {
  const reduceMotion = Boolean(useReducedMotion())
  const { activeIndex, setActiveIndex, registerStage } = useRhythmViewportState(rhythmStages.length)
  const activeStage = rhythmStages[activeIndex]

  return (
    <section className="section rhythm-section section-tech-grid" id="rhythm" aria-labelledby="rhythm-title">
      <div className="container">
        <header className="rhythm-section__heading">
          <span className="section-index" aria-hidden="true">08 / 11</span>
          <span className="eyebrow"><i /> Персональный помощник</span>
          <h2 id="rhythm-title">Знакомься, <em>Ритм</em></h2>
          <strong>Твой живой помощник в Потоке</strong>
          <p>Ритм анализирует дневник, учитывает твою цель, предпочтения и ограничения, помогает подобрать следующий приём пищи и поддерживает ежедневный прогресс — без давления и строгих запретов.</p>
        </header>

        <div className="rhythm-story">
          <div className="rhythm-story__visual">
            <div className="rhythm-story__visual-sticky">
              <span className="rhythm-story__orbit" aria-hidden="true" />
              <RhythmCharacter state={activeStage.state} size="large" animated />
              <motion.div
                key={activeStage.id}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0.12 : 0.42 }}
              >
                <RhythmMessageCard state={activeStage.state} message={activeStage.message} />
              </motion.div>
              <div className="rhythm-app-slice" aria-label="Фрагмент дневного баланса приложения">
                <span><i /> Дневной баланс</span>
                <strong>1 840 <small>/ 2 240 ккал</small></strong>
                <div><i /><i /><i /></div>
              </div>
            </div>
          </div>

          <div className="rhythm-story__content">
            <div className="rhythm-features" aria-label="Возможности Ритма">
              {rhythmFeatures.map(([title, text]) => (
                <div className="rhythm-feature-glass" key={title}><span>{title}</span><p>{text}</p></div>
              ))}
            </div>

            <div className="rhythm-stages" aria-label="Как работает Ритм">
              {rhythmStages.map((stage, index) => (
                <RhythmStageCard
                  key={stage.id}
                  stage={stage}
                  index={index}
                  active={activeIndex === index}
                  register={registerStage(index)}
                  onActivate={() => setActiveIndex(index)}
                />
              ))}
            </div>

            <p className="rhythm-section__seo-copy">Ритм — персональный помощник приложения «Точка Роста», который анализирует дневной баланс и помогает выбрать следующий шаг.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RhythmSection
