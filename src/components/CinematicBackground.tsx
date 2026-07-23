import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import proteinShake from '../assets/food/protein-shake.png'
import { useIsMobile } from '../hooks/useIsMobile'
import '../styles/cinematic-background.css'

const graphPath = 'M -48 826 C 82 826 116 786 228 790 C 354 796 376 706 500 716 C 628 726 662 632 784 644 C 910 656 948 516 1060 528 C 1180 540 1222 384 1328 396 C 1390 402 1432 286 1490 246'
const goldPath = 'M 914 538 C 1010 532 1034 468 1100 452 C 1192 430 1228 348 1328 396 C 1390 402 1432 286 1490 246'

function DesktopCinematicBackground() {
  const reduceMotion = Boolean(useReducedMotion())
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 86, damping: 26, mass: 0.34 })

  const graphOpacity = useTransform(progress, [0, 0.08, 0.5, 1], [0.12, 0.23, 0.34, 0.42])
  const goldLength = useTransform(progress, [0.5, 0.88], [0, 1])
  const goldOpacity = useTransform(progress, [0.46, 0.68, 1], [0, 0.28, 0.42])
  const glowY = useTransform(progress, [0, 1], [60, -90])
  const glowX = useTransform(progress, [0, 1], [-20, 55])
  const shakeY = useTransform(progress, [0, 0.55, 1], [140, -16, -220])
  const shakeRotate = useTransform(progress, [0, 0.5, 1], [-8, 3, 11])
  const shakeScale = useTransform(progress, [0, 0.58, 1], [0.9, 1.04, 0.96])
  const shakeOpacity = useTransform(progress, [0, 0.2, 0.62, 1], [0, 0.18, 0.34, 0.1])
  const orbY = useTransform(progress, [0, 1], [90, -160])
  const orbRotate = useTransform(progress, [0, 1], [0, 46])

  const marker01 = useTransform(progress, [0.04, 0.1], [0, 1])
  const marker02 = useTransform(progress, [0.17, 0.24], [0, 1])
  const marker03 = useTransform(progress, [0.34, 0.41], [0, 1])
  const marker04 = useTransform(progress, [0.52, 0.59], [0, 1])
  const marker05 = useTransform(progress, [0.7, 0.77], [0, 1])
  const marker06 = useTransform(progress, [0.89, 0.96], [0, 1])

  return (
    <div className="cinematic-background" aria-hidden="true">
      <div className="cinematic-background__grid" />
      <motion.div
        className="cinematic-background__wash cinematic-background__wash--green"
        style={reduceMotion ? undefined : { x: glowX, y: glowY }}
      />
      <div className="cinematic-background__wash cinematic-background__wash--gold" />

      <svg className="cinematic-background__graph" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <defs>
          <linearGradient id="growth-line" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#67c23a" />
            <stop offset="0.62" stopColor="#8dff35" />
            <stop offset="1" stopColor="#d6a84f" />
          </linearGradient>
          <filter id="growth-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <path className="cinematic-background__graph-ghost" d={graphPath} />
        <motion.path
          className="cinematic-background__graph-line"
          d={graphPath}
          pathLength={reduceMotion ? 1 : undefined}
          style={reduceMotion ? { opacity: 0.26 } : { pathLength: progress, opacity: graphOpacity }}
        />
        <motion.path
          className="cinematic-background__graph-gold"
          d={goldPath}
          pathLength={reduceMotion ? 1 : undefined}
          style={reduceMotion ? { opacity: 0.2 } : { pathLength: goldLength, opacity: goldOpacity }}
        />

        {[
          [228, 790, '01', marker01],
          [500, 716, '02', marker02],
          [784, 644, '03', marker03],
          [1060, 528, '04', marker04],
          [1328, 396, '05', marker05],
          [1490, 246, '06', marker06],
        ].map(([cx, cy, label, opacity]) => (
          <motion.g key={String(label)} style={{ opacity: reduceMotion ? 0.62 : opacity }}>
            <circle className="cinematic-background__graph-halo" cx={Number(cx)} cy={Number(cy)} r="13" />
            <circle className="cinematic-background__graph-dot" cx={Number(cx)} cy={Number(cy)} r="3.5" />
            <text x={Number(cx) + 12} y={Number(cy) - 12}>{String(label)}</text>
          </motion.g>
        ))}
      </svg>

      <motion.figure
        className="cinematic-background__shake"
        style={reduceMotion ? { opacity: 0.18 } : { y: shakeY, rotate: shakeRotate, scale: shakeScale, opacity: shakeOpacity }}
      >
        <img src={proteinShake} loading="lazy" decoding="async" alt="" />
      </motion.figure>

      <motion.div
        className="cinematic-background__orb"
        style={reduceMotion ? undefined : { y: orbY, rotate: orbRotate }}
      >
        <i /><i /><span />
      </motion.div>
      <div className="cinematic-background__orbit cinematic-background__orbit--one" />
      <div className="cinematic-background__orbit cinematic-background__orbit--two" />
    </div>
  )
}

export function CinematicBackground() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div className="cinematic-background cinematic-background--mobile" aria-hidden="true">
        <span className="cinematic-background__mobile-wash" />
      </div>
    )
  }

  return <DesktopCinematicBackground />
}

export default CinematicBackground
