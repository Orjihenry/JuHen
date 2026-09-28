import { useState, type ChangeEvent, type FormEvent } from 'react'
import { services } from '../data'
import {
  addonOptions,
  bathroomOptions,
  bedroomOptions,
  cleaningTypeOptions,
  emptyEstimateValues,
  isWorkplaceService,
  money,
  officeSpaceOptions,
  petOptions,
  quoteEstimate,
  restroomOptions,
  squareFootageGroups,
  squareFootageOptions,
  timeWindowOptions,
  toggleAddon,
  type EstimateValues,
} from '../estimatePricing'
import { DateCalendar, localDateValue } from './DateCalendar'
import { PlanSummary } from './PlanSummary'
import { STEPS } from './estimateSteps'

const today = localDateValue()

export function EstimateForm() {
  const [step, setStep] = useState(0)
  const [sent, setSent] = useState(false)
  const [values, setValues] = useState<EstimateValues>(emptyEstimateValues)
  const lastStep = STEPS.length - 1
  const current = STEPS[step]
  const quote = quoteEstimate(values)
  const workplace = isWorkplaceService(values.service)

  function onFieldChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target
    setValues((currentValues) => {
      if (name !== 'service') {
        return {
          ...currentValues,
          [name]: value,
        }
      }

      const nextWorkplace = isWorkplaceService(value)

      return {
        ...currentValues,
        service: value,
        bedrooms: nextWorkplace ? '' : currentValues.bedrooms,
        officeSpace: nextWorkplace ? currentValues.officeSpace : '',
      }
    })
  }

  function onAddonToggle(id: string) {
    setValues((currentValues) => ({
      ...currentValues,
      addons: toggleAddon(currentValues.addons, id),
    }))
  }

  function fieldsAreValid(form: HTMLFormElement) {
    const panel = form.querySelector<HTMLElement>(`[data-step-panel="${step}"]`)

    if (!panel) {
      return true
    }

    const fields = panel.querySelectorAll<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >('input, select, textarea')

    for (const field of fields) {
      if (!field.checkValidity()) {
        field.reportValidity()
        return false
      }
    }

    return true
  }

  function goBack() {
    setStep((currentStep) => Math.max(0, currentStep - 1))
  }

  function startAnother() {
    setValues(emptyEstimateValues)
    setSent(false)
    setStep(0)
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (sent) {
      return
    }

    if (!fieldsAreValid(event.currentTarget)) {
      return
    }

    if (step < lastStep) {
      setStep((currentStep) => currentStep + 1)
      return
    }

    setSent(true)
  }

  return (
    <div className="booking estimate-booking">
      <PlanSummary values={values} quote={quote} step={step} sent={sent} />

      <form className="form" onSubmit={onSubmit} noValidate>
        {sent ? (
          <div className="form-progress">
            <p className="eyebrow">Request sent</p>
            <h3>Thanks — we’ll be in touch</h3>
            <p className="muted">
              We received your estimate request and will follow up shortly.
            </p>
          </div>
        ) : (
          <div className="form-progress">
            <p className="eyebrow">
              Step {step + 1} of {STEPS.length}
            </p>
            <h3>{current.heading}</h3>
            <p className="muted">{current.copy}</p>
          </div>
        )}

        <fieldset
          className="form-panel"
          data-step-panel="0"
          hidden={sent || step !== 0}
        >
          <legend className="visually-hidden">Cleaning job details</legend>
          <div className="form-row">
            <label>
              Service *
              <select
                name="service"
                required
                value={values.service}
                onChange={onFieldChange}
              >
                <option value="" disabled>
                  Choose an option
                </option>
                {services.map((service) => (
                  <option value={service.slug} key={service.slug}>
                    {service.title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Type of cleaning *
              <select
                name="cleaningType"
                required
                value={values.cleaningType}
                onChange={onFieldChange}
              >
                <option value="" disabled>
                  Choose an option
                </option>
                {cleaningTypeOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-row">
            {workplace ? (
              <label>
                Office space *
                <select
                  name="officeSpace"
                  required
                  value={values.officeSpace}
                  onChange={onFieldChange}
                >
                  <option value="" disabled>
                    Choose an option
                  </option>
                  {officeSpaceOptions.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <label>
                Number of bedrooms *
                <select
                  name="bedrooms"
                  required
                  value={values.bedrooms}
                  onChange={onFieldChange}
                >
                  <option value="" disabled>
                    Choose an option
                  </option>
                  {bedroomOptions.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <label>
              {workplace ? 'Number of restrooms *' : 'Number of bathrooms *'}
              <select
                name="bathrooms"
                required
                value={values.bathrooms}
                onChange={onFieldChange}
              >
                <option value="" disabled>
                  Choose an option
                </option>
                {(workplace ? restroomOptions : bathroomOptions).map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-row">
            <label>
              Square footage *
              <select
                name="squareFootage"
                required
                value={values.squareFootage}
                onChange={onFieldChange}
              >
                <option value="" disabled>
                  Choose an option
                </option>
                {squareFootageGroups.map((group) => (
                  <optgroup label={group} key={group}>
                    {squareFootageOptions
                      .filter((option) => option.group === group)
                      .map((option) => (
                        <option value={option.value} key={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </optgroup>
                ))}
              </select>
            </label>
            <label>
              {workplace ? 'Pets on site *' : 'Pets in the home *'}
              <select
                name="pets"
                required
                value={values.pets}
                onChange={onFieldChange}
              >
                <option value="" disabled>
                  Choose an option
                </option>
                {petOptions.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="addon-field">
            <div className="addon-head">
              <p className="calendar-label">Add-ons</p>
              <p className="addon-more">Scroll for more</p>
            </div>
            <div className="addon-scroll">
              <div className="addon-grid">
              {addonOptions.map((addon) => {
                const selected = values.addons.includes(addon.id)

                return (
                  <label
                    className={selected ? 'addon-tile is-selected' : 'addon-tile'}
                    key={addon.id}
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => onAddonToggle(addon.id)}
                    />
                    <span>{addon.label}</span>
                    <span className="addon-price">{money(addon.fee)}</span>
                  </label>
                )
              })}
              </div>
            </div>
          </div>
          <label>
            Additional info
            <textarea
              name="additionalInfo"
              value={values.additionalInfo}
              onChange={onFieldChange}
              rows={4}
              placeholder="Access notes, supplies to avoid, or anything else we should know"
            />
          </label>
        </fieldset>

        <fieldset
          className="form-panel"
          data-step-panel="1"
          hidden={sent || step !== 1}
        >
          <legend className="visually-hidden">Preferred date and time</legend>
          <div className="calendar-field">
            <p className="calendar-label">Preferred date *</p>
            <DateCalendar
              value={values.preferredDate}
              min={today}
              onChange={(preferredDate) =>
                setValues((currentValues) => ({
                  ...currentValues,
                  preferredDate,
                }))
              }
            />
            <input
              className="visually-hidden"
              name="preferredDate"
              type="text"
              required
              value={values.preferredDate}
              onChange={onFieldChange}
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>
          <label>
            Time window *
            <select
              name="timeWindow"
              required
              value={values.timeWindow}
              onChange={onFieldChange}
            >
              <option value="" disabled>
                Choose an option
              </option>
              {timeWindowOptions.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </fieldset>

        <fieldset
          className="form-panel"
          data-step-panel="2"
          hidden={sent || step !== 2}
        >
          <legend className="visually-hidden">Contact details</legend>
          <div className="form-row">
            <label>
              First name *
              <input
                name="firstName"
                type="text"
                required
                autoComplete="given-name"
                value={values.firstName}
                onChange={onFieldChange}
              />
            </label>
            <label>
              Last name *
              <input
                name="lastName"
                type="text"
                required
                autoComplete="family-name"
                value={values.lastName}
                onChange={onFieldChange}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Email *
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                value={values.email}
                onChange={onFieldChange}
              />
            </label>
            <label>
              Phone *
              <input
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                value={values.phone}
                onChange={onFieldChange}
              />
            </label>
          </div>
          <label>
            Address *
            <input
              name="address"
              type="text"
              required
              autoComplete="street-address"
              value={values.address}
              onChange={onFieldChange}
            />
          </label>
          <div className="form-row">
            <label>
              City *
              <input
                name="city"
                type="text"
                required
                autoComplete="address-level2"
                value={values.city}
                onChange={onFieldChange}
              />
            </label>
            <label>
              Postal code *
              <input
                name="postalCode"
                type="text"
                required
                autoComplete="postal-code"
                value={values.postalCode}
                onChange={onFieldChange}
              />
            </label>
          </div>
        </fieldset>

        <fieldset
          className="form-panel"
          data-step-panel="3"
          hidden={sent || step !== 3}
        >
          <legend className="visually-hidden">Payment</legend>
          <div className="payment-placeholder">
            <p>
              Card payment will live on this step. For now, send the request
              and we’ll follow up with your estimate.
            </p>
          </div>
        </fieldset>

        {sent ? (
          <>
            <p className="success" role="status">
              Thanks — we received your request and will follow up shortly.
            </p>
            <div className="form-actions">
              <button className="btn btn-ghost" type="button" onClick={startAnother}>
                Request another estimate
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="plan-mobile-total" aria-live="polite">
              <span>Estimated total</span>
              <strong>{money(quote.total)}</strong>
            </div>
            <div className="form-actions">
              {step > 0 ? (
                <button className="btn btn-ghost" type="button" onClick={goBack}>
                  Back
                </button>
              ) : null}
              <button className="btn btn-primary" type="submit">
                {step === lastStep ? 'Send request' : 'Continue'}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
