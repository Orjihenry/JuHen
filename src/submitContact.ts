export type ContactRequestPayload = {
  website: string
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

export async function submitContact(payload: ContactRequestPayload) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Could not send message')
  }

  const data: unknown = await response.json().catch(() => null)

  if (
    !data ||
    typeof data !== 'object' ||
    !('ok' in data) ||
    data.ok !== true
  ) {
    throw new Error('Could not send message')
  }
}
