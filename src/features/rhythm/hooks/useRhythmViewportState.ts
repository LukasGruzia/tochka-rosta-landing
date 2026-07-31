import { useCallback, useEffect, useRef, useState } from 'react'

export function useRhythmViewportState(stageCount: number) {
  const [activeIndex, setActiveIndex] = useState(0)
  const nodes = useRef<Array<HTMLElement | null>>([])

  const registerStage = useCallback((index: number) => (node: HTMLElement | null) => {
    nodes.current[index] = node
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return

        const nextIndex = Number((visible.target as HTMLElement).dataset.rhythmIndex)
        if (Number.isFinite(nextIndex)) setActiveIndex(nextIndex)
      },
      { rootMargin: '-28% 0px -34% 0px', threshold: [0.15, 0.45, 0.7] },
    )

    nodes.current.slice(0, stageCount).forEach((node) => node && observer.observe(node))
    return () => observer.disconnect()
  }, [stageCount])

  return { activeIndex, setActiveIndex, registerStage }
}
