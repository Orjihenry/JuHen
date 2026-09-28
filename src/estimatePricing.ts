import { services } from './data'

export type EstimateValues = {
  service: string
  cleaningType: string
  bedrooms: string
  officeSpace: string
  bathrooms: string
  squareFootage: string
  pets: string
  addons: string[]
  additionalInfo: string
  address: string
  city: string
  postalCode: string
  preferredDate: string
  timeWindow: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

export type QuoteLine = {
  id: string
  label: string
  amount: number
}

export type EstimateQuote = {
  lines: QuoteLine[]
  total: number
}

export const emptyEstimateValues: EstimateValues = {
  service: '',
  cleaningType: '',
  bedrooms: '',
  officeSpace: '',
  bathrooms: '',
  squareFootage: '',
  pets: '',
  addons: [],
  additionalInfo: '',
  address: '',
  city: '',
  postalCode: '',
  preferredDate: '',
  timeWindow: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
}

export const cleaningTypeOptions = [
  { value: 'standard', label: 'Standard cleaning' },
  { value: 'deep', label: 'Deep cleaning' },
  { value: 'move-in', label: 'Move-in / move-out' },
  { value: 'construction', label: 'Post-construction' },
  { value: 'biweekly', label: 'Bi-weekly cleaning' },
] as const

export const bedroomOptions = [
  { value: '1', label: '1 bedroom' },
  { value: '2', label: '2 bedrooms' },
  { value: '3', label: '3 bedrooms' },
  { value: '4', label: '4+ bedrooms' },
] as const

export const officeSpaceOptions = [
  { value: '1-2', label: '1–2 rooms' },
  { value: '3-5', label: '3–5 rooms' },
  { value: '6-10', label: '6–10 rooms' },
  { value: '11+', label: '11+ rooms' },
] as const

export const bathroomOptions = [
  { value: '1', label: '1 bathroom' },
  { value: '2', label: '2 bathrooms' },
  { value: '3', label: '3 bathrooms' },
  { value: '4', label: '4+ bathrooms' },
] as const

export const restroomOptions = [
  { value: '1', label: '1 restroom' },
  { value: '2', label: '2 restrooms' },
  { value: '3', label: '3 restrooms' },
  { value: '4', label: '4+ restrooms' },
] as const

export const petOptions = [
  { value: 'no', label: 'No pets' },
  { value: 'cats', label: 'Cats' },
  { value: 'dogs', label: 'Dogs' },
  { value: 'multiple', label: 'Multiple pets' },
  { value: 'other', label: 'Other' },
] as const

export const timeWindowOptions = [
  { value: 'morning', label: 'Morning (8am–12pm)' },
  { value: 'afternoon', label: 'Afternoon (12pm–4pm)' },
  { value: 'evening', label: 'Evening (4pm–6pm)' },
  { value: 'flexible', label: 'Flexible' },
] as const

export const squareFootageOptions = [
  {
    value: '0-500',
    label: '0–500 sq ft',
    group: 'Homes and apartments',
    fee: 0,
  },
  {
    value: '501-1000',
    label: '501–1,000 sq ft',
    group: 'Homes and apartments',
    fee: 0,
  },
  {
    value: '1001-2000',
    label: '1,001–2,000 sq ft',
    group: 'Homes and apartments',
    fee: 0,
  },
  {
    value: '2001-3000',
    label: '2,001–3,000 sq ft',
    group: 'Homes and apartments',
    fee: 45,
  },
  {
    value: '3001-5000',
    label: '3,001–5,000 sq ft',
    group: 'Large homes and offices',
    fee: 95,
  },
  {
    value: '5001-10000',
    label: '5,001–10,000 sq ft',
    group: 'Large homes and offices',
    fee: 175,
  },
  {
    value: '10001+',
    label: '10,001+ sq ft',
    group: 'Large homes and offices',
    fee: 300,
  },
] as const

export const squareFootageGroups = [
  'Homes and apartments',
  'Large homes and offices',
] as const

export const addonOptions = [
  { id: 'fridge', label: 'Fridge', fee: 35 },
  { id: 'oven', label: 'Oven', fee: 40 },
  { id: 'microwave', label: 'Microwave', fee: 15 },
  { id: 'windows', label: 'Interior windows', fee: 45 },
  { id: 'cabinets', label: 'Cabinets', fee: 50 },
  { id: 'laundry', label: 'Laundry / bedding', fee: 30 },
  { id: 'detailing', label: 'Detailing supplies', fee: 25 },
  { id: 'balcony', label: 'Balcony / patio', fee: 35 },
  { id: 'dusting', label: 'Post-reno dusting', fee: 55 },
  { id: 'green', label: 'Green products', fee: 15 },
  { id: 'garage-single', label: 'Single garage', fee: 40, group: 'garage' },
  { id: 'garage-double', label: 'Double garage', fee: 65, group: 'garage' },
  { id: 'garage-triple', label: 'Triple / large garage', fee: 90, group: 'garage' },
] as const

const garageAddonIds: string[] = addonOptions
  .filter((addon) => 'group' in addon && addon.group === 'garage')
  .map((addon) => addon.id)

export function toggleAddon(selected: string[], id: string) {
  const isSelected = selected.includes(id)

  if (isSelected) {
    return selected.filter((item) => item !== id)
  }

  const next = garageAddonIds.includes(id)
    ? selected.filter((item) => !garageAddonIds.includes(item))
    : selected

  return [...next, id]
}

const bedroomBase: Record<string, number> = {
  '1': 120,
  '2': 155,
  '3': 190,
  '4': 230,
}

const officeSpaceBase: Record<string, number> = {
  '1-2': 130,
  '3-5': 175,
  '6-10': 230,
  '11+': 290,
}

export function isWorkplaceService(service: string) {
  return service === 'office' || service === 'commercial'
}

const cleaningTypeRate: Record<string, number> = {
  standard: 0,
  deep: 0.35,
  'move-in': 0.45,
  construction: 0.7,
}

const serviceExtra: Record<string, number> = {
  office: 20,
  commercial: 25,
  airbnb: 30,
}

const petFee: Record<string, number> = {
  cats: 15,
  dogs: 15,
  multiple: 25,
  other: 15,
}

export function money(amount: number) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(amount)
}

export function labelFor(
  options: readonly { value: string; label: string }[],
  value: string,
) {
  return options.find((option) => option.value === value)?.label ?? ''
}

export function serviceTitle(slug: string) {
  return services.find((service) => service.slug === slug)?.title ?? ''
}

export function formatVisitDate(value: string) {
  if (!value) {
    return ''
  }

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  return date.toLocaleDateString('en-CA', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export function quoteEstimate(values: EstimateValues): EstimateQuote {
  const lines: QuoteLine[] = []
  const workplace = isWorkplaceService(values.service)
  const bathroomCount = Number(values.bathrooms)
  const base = workplace
    ? officeSpaceBase[values.officeSpace]
    : bedroomBase[values.bedrooms]
  const baseLabel = workplace
    ? `${labelFor(officeSpaceOptions, values.officeSpace)} visit`
    : `${labelFor(bedroomOptions, values.bedrooms)} visit`

  if (base) {
    lines.push({
      id: 'base',
      label: baseLabel,
      amount: base,
    })
  }

  if (base && bathroomCount > 1) {
    const extraBaths = bathroomCount - 1
    const bathNoun = workplace ? 'restroom' : 'bathroom'
    lines.push({
      id: 'baths',
      label:
        extraBaths === 1
          ? `Additional ${bathNoun}`
          : `Additional ${bathNoun}s (${extraBaths})`,
      amount: extraBaths * 30,
    })
  }

  if (base && values.cleaningType && cleaningTypeRate[values.cleaningType]) {
    lines.push({
      id: 'cleaning-type',
      label: labelFor(cleaningTypeOptions, values.cleaningType),
      amount: Math.round(base * cleaningTypeRate[values.cleaningType]),
    })
  }

  if (base && serviceExtra[values.service]) {
    lines.push({
      id: 'service',
      label: serviceTitle(values.service),
      amount: serviceExtra[values.service],
    })
  }

  const sizeOption = squareFootageOptions.find(
    (option) => option.value === values.squareFootage,
  )

  if (base && sizeOption?.fee) {
    lines.push({
      id: 'size',
      label: `Floor area (${sizeOption.label})`,
      amount: sizeOption.fee,
    })
  }

  if (base && petFee[values.pets]) {
    lines.push({
      id: 'pets',
      label: 'Pet-friendly visit',
      amount: petFee[values.pets],
    })
  }

  if (base && values.timeWindow === 'evening') {
    lines.push({
      id: 'evening',
      label: 'Evening window',
      amount: 20,
    })
  }

  const selectedAddons = addonOptions.filter((addon) =>
    values.addons.includes(addon.id),
  )
  const addonTotal = selectedAddons.reduce((sum, addon) => sum + addon.fee, 0)

  if (base && addonTotal > 0) {
    lines.push({
      id: 'addons',
      label:
        selectedAddons.length === 1
          ? selectedAddons[0].label
          : `Add-ons (${selectedAddons.length})`,
      amount: addonTotal,
    })
  }

  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0)

  if (base && values.cleaningType === 'biweekly' && subtotal > 0) {
    lines.push({
      id: 'biweekly',
      label: 'Bi-weekly plan',
      amount: -Math.round(subtotal * 0.15),
    })
  }

  const total = lines.reduce((sum, line) => sum + line.amount, 0)

  return { lines, total }
}

export function planFacts(values: EstimateValues) {
  const workplace = isWorkplaceService(values.service)
  const job = [
    serviceTitle(values.service),
    labelFor(cleaningTypeOptions, values.cleaningType),
    workplace
      ? labelFor(officeSpaceOptions, values.officeSpace)
      : labelFor(bedroomOptions, values.bedrooms),
    labelFor(workplace ? restroomOptions : bathroomOptions, values.bathrooms),
    labelFor(squareFootageOptions, values.squareFootage),
    labelFor(petOptions, values.pets),
  ]
    .filter(Boolean)
    .join(' · ')

  const addons = addonOptions
    .filter((addon) => values.addons.includes(addon.id))
    .map((addon) => addon.label)
    .join(' · ')

  const notes =
    values.additionalInfo.length > 72
      ? `${values.additionalInfo.slice(0, 72).trim()}…`
      : values.additionalInfo

  const visit = [
    formatVisitDate(values.preferredDate),
    labelFor(timeWindowOptions, values.timeWindow),
    [values.address, values.city, values.postalCode].filter(Boolean).join(', '),
  ]
    .filter(Boolean)
    .join(' · ')

  const contact = [
    [values.firstName, values.lastName].filter(Boolean).join(' '),
    values.email,
    values.phone,
  ]
    .filter(Boolean)
    .join(' · ')

  return [
    { id: 'job', label: 'Details', value: job },
    { id: 'addons', label: 'Add-ons', value: addons },
    { id: 'notes', label: 'Notes', value: notes },
    { id: 'visit', label: 'Visit', value: visit },
    { id: 'contact', label: 'Contact', value: contact },
  ].filter((fact) => fact.value)
}
