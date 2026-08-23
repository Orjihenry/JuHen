import { Link } from 'react-router-dom'
import { services, testimonials } from '../data'
import { usePageTitle } from '../usePageTitle'

export function HomePage() {
  usePageTitle('JuHen Cleaning Services | Residential House Cleaning')
  return (
    <main>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">Residential cleaning</p>
            <h1>A cleaner home, without adding it to your to-do list.</h1>
            <p className="lede">
              JuHen Cleaning Services is a locally owned team for houses,
              condos, and apartments. We bring our own supplies, follow a
              room-by-room checklist, and treat your space like it is ours.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/contact">
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
            <h2>Cleaning built around how you actually use the space.</h2>
            <p className="lede">
              Residential, commercial, move-in and move-out, post-construction,
              and bi-weekly plans. Pricing depends on size, frequency, and the
              condition of the space.
            </p>
          </div>
          <div className="cards">
            {services.map((service) => (
              <article className="card" key={service.slug}>
                <div className="icon" aria-hidden="true">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <p className="price">{service.price}</p>
              </article>
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
            <p className="eyebrow">Neighbors</p>
            <h2>Homes that stay easier to live in.</h2>
          </div>
          <div className="testimonials">
            {testimonials.map((item) => (
              <figure className="quote" key={item.name}>
                <div className="stars" aria-label="5 stars">
                  ★★★★★
                </div>
                <blockquote>
                  <p>“{item.quote}”</p>
                </blockquote>
                <footer>
                  {item.name}
                  <br />
                  <span className="muted">{item.detail}</span>
                </footer>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
