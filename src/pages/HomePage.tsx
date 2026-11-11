import { Link } from 'react-router-dom'
import { ReviewCarousel } from '../components/ReviewCarousel'
import { reasons, services } from '../data'
import { usePageTitle } from '../usePageTitle'

export function HomePage() {
  usePageTitle('JuHen Cleaning Services | Residential House Cleaning')
  return (
    <main>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">Your Trusted Cleaning Team</p>
            <h1>A cleaner home, without adding it to your to-do list.</h1>
            <p className="lede">
              JuHen Cleaning Services is a locally owned team for houses,
              condos, and apartments. We bring our own supplies, follow a
              room-by-room checklist, and treat your space like it is ours.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/estimate">
                Request an estimate
              </Link>
              <Link className="btn btn-ghost" to="/services">
                View services
              </Link>
            </div>
            <div className="stats">
              <div>
                <strong>12+</strong>
                <span>years in homes</span>
              </div>
              <div>
                <strong>4.9</strong>
                <span>average rating</span>
              </div>
              <div>
                <strong>Insured</strong>
                <span>bonded team</span>
              </div>
            </div>
          </div>
          <aside className="hero-card">
            <p className="eyebrow gold">What’s included</p>
            <h2>Standard visit checklist</h2>
            <ul className="checklist">
              <li>
                <span className="check">✓</span>
                Kitchen counters, sinks, appliances exteriors, floors
              </li>
              <li>
                <span className="check">✓</span>
                Bathrooms: showers, toilets, vanities, mirrors
              </li>
              <li>
                <span className="check">✓</span>
                Dusting, vacuuming, and mopping throughout
              </li>
              <li>
                <span className="check">✓</span>
                Beds made and surfaces reset
              </li>
            </ul>
            <div className="badge-row">
              <span className="badge">Pet-friendly products</span>
              <span className="badge">Same-week openings</span>
              <span className="badge">Background-checked</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Services</p>
            <h2>House cleaning built around how you actually live.</h2>
            <p className="lede">
              Residential, move-in/out, offices, commercial, and Airbnb
              turnovers. Pricing depends on size, frequency, and the condition
              of the space.
            </p>
          </div>
          <div className="cards">
            {services.map((service) => (
              <Link
                className="card card-link"
                to={`/services#${service.slug}`}
                key={service.slug}
              >
                <div className="icon" aria-hidden="true">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <span className="card-link-cue">
                  View this service
                  <span className="card-link-arrow" aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <p className="section-cta">
            <Link className="btn btn-ghost" to="/services">
              Compare all services
            </Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Why count on us</p>
            <h2>People you recognize, a checklist you can see, and a quote that stays put.</h2>
            <p className="lede">
              We are a small local team—not a rotating franchise crew. You get
              the same standard on every visit, and we tell you before anything
              changes.
            </p>
          </div>
          <div className="cards">
            {reasons.map((reason) => (
              <article className="card" key={reason.title}>
                <div className="icon" aria-hidden="true">
                  {reason.icon}
                </div>
                <h3>{reason.title}</h3>
                <p>{reason.copy}</p>
              </article>
            ))}
          </div>
          <p className="section-cta">
            <Link className="btn btn-ghost" to="/about">
              Meet the team
            </Link>
          </p>
        </div>
      </section>

      <section className="section review-section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Reviews</p>
            <h2>What people say after we leave.</h2>
            <p className="lede">
              Homes, offices, and turnovers around the city. Same checklist,
              same faces, a quote that doesn’t move.
            </p>
          </div>
          <ReviewCarousel />
        </div>
      </section>
    </main>
  )
}
