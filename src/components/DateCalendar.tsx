import { useEffect, useMemo, useState } from 'react'
import { formatVisitDate } from '../estimatePricing'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function localDateValue(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function monthTitle(year: number, month: number) {
  return new Date(year, month, 1).toLocaleDateString('en-CA', {
    month: 'long',
    year: 'numeric',
  })
}

function shiftMonth(year: number, month: number, offset: number) {
  const next = new Date(year, month + offset, 1)
  return { year: next.getFullYear(), month: next.getMonth() }
}

function parseMonth(value: string) {
  const [year, month] = value.split('-').map(Number)
  return { year, month: month - 1 }
}

type DateCalendarProps = {
  value: string
  min: string
  onChange: (value: string) => void
}

export function DateCalendar({ value, min, onChange }: DateCalendarProps) {
  const selectedMonth = value ? parseMonth(value) : parseMonth(min)
  const [view, setView] = useState(selectedMonth)
  const minMonth = parseMonth(min)

  useEffect(() => {
    setView(value ? parseMonth(value) : parseMonth(min))
  }, [value, min])

  const cells = useMemo(() => {
    const firstWeekday = new Date(view.year, view.month, 1).getDay()
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()
    const blanks = Array.from({ length: firstWeekday }, () => null)
    const days = Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1
      return localDateValue(new Date(view.year, view.month, day))
    })

    return [...blanks, ...days]
  }, [view])

  const canGoBack =
    view.year > minMonth.year ||
    (view.year === minMonth.year && view.month > minMonth.month)

  return (
    <div className="calendar">
      <div className="calendar-head">
        <button
          className="calendar-nav"
          type="button"
          onClick={() => setView((current) => shiftMonth(current.year, current.month, -1))}
          disabled={!canGoBack}
          aria-label="Previous month"
        >
          ‹
        </button>
        <p className="calendar-title">{monthTitle(view.year, view.month)}</p>
        <button
          className="calendar-nav"
          type="button"
          onClick={() => setView((current) => shiftMonth(current.year, current.month, 1))}
          aria-label="Next month"
        >
          ›
        </button>
      </div>

      <div className="calendar-grid" role="grid" aria-label="Choose a preferred date">
        {WEEKDAYS.map((day) => (
          <span className="calendar-dow" key={day} aria-hidden="true">
            {day}
          </span>
        ))}
        {cells.map((day, index) =>
          day ? (
            <button
              className={[
                'calendar-day',
                day === min ? 'is-today' : '',
                day === value ? 'is-selected' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              type="button"
              key={day}
              disabled={day < min}
              aria-pressed={day === value}
              aria-label={formatVisitDate(day)}
              onClick={() => onChange(day)}
            >
              {Number(day.slice(-2))}
            </button>
          ) : (
            <span className="calendar-day is-empty" key={`empty-${index}`} />
          ),
        )}
      </div>

      <p className="calendar-selected">
        {value ? `Selected: ${formatVisitDate(value)}` : 'Select a date for the visit.'}
      </p>
    </div>
  )
}
