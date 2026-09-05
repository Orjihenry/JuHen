import { useState, type FormEvent } from 'react'

export function ContactForm() {
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
          First name *
          <input name="first-name" type="text" required autoComplete="first-name" />
        </label>
        <label>
          Last name
          <input name="last-name" type="text" required autoComplete="last-name" />
        </label>
      </div>
      <div className="form-row">
        <label>
          Email *
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label>
          Phone *
          <input name="phone" type="tel" required autoComplete="tel" />
        </label>
      </div>
      <label>
        Message *
        <textarea name="message" required autoComplete="message" />
      </label>
      <button className="btn btn-primary" type="submit">
        Send message
      </button>
      {sent ? (
        <p className="success" role="status">
          Thanks — we received your message and will follow up shortly.
        </p>
      ) : null}
    </form>
  )
}
