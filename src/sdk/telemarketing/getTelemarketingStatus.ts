import { TELEMARKETING_ENDPOINT } from './constants'

export type TelemarketingStatus = {
  canImpersonate: boolean
  customerEmail: string | null
  userEmail: string | null
  sessionToken: string
}

export default function getTelemarketingStatus(
  sessionToken?: string
): Promise<TelemarketingStatus> {
  const url = new URL(TELEMARKETING_ENDPOINT)

  url.searchParams.append('v', new Date().getTime().toString())

  if (sessionToken) {
    url.searchParams.append('sessionToken', sessionToken)
  }

  return fetch(url.href, {
    credentials: 'include',
  }).then((response) => response.json())
}
