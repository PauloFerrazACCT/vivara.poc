import type { GatsbyFunctionRequest } from 'gatsby'
import type { AxiosInstance } from 'axios'
import axios from 'axios'

import storeConfig from '../../store.config'

export default async function getMasterdataURL(
  req: GatsbyFunctionRequest
): Promise<AxiosInstance> {
  const { account } = storeConfig

  const cookies = req.headers.cookie
    ?.split('; ')
    .reduce((prev: any, current: string) => {
      const [name, ...value] = current.split('=')

      prev[name] = value.join('=')

      return prev
    }, {})

  const autCookie = cookies[`VtexIdclientAutCookie_${account}`]

  if (cookies && !autCookie) {
    return undefined as unknown as AxiosInstance
  }

  return axios.create({
    baseURL: `https://${account}.myvtex.com`,
    headers: {
      Accept: 'application/vnd.vtex.ds.v10+json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      cookie: `VtexIdclientAutCookie_${account}=${autCookie}`,
    },
  })
}
