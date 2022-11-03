import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import axios from 'axios'

import storeConfig from '../../store.config'

export default async function getAllCollections(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const { account } = storeConfig

  if (req.method === 'POST') {
    try {
      const { data } = await axios.get(
        `https://${account}.vtexcommercestable.com.br/api/catalog_system/pvt/collection/search?page=1&pageSize=1000&orderByAsc=true`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-VTEX-API-AppKey': process.env.APPKEY,
            'X-VTEX-API-AppToken': process.env.APPTOKEN,
          },
        }
      )

      res.send(JSON.stringify(data))
    } catch (err) {
      throw new Error(`Um erro ocorreu: ${err.message}`)
    }
  }
}
