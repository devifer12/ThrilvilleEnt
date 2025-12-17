import React, { useEffect, useMemo, useState, useRef } from 'react'

const cardsData = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  title: `Activity ${i + 1}`,
  subtitle: `Short description for activity ${i + 1}`,
  color: [
    'bg-red-400',
    'bg-amber-400',
    'bg-blue-400',
    'bg-green-400',
    'bg-indigo-400',
    'bg-pink-400',
    'bg-yellow-400',
    'bg-sky-400',
    'bg-lime-400',
  ][i % 9],
}))

const ActivitiesCarousel = () => {
  const total = cardsData.length
  const [centerIdx, setCenterIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)

  const leftIdx = (centerIdx - 1 + total) % total
  const rightIdx = (centerIdx + 1) % total

  useEffect(() => {
    if (isPaused) return
    intervalRef.current = setInterval(() => {
      setCenterIdx((s) => (s + 1) % total)
    }, 3000)
    return () => clearInterval(intervalRef.current)
  }, [isPaused, total])

  const visible = useMemo(() => {
    return [cardsData[leftIdx], cardsData[centerIdx], cardsData[rightIdx]]
  }, [leftIdx, centerIdx, rightIdx])

  // swipe handlers
  const touch = useRef({ startX: 0, endX: 0, dragging: false })

  const onTouchStart = (e) => {
    touch.current.startX = e.touches ? e.touches[0].clientX : e.clientX
    touch.current.dragging = true
    setIsPaused(true)
  }

  const onTouchMove = (e) => {
    if (!touch.current.dragging) return
    touch.current.endX = e.touches ? e.touches[0].clientX : e.clientX
  }

  const onTouchEnd = () => {
    if (!touch.current.dragging) return
    const delta = touch.current.endX - touch.current.startX
    const threshold = 50
    if (delta > threshold) setCenterIdx((s) => (s - 1 + total) % total)
    else if (delta < -threshold) setCenterIdx((s) => (s + 1) % total)
    touch.current.dragging = false
    setIsPaused(false)
  }

  return (
    <section className="w-full flex flex-col items-center justify-center py-12 bg-gray-50 overflow-hidden">
      <h2 className="text-3xl font-bold mb-6">Activities</h2>

      <div
        className="w-full max-w-7xl h-[70vh] flex items-center justify-center gap-6 px-6 md:px-8 overflow-hidden activities-row"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onTouchStart}
        onMouseMove={onTouchMove}
        onMouseUp={onTouchEnd}
      >
        {/* Left card */}
        <div
          key={visible[0].id}
          onClick={() => setCenterIdx(leftIdx)}
          role="button"
          tabIndex={0}
          className={`cursor-pointer transition-all duration-700 ease-out transform-gpu shrink-0 rounded-l-xl rounded-r-none overflow-hidden shadow-lg ${visible[0].color} w-[10%] md:w-[15%] h-[50vh] md:h-[80%] scale-95 md:scale-95 -translate-x-2 md:-translate-x-6 opacity-90`}
        >
          <CardContent item={visible[0]} size="small" position="left" />
        </div>

        {/* Center card */}
        <div
          key={visible[1].id}
          className={`transition-all duration-700 ease-out transform-gpu shrink-0 rounded-2xl overflow-hidden shadow-2xl ${visible[1].color} w-[80%] md:w-[70%] h-[55vh] md:h-[70vh] scale-100 md:scale-105 z-20`}
        >
          <CardContent item={visible[1]} size="large" position="center" />
        </div>

        {/* Right card */}
        <div
          key={visible[2].id}
          onClick={() => setCenterIdx(rightIdx)}
          role="button"
          tabIndex={0}
          className={`cursor-pointer transition-all duration-700 ease-out transform-gpu shrink-0 rounded-r-xl rounded-l-none overflow-hidden shadow-lg ${visible[2].color} w-[10%] md:w-[15%] h-[50vh] md:h-[80%] scale-95 md:scale-95 translate-x-2 md:translate-x-6 opacity-90`}
        >
          <CardContent item={visible[2]} size="small" position="right" />
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        {cardsData.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setCenterIdx(i)}
            className={`w-3 h-3 rounded-full ${i === centerIdx ? 'bg-black' : 'bg-gray-300'}`}
            aria-label={`go to ${c.title}`}
          />
        ))}
      </div>
    </section>
  )
}

const CardContent = ({ item, size, position }) => {
  const overlayBase = 'bg-black bg-opacity-30 p-4'
  let overlayClass = overlayBase + ' rounded-2xl'
  if (position === 'left') overlayClass = overlayBase + ' rounded-l-2xl rounded-r-none'
  if (position === 'right') overlayClass = overlayBase + ' rounded-r-2xl rounded-l-none'
  return (
    <div className="w-full h-full flex flex-col justify-end p-6 text-white">
      <div className={overlayClass}>
        <h3 className={`font-bold ${size === 'large' ? 'text-4xl' : 'text-lg'}`}>{item.title}</h3>
        <p className={`${size === 'large' ? 'text-lg' : 'text-sm'} mt-2`}>{item.subtitle}</p>
      </div>
    </div>
  )
}

export default ActivitiesCarousel