import { Link } from 'react-router-dom'
import { usePageTitle } from '../usePageTitle'

const values = [
  {
    title: 'Same faces',
    copy: 'We keep a small crew so you recognize who is in your home. If someone new is coming, we tell you first.',
  },
  {
    title: 'No surprise upsells',
    copy: 'The quote you approve is the work we do. Add-ons are optional and priced before we start.',
  },
  {
    title: 'Respect for the house',
    copy: 'We lock up, leave notes if anything needs a follow-up, and use products that are safe around kids and pets.',
  },
]

export function AboutPage() {
  usePageTitle('About | JuHen Cleaning Services')
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">About</p>
          <h1>Small team. Same faces. Homes that feel looked after.</h1>
          <p className="lede">
            JuHen started because most busy households do not need a franchise
            script, they need reliable people who show up, do the work, and
            leave the home ready to live in.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap about">
          <div className="about-copy">
            <p className="eyebrow">Our story</p>
            <h2>Built around how families actually live.</h2>
            <p className="lede">
              We work in houses, condos, and apartments—places with pets,
              backpacks by the door, and weeks that get away from you.
            </p>
            <p>
              Every visit uses a written checklist you can customize. We
              communicate if we are running late, and we never send a rotating
              crew of strangers without telling you first.
            </p>
          </div>
          <div className="about-panel">
            <h3>How booking works</h3>
            <div className="steps">
              <div className="step">
                <span className="num">1</span>
                <div>
                  <strong>Tell us about the home</strong>
                  <p>Size, pets, frequency, and any problem areas.</p>
                </div>
              </div>
              <div className="step">
                <span className="num">2</span>
                <div>
                  <strong>Get a clear estimate</strong>
                  <p>We reply with timing, price, and what’s included.</p>
                </div>
              </div>
              <div className="step">
                <span className="num">3</span>
                <div>
                  <strong>We clean. You walk into calm.</strong>
                  <p>Same-day notes after the visit if anything needs a follow-up.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">How we work</p>
            <h2>What you can count on.</h2>
          </div>
          <div className="cards three">
            {values.map((value) => (
              <article className="card" key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.copy}</p>
              </article>
            ))}
          </div>
          <p className="section-cta">
            <Link className="btn btn-primary" to="/contact">
              Talk to the team
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
