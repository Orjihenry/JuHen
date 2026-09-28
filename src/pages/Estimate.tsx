import { EstimateForm } from '../components/EstimateForm'
import { usePageTitle } from '../usePageTitle'

export function Estimate() {
  usePageTitle('Estimate | JuHen Cleaning Services')
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Estimate</p>
          <h1>Get a free estimate</h1>
          <p className="lede">
            Tell us about the job, pick a time, and leave your contact
            details. We’ll send a clear estimate.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <EstimateForm />
        </div>
      </section>
    </main>
  )
}
