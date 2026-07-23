import { motion, useReducedMotion } from 'framer-motion'
import { useId } from 'react'
import '../styles/location-map.css'

type LocationMapProps = {
  className?: string
}

export default function LocationMap({ className = '' }: LocationMapProps) {
  const reduceMotion = useReducedMotion()
  const instanceId = useId().replace(/:/g, '')
  const cityGradientId = `city-fill-${instanceId}`
  const riverGradientId = `river-stroke-${instanceId}`
  const routeGradientId = `route-stroke-${instanceId}`
  const markerGlowId = `marker-glow-${instanceId}`

  const lineMotion = (delay: number, duration = 1.65) => ({
    initial: { pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 1 : 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: false, amount: 0.34 },
    transition: {
      duration: reduceMotion ? 0 : duration,
      delay: reduceMotion ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  })

  return (
    <motion.div
      className={`location-map ${className}`.trim()}
      initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { scale: 1.015 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.85, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="location-map__topline" aria-hidden="true">
        <span className="location-map__eyebrow"><i /> Первый магазин</span>
        <span className="location-map__status"><i /> Локация выбрана</span>
      </div>

      <svg
        className="location-map__canvas"
        viewBox="0 0 760 580"
        role="img"
        aria-labelledby={`${instanceId}-map-title ${instanceId}-map-description`}
      >
        <title id={`${instanceId}-map-title`}>Мини-карта Тюмени с расположением ARSIB Tower</title>
        <desc id={`${instanceId}-map-description`}>
          Стилизованная карта города с рекой Турой, основными дорогами и отмеченной локацией первого магазина Точка Роста.
        </desc>

        <defs>
          <linearGradient id={cityGradientId} x1="102" y1="72" x2="665" y2="520" gradientUnits="userSpaceOnUse">
            <stop stopColor="#183126" stopOpacity=".72" />
            <stop offset=".5" stopColor="#0b1a13" stopOpacity=".72" />
            <stop offset="1" stopColor="#14241b" stopOpacity=".5" />
          </linearGradient>
          <linearGradient id={riverGradientId} x1="44" y1="154" x2="708" y2="424" gradientUnits="userSpaceOnUse">
            <stop stopColor="#17352c" stopOpacity=".18" />
            <stop offset=".48" stopColor="#4c8d68" stopOpacity=".58" />
            <stop offset="1" stopColor="#17352c" stopOpacity=".18" />
          </linearGradient>
          <linearGradient id={routeGradientId} x1="130" y1="484" x2="490" y2="302" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a87d36" stopOpacity=".16" />
            <stop offset=".58" stopColor="#d6a84f" />
            <stop offset="1" stopColor="#f4d58a" />
          </linearGradient>
          <filter id={markerGlowId} x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <pattern id={`${instanceId}-grid`} width="38" height="38" patternUnits="userSpaceOnUse">
            <path d="M38 0H0V38" fill="none" stroke="#ffffff" strokeOpacity=".035" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="760" height="580" fill={`url(#${instanceId}-grid)`} />

        <motion.path
          className="location-map__city"
          d="M100 146c34-61 109-88 180-91 84-3 126 28 199 22 74-7 153 18 177 85 24 68-21 116-9 183 11 64-18 132-78 158-63 28-121-10-185 3-77 15-153 8-205-42-46-44-35-110-64-163-28-51-45-100-15-155Z"
          fill={`url(#${cityGradientId})`}
          stroke="rgba(214, 168, 79, .2)"
          strokeWidth="1.2"
          {...lineMotion(0, 2)}
        />

        <g className="location-map__blocks" aria-hidden="true">
          <path d="m170 177 74-50 55 19-24 63-68 22Z" />
          <path d="m315 120 91-13 39 55-66 47-71-23Z" />
          <path d="m468 131 102 29 12 69-84 13-45-53Z" />
          <path d="m151 267 86-27 50 57-37 64-92-15Z" />
          <path d="m314 248 83-24 58 48-29 66-88 11-40-49Z" />
          <path d="m475 279 98-20 47 60-35 77-99-5-37-61Z" />
          <path d="m197 385 81-6 42 59-46 50-82-17-22-51Z" />
          <path d="m348 380 76-25 54 58-18 71-88 8-45-55Z" />
        </g>

        <motion.path
          className="location-map__river-shadow"
          d="M18 112C82 72 138 93 150 146c9 40-38 60-15 102 31 56 111 13 168-13 55-24 107-16 156 13 60 35 118 18 165-4 46-21 88-18 124 0"
          {...lineMotion(0.08, 1.8)}
        />
        <motion.path
          className="location-map__river"
          d="M18 112C82 72 138 93 150 146c9 40-38 60-15 102 31 56 111 13 168-13 55-24 107-16 156 13 60 35 118 18 165-4 46-21 88-18 124 0"
          stroke={`url(#${riverGradientId})`}
          {...lineMotion(0.1, 1.8)}
        />
        <motion.path
          className="location-map__river-light"
          d="M18 109C82 69 138 90 150 143c9 40-38 60-15 102 31 56 111 13 168-13 55-24 107-16 156 13 60 35 118 18 165-4 46-21 88-18 124 0"
          {...lineMotion(0.2, 1.9)}
        />

        <g className="location-map__roads" aria-hidden="true">
          <motion.path d="M113 432c91-61 141-76 209-115 56-32 119-88 236-158" {...lineMotion(0.16)} />
          <motion.path d="M195 91c28 83 71 132 147 177 74 44 113 110 137 226" {...lineMotion(0.22)} />
          <motion.path d="M100 331c118 13 172-7 255 14 92 23 137 73 255 63" {...lineMotion(0.28)} />
          <motion.path d="M299 73c-4 75 20 104 12 173-8 74-49 132-29 242" {...lineMotion(0.34)} />
          <motion.path d="M541 103c-39 84-57 145-44 215 8 46 33 86 76 139" {...lineMotion(0.4)} />
        </g>

        <g className="location-map__minor-roads" aria-hidden="true">
          <path d="m158 191 83 34 52 80" />
          <path d="m355 122 23 88 80 56" />
          <path d="m214 390 117-15 67-50" />
          <path d="m408 436 60-84 111-29" />
          <path d="m521 191-84 30-62 88" />
        </g>

        <motion.path
          className="location-map__route"
          d="M142 478c55-58 112-66 166-90 58-25 104-61 156-34 18 9 34 30 56 51"
          stroke={`url(#${routeGradientId})`}
          {...lineMotion(0.48, 1.55)}
        />
        <motion.circle
          cx="520"
          cy="405"
          r="5.5"
          fill="#8dff35"
          filter={`url(#${markerGlowId})`}
          initial={{ scale: reduceMotion ? 1 : 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, delay: reduceMotion ? 0 : 1.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: '520px 405px' }}
        />

        <g className="location-map__districts" aria-hidden="true">
          <text className="location-map__district location-map__district--zareka" x="170" y="145">ЗАРЕКА</text>
          <text className="location-map__district location-map__district--center" x="300" y="335">ЦЕНТР</text>
          <text x="523" y="445">ВОСТОЧНЫЙ</text>
          <text className="location-map__river-name" x="350" y="239">Т У Р А</text>
        </g>
      </svg>

      <div className="location-map__marker" aria-label="Точка Роста, ARSIB Tower">
        <span className="location-map__marker-radar" aria-hidden="true"><i /><i /></span>
        <span className="location-map__marker-copy">
          <small>Первый магазин</small>
          <strong>Тюмень · ARSIB Tower</strong>
        </span>
      </div>

      <div className="location-map__coordinates" aria-hidden="true">
        <span>57.1287° N</span>
        <i />
        <span>65.5459° E</span>
      </div>

      <span className="location-map__corner location-map__corner--tl" aria-hidden="true" />
      <span className="location-map__corner location-map__corner--br" aria-hidden="true" />
    </motion.div>
  )
}
