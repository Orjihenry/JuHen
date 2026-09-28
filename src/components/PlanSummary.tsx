import { STEPS } from './estimateSteps'
import {
  money,
  planFacts,
  type EstimateQuote,
  type EstimateValues,
} from '../estimatePricing'

type PlanSummaryProps = {
  values: EstimateValues
  quote: EstimateQuote
  step: number
  sent: boolean
}

export function PlanSummary({ values, quote, step, sent }: PlanSummaryProps) {
  const facts = planFacts(values)
  const hasQuote = quote.lines.length > 0

  return (
    <aside className="quote-block plan-summary">
      <p className="eyebrow gold">{sent ? 'Request sent' : 'Your plan'}</p>
      <h2>{sent ? 'Estimate on its way' : 'Live estimate'}</h2>
      <p>
        {sent
          ? 'We’ll confirm this price after we review the home.'
          : 'Details stay grouped so the quote stays compact.'}
      </p>

      <ol className="plan-steps" aria-label="Estimate steps">
        {STEPS.map((item, index) => {
          const status = sent
            ? 'is-complete'
            : index === step
              ? 'is-active'
              : index < step
                ? 'is-complete'
                : ''

          return (
            <li
              className={`plan-step ${status}`.trim()}
              key={item.id}
              aria-current={!sent && index === step ? 'step' : undefined}
            >
              <span aria-hidden="true">{sent || index < step ? '✓' : index + 1}</span>
              <span>{item.shortTitle}</span>
            </li>
          )
        })}
      </ol>

      {facts.length > 0 ? (
        <dl className="plan-facts">
          {facts.map((fact) => (
            <div className="plan-fact" key={fact.id}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="plan-empty">
          Choose a service and space size to build your plan.
        </p>
      )}

      <div className="plan-quote">
        {hasQuote ? (
          <ul className="plan-lines">
            {quote.lines.map((line) => (
              <li
                className={line.amount < 0 ? 'plan-line is-discount' : 'plan-line'}
                key={line.id}
              >
                <span>{line.label}</span>
                <span>{money(line.amount)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="plan-empty">
            Pricing appears once bedrooms or office space is selected.
          </p>
        )}

        <div className="plan-total" aria-live="polite">
          <span>Estimated total</span>
          <strong>{hasQuote ? money(quote.total) : money(0)}</strong>
        </div>
        <p className="plan-note">
          Estimate only. We’ll confirm the final price before the visit.
        </p>
      </div>
    </aside>
  )
}
