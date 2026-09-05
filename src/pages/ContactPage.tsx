import { ContactForm } from '../components/ContactForm'
import { usePageTitle } from '../usePageTitle'

export function ContactPage() {
  usePageTitle('Contact | JuHen Cleaning Services')
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Contact</p>
          <h1>We are more than happy to hear from you.</h1>
          <p className="lede">
            Serving homes and workplaces within 25 miles. Typical reply time is
            under one business day.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="booking">
            <div className="quote-block">
              <p className="eyebrow gold">Free estimate</p>
              <h2>Reach JuHen</h2>
              <p>
                Call{' '}
                <a href="tel:+15551203480">(555) 120-3480</a> for same-week
                openings, or send the form and we’ll follow up by phone or
                email.
              </p>
              <p>
                Mon–Fri 8am–6pm
                <br />
                Saturday by appointment
                <br />
                <a href="mailto:hello@juhencleaning.com">
                  hello@juhencleaning.com
                </a>
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  )
}
