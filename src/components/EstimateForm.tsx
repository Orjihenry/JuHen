import { useState, type FormEvent } from 'react'
import { services } from '../data'

export function EstimateForm() {
  const [sent, setSent] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
    event.currentTarget.reset()
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-row">
        <label>
          Full name
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          Phone
          <input name="phone" type="tel" required autoComplete="tel" />
        </label>
      </div>
      <label>
        Email
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <div className="form-row">
        <label>
          Service
          <select name="service" defaultValue="residential">
            {services.map((service) => (
              <option value={service.slug} key={service.slug}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Space size
          <select name="size" defaultValue="medium">
            <option value="small">Studio / 1 bed or small suite</option>
            <option value="medium">2–3 bedroom or mid-size office</option>
            <option value="large">4+ bedroom or large floor</option>
            <option value="other">Not sure / other</option>
          </select>
        </label>
      </div>
      <label>
        Notes (pets, access, problem areas)
        <textarea name="notes" />
      </label>
      <button className="btn btn-primary" type="submit">
        Send request
      </button>
      {sent ? (
        <p className="success" role="status">
          Thanks — we received your request and will follow up shortly.
        </p>
      ) : null}
    </form>
  )
}
