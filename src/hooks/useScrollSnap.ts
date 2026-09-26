import { useEffect, useRef, type MutableRefObject } from "react"

import { getSectionScrollTops } from "../data/sectionsConfig"

// Duracion de la animacion magnetica en ms
export const SNAP_DURATION = 520

// Espera a que el usuario pare de scrollear antes de jalar
export const SNAP_IDLE_DELAY = 140

type UseScrollSnapOptions = {
    scrollElRef: MutableRefObject<HTMLElement | null>
    scrollReady: boolean
    enabled: boolean
}

export function useScrollSnap({ scrollElRef, scrollReady, enabled }: UseScrollSnapOptions) {

    const rafRef = useRef<number | null>(null)
    const idleRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const isAnimatingRef = useRef(false)

    useEffect(() => {
        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
            if (idleRef.current) clearTimeout(idleRef.current)
        }
    }, [])

    useEffect(() => {

        const el = scrollElRef.current

        if (!scrollReady || !el) return

        const cancelAnimation = () => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current)
                rafRef.current = null
            }
            isAnimatingRef.current = false
        }

        // Anima el scroll hasta el punto magnetico mas cercano
        const animateTo = (target: number) => {

            cancelAnimation()

            const from = el.scrollTop
            const distance = target - from

            if (Math.abs(distance) < 1) {
                el.scrollTop = target
                return
            }

            isAnimatingRef.current = true

            const start = performance.now()

            const tick = (now: number) => {

                const t = Math.min(1, (now - start) / SNAP_DURATION)

                // Arranca rapido y aterriza suave para que se sienta magnetico
                const eased = 1 - Math.pow(1 - t, 3)

                el.scrollTop = from + distance * eased

                if (t < 1) {
                    rafRef.current = requestAnimationFrame(tick)
                } else {
                    el.scrollTop = target
                    rafRef.current = null
                    isAnimatingRef.current = false
                }
            }

            rafRef.current = requestAnimationFrame(tick)
        }

        const snapToNearest = () => {

            if (!enabled) return

            const points = getSectionScrollTops(el.scrollHeight - el.clientHeight)

            if (points.length === 0) return

            let best = points[0]

            for (const point of points) {
                if (Math.abs(point - el.scrollTop) < Math.abs(best - el.scrollTop)) {
                    best = point
                }
            }

            animateTo(best)
        }

        // Espera a que el usuario termine de scrollear antes de jalar
        const handleScroll = () => {

            if (idleRef.current) clearTimeout(idleRef.current)

            idleRef.current = setTimeout(() => {
                idleRef.current = null
                snapToNearest()
            }, SNAP_IDLE_DELAY)
        }

        // Si el usuario vuelve a hacer scroll a mano se cancela la animacion
        const handleInterrupt = () => {
            if (isAnimatingRef.current) cancelAnimation()
        }

        el.addEventListener("scroll", handleScroll)

        window.addEventListener("wheel", handleInterrupt, { passive: true })
        window.addEventListener("touchstart", handleInterrupt, { passive: true })
        window.addEventListener("touchmove", handleInterrupt, { passive: true })

        return () => {
            el.removeEventListener("scroll", handleScroll)
            window.removeEventListener("wheel", handleInterrupt)
            window.removeEventListener("touchstart", handleInterrupt)
            window.removeEventListener("touchmove", handleInterrupt)

            if (idleRef.current) clearTimeout(idleRef.current)

            cancelAnimation()
        }

    }, [scrollReady, enabled, scrollElRef])
}
