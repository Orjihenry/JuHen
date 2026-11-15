import { useState, type FormEvent } from 'react'
import { submitContact } from '../submitContact'

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [honeypot, setHoneypot] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (sent || submitting) {
      return
    }

    const form = event.currentTarget

    if (!form.reportValidity()) {
      return
    }

    const data = new FormData(form)

    setSubmitting(true)
    setSubmitError('')
    setSent(false)

    try {
      await submitContact({
        website: honeypot,
        firstName: String(data.get('firstName') ?? ''),
        lastName: String(data.get('lastName') ?? ''),
        email: String(data.get('email') ?? ''),
        phone: String(data.get('phone') ?? ''),
        message: String(data.get('message') ?? ''),
      })
      setSent(true)
      form.reset()
      setHoneypot('')
    } catch {
      setSent(false)
      setSubmitError(
        'We could not send your message. Please try again or call us.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (sent) {
    return (
      <p className="success" role="status">
        Thanks — we received your message and will follow up shortly.
      </p>
    )
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <label>
          First name *
          <input
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
          />
        </label>
        <label>
          Last name *
          <input
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
          />
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
        <textarea name="message" required autoComplete="off" />
      </label>
      <label className="visually-hidden" aria-hidden="true">
        Company website
        <input
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </label>
      {submitError ? (
        <p className="form-error" role="alert">
          {submitError}
        </p>
      ) : null}
      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
