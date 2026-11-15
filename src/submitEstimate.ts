import {
  addonOptions,
  bathroomOptions,
  bedroomOptions,
  cleaningTypeOptions,
  formatVisitDate,
  isWorkplaceService,
  labelFor,
  officeSpaceOptions,
  petOptions,
  restroomOptions,
  serviceTitle,
  squareFootageOptions,
  timeWindowOptions,
  type EstimateQuote,
  type EstimateValues,
} from './estimatePricing'

export type EstimateRequestPayload = {
  website: string
  contact: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
  }
  details: {
    service: string
    cleaningType: string
    space: string
    bathrooms: string
    squareFootage: string
    pets: string
    addons: string
    additionalInfo: string
    preferredDate: string
    timeWindow: string
  }
  quote: {
    lines: { label: string; amount: number }[]
    total: number
  }
}

function buildPayload(
  values: EstimateValues,
  quote: EstimateQuote,
  honeypot: string,
): EstimateRequestPayload {
  const workplace = isWorkplaceService(values.service)

  return {
    website: honeypot,
    contact: {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      address: values.address,
      city: values.city,
      postalCode: values.postalCode,
    },
    details: {
      service: serviceTitle(values.service),
      cleaningType: labelFor(cleaningTypeOptions, values.cleaningType),
      space: workplace
        ? labelFor(officeSpaceOptions, values.officeSpace)
        : labelFor(bedroomOptions, values.bedrooms),
      bathrooms: labelFor(
        workplace ? restroomOptions : bathroomOptions,
        values.bathrooms,
      ),
      squareFootage: labelFor(squareFootageOptions, values.squareFootage),
      pets: labelFor(petOptions, values.pets),
      addons: addonOptions
        .filter((addon) => values.addons.includes(addon.id))
        .map((addon) => addon.label)
        .join(', '),
      additionalInfo: values.additionalInfo,
      preferredDate: formatVisitDate(values.preferredDate),
      timeWindow: labelFor(timeWindowOptions, values.timeWindow),
    },
    quote: {
      lines: quote.lines.map((line) => ({
        label: line.label,
        amount: line.amount,
      })),
      total: quote.total,
    },
  }
}

export async function submitEstimate(
  values: EstimateValues,
  quote: EstimateQuote,
  honeypot = '',
) {
  const response = await fetch('/api/estimates', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(buildPayload(values, quote, honeypot)),
  })

  if (!response.ok) {
    throw new Error('Could not send quote request')
  }

  const data: unknown = await response.json().catch(() => null)

  if (
    !data ||
    typeof data !== 'object' ||
    !('ok' in data) ||
    data.ok !== true
  ) {
    throw new Error('Could not send quote request')
  }
}
