import { useEffect, useState } from 'react'
import { reviews } from '../data'

function initials(name: string) {
  return name
    .split(/[\s&]+/)
    .filter((part) => part.length > 1 && part[0] === part[0].toUpperCase())
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
}

export function ReviewCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(2)
  const maxIndex = Math.max(0, reviews.length - visible)
  const steps = maxIndex + 1

  function goTo(next: number) {
    setIndex(((next % steps) + steps) % steps)
  }

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)')
    const syncVisible = () => setVisible(media.matches ? 1 : 2)
    syncVisible()
    media.addEventListener('change', syncVisible)
    return () => media.removeEventListener('change', syncVisible)
  }, [])

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex))
  }, [maxIndex])

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % steps)
    }, 7000)

    return () => window.clearInterval(timer)
  }, [paused, steps])

  return (
    <div
      className="review-carousel"
      style={{ ['--review-index' as string]: index }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="review-viewport">
        <div className="review-track">
          {reviews.map((review) => (
            <figure className="review-card" key={review.name}>
              <p className="review-mark" aria-hidden="true">
                “
              </p>
              <div className="stars" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <blockquote>
                <p>{review.quote}</p>
              </blockquote>
              <figcaption>
                <span className="review-avatar" aria-hidden="true">
                  {initials(review.name)}
                </span>
                <span>
                  <strong>{review.name}</strong>
                  <span className="review-meta">
                    {review.place} · {review.service}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="review-controls">
        <button
          className="review-nav"
          type="button"
          aria-label="Previous review"
          onClick={() => goTo(index - 1)}
        >
          ‹
        </button>
        <div className="review-dots">
          {Array.from({ length: steps }, (_, stepIndex) => (
            <button
              className={stepIndex === index ? 'review-dot is-active' : 'review-dot'}
              type="button"
              key={reviews[stepIndex].name}
              aria-label={`Show reviews starting with ${reviews[stepIndex].name}`}
              aria-current={stepIndex === index ? 'true' : undefined}
              onClick={() => goTo(stepIndex)}
            />
          ))}
        </div>
        <button
          className="review-nav"
          type="button"
          aria-label="Next review"
          onClick={() => goTo(index + 1)}
        >
          ›
        </button>
      </div>
      <p className="visually-hidden" aria-live="polite">
        {reviews[index].name}: {reviews[index].quote}
      </p>
    </div>
  )
}
