import React, { useEffect, useRef, useState } from 'react'

const cards = Array.from({ length: 9 }).map((_, i) => ({
	id: i,
	title: `Activity ${i + 1}`,
	description: `This is a detailed spot for activity ${i + 1}. Replace with real content.`,
	color: [
		'bg-red-400', 'bg-amber-400', 'bg-blue-400', 'bg-green-400', 'bg-indigo-400', 'bg-pink-400', 'bg-yellow-400', 'bg-sky-400', 'bg-lime-400'
	][i % 9]
}))

const Activites = () => {
	const containerRef = useRef(null)
	const [active, setActive] = useState(0)

	// refs for stable state in event handlers
	const activeRef = useRef(0)
	const lockRef = useRef(false)
	const lockTimeoutRef = useRef(null)
	const touchStartY = useRef(null)
	const wheelAccumRef = useRef(0)
	const wheelResetRef = useRef(null)

	useEffect(() => {
		activeRef.current = active
	}, [active])

	useEffect(() => {
		const el = containerRef.current
		if (!el) return

		const onScroll = () => {
			const idx = Math.round(el.scrollTop / el.clientHeight)
			setActive(idx)
		}

		el.addEventListener('scroll', onScroll, { passive: true })

		// wheel handler: accumulate deltas so a hard/fast swipe still only advances ONE section
		const onWheel = (e) => {
			// always prevent default so we control snapping
			e.preventDefault()
			if (lockRef.current) return

			let delta = e.deltaY || 0
			// normalize by deltaMode (DOM_DELTA_PIXEL = 0, LINE = 1, PAGE = 2)
			if (e.deltaMode === 1) delta *= 16
			else if (e.deltaMode === 2) delta *= 800

			// ignore tiny jitter
			if (Math.abs(delta) < 10) return

			wheelAccumRef.current += delta
			clearTimeout(wheelResetRef.current)
			// reset accumulator quickly if user pauses (short window)
			wheelResetRef.current = setTimeout(() => { wheelAccumRef.current = 0 }, 120)

			// threshold: quarter of viewport height
			const threshold = (window.innerHeight || document.documentElement.clientHeight) * 0.25
			if (Math.abs(wheelAccumRef.current) >= threshold) {
				lockRef.current = true
				const dir = wheelAccumRef.current > 0 ? 1 : -1
				if (dir > 0) scrollTo(Math.min(activeRef.current + 1, cards.length - 1))
				else scrollTo(Math.max(activeRef.current - 1, 0))
				wheelAccumRef.current = 0
				clearTimeout(lockTimeoutRef.current)
				lockTimeoutRef.current = setTimeout(() => { lockRef.current = false }, 750)
			}
		}

		// touch handlers for fast swipes
		const onTouchStart = (e) => {
			touchStartY.current = e.touches ? e.touches[0].clientY : e.clientY
		}

		const onTouchEnd = (e) => {
			if (lockRef.current) return
			const endY = e.changedTouches ? e.changedTouches[0].clientY : (e.clientY || touchStartY.current)
			const delta = (touchStartY.current || 0) - endY
			if (Math.abs(delta) < 40) return
			lockRef.current = true
			if (delta > 0) scrollTo(Math.min(activeRef.current + 1, cards.length - 1))
			else scrollTo(Math.max(activeRef.current - 1, 0))
			clearTimeout(lockTimeoutRef.current)
			lockTimeoutRef.current = setTimeout(() => { lockRef.current = false }, 750)
		}

		el.addEventListener('wheel', onWheel, { passive: false })
		el.addEventListener('touchstart', onTouchStart, { passive: true })
		el.addEventListener('touchend', onTouchEnd, { passive: true })

		return () => {
			el.removeEventListener('scroll', onScroll)
			el.removeEventListener('wheel', onWheel)
			el.removeEventListener('touchstart', onTouchStart)
			el.removeEventListener('touchend', onTouchEnd)
			clearTimeout(lockTimeoutRef.current)
			clearTimeout(wheelResetRef.current)
		}
	}, [])

	// keyboard nav
	useEffect(() => {
		const onKey = (e) => {
			if (e.key === 'ArrowDown') {
				e.preventDefault(); scrollTo(Math.min(active + 1, cards.length - 1))
			} else if (e.key === 'ArrowUp') {
				e.preventDefault(); scrollTo(Math.max(active - 1, 0))
			}
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [active])

	const scrollTo = (i) => {
		const el = containerRef.current
		if (!el) return
		// lock during programmatic smooth scroll to prevent double advance
		lockRef.current = true
		clearTimeout(lockTimeoutRef.current)
		lockTimeoutRef.current = setTimeout(() => { lockRef.current = false }, 750)
		el.scrollTo({ top: i * el.clientHeight, behavior: 'smooth' })
		setActive(i)
	}

	return (
		<div className="w-full h-screen flex">
			{/* content column: full-screen vertical snap scroller */}
			<main ref={containerRef} className="flex-1 h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth activities-scroller">
				{/* pad top so fixed navbar doesn't overlap */}
				<div className="h-0 md:h-16 lg:h-20" aria-hidden />

				{cards.map((c, i) => (
					<section
						key={c.id}
						className={`snap-start h-screen flex items-center justify-center p-8 ${c.color}`}
						aria-hidden={active !== i}
					>
						<div className="max-w-4xl w-full bg-white bg-opacity-80 backdrop-blur rounded-xl p-8 shadow-lg">
							<h2 className="text-4xl font-bold mb-4">{c.title}</h2>
							<p className="text-gray-700">{c.description}</p>
						</div>
					</section>
				))}
			</main>

			{/* side dots navigation */}
			{/* side dots navigation removed per request */}



	
	
		</div>
	)
}

export default Activites
