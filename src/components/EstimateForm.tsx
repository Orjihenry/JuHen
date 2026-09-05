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
        Address *
        <input name="address" type="text" required autoComplete="address" />
      </label>
      <div className="form-row">
        <label>
          City *
          <input name="city" type="text" required autoComplete="city" />
        </label>
        <label>
          Postal code *
          <input name="postal-code" type="text" required autoComplete="postal-code" />
        </label>
      </div>
      <div className="form-row">
        <label>
          Service *
          <select name="service" defaultValue="choose">
            <option value="choose">Choose an option</option>
            {services.map((service) => (
              <option value={service.slug} key={service.slug}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Square footage
          <input type="text" name="square footage" id="square footage" />
        </label>
      </div>
      <div className="form-row">
      <label>
          Number of Bedrooms *
          <select name="size" defaultValue="medium">
            <option value="choose">Choose an option</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
          </select>
        </label>
        <label>
          Number of Bathrooms *
          <select name="size" defaultValue="medium">
            <option value="choose">Choose an option</option>
            <option value="1">1 Bathroom</option>
            <option value="2">2 Bathrooms</option>
            <option value="3">3 Bathrooms</option>
            <option value="4+">4+ Bathrooms</option>
          </select>
        </label>
      </div>
      <div className="form-row">
        <label>
          Type of cleaning required *
          <select name="size" defaultValue="medium">
            <option value="choose">Choose an option</option>
            <option value="standard">Standard Cleaning</option>
            <option value="deep">Deep Cleaning</option>
            <option value="move-in">Move-in/out Cleaning</option>
            <option value="airbnb">Airbnb Turnover Cleaning</option>
            <option value="construction">Post-Construction Cleaning</option>
          </select>
        </label>
        <label>
          Pets in the home *
          <select name="size" defaultValue="medium">
            <option value="choose">Choose an option</option>
            <option value="no">No Pets</option>
            <option value="cats">Cats</option>
            <option value="dogs">Dogs</option>
            <option value="multiple">Multiple Pets</option>
            <option value="other">Other</option>
          </select>
        </label>
      </div>
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
