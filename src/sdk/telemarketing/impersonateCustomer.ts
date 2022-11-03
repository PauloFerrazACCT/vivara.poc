import { TELEMARKETING_ENDPOINT } from './constants'
import type { TelemarketingStatus } from './getTelemarketingStatus'

export default function impersonateCustomer(
  customerEmail: string,
  sessionToken: string
): Promise<TelemarketingStatus> {
  return fetch(`${TELEMARKETING_ENDPOINT}`, {
    method: 'POST',
    body: JSON.stringify({ customerEmail, sessionToken }),
    credentials: 'include',
  }).then((response) => response.json())
}
