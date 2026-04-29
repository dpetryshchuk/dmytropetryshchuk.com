import { useEffect, useRef, useState } from 'react'

interface OrbitalAnimation {
  angle: number
  pause: () => void
  resume: () => void
}

export function useOrbitalAnimation(): OrbitalAnimation {
  const angleRef = useRef(0)
  const isPausedRef = useRef(false)
  const rafRef = useRef<number>(0)
  const [, setTickState] = useState(0)

  useEffect(() => {
    const tick = () => {
      if (!isPausedRef.current) {
        angleRef.current += 0.00005
      }
      setTickState(n => n + 1)
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return {
    angle: angleRef.current,
    pause: () => { isPausedRef.current = true },
    resume: () => { isPausedRef.current = false },
  }
}
