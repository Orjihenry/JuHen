import { Link } from 'react-router-dom'
import { services } from '../data'
import { usePageTitle } from '../usePageTitle'

export function ServicesPage() {
  usePageTitle('Services | JuHen Cleaning Services')
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Services</p>
          <h1>Cleaning for homes, offices, and spaces in between.</h1>
          <p className="lede">
            Every visit uses a written checklist you can customize. We bring
            supplies, and we quote extras before we start—not after.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap service-list">
          {services.map((service) => (
            <article className="service-block" key={service.slug} id={service.slug}>
              <div className="icon" aria-hidden="true">
                {service.icon}
              </div>
              <div>
                <h2>{service.title}</h2>
                <p className="lede">{service.details}</p>
                <ul className="detail-list">
                  {service.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="price">{service.price}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="wrap cta-band">
          <div>
            <h2>Not sure which visit you need?</h2>
            <p>
              Tell us the size of the space and the service you need. We’ll
              recommend a plan and send a clear estimate.
            </p>
          </div>
          <Link className="btn btn-primary" to="/contact">
            Request an estimate
          </Link>
        </div>
      </section>
    </main>
  )
}
