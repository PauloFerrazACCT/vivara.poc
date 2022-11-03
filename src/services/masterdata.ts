import type { AxiosInstance } from 'axios'
import axios from 'axios'

import storeConfig from '../../store.config'

export default async function getMasterdataURL(): Promise<AxiosInstance> {
  const { account } = storeConfig

  return axios.create({
    baseURL: `https://${account}.myvtex.com`,
    headers: {
      Accept: 'application/vnd.vtex.ds.v10+json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-VTEX-API-AppKey': process.env.APPKEY,
      'X-VTEX-API-AppToken': process.env.APPTOKEN,
    },
  })
}
