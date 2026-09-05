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
            Tell us what you need and we'll get back to you with a free estimate.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
            <div className="booking">
                <div className="quote-block">

                </div>
                
                <EstimateForm />
            </div>
        </div>
      </section>
    </main>
  )
}