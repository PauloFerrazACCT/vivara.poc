import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import axios from 'axios'

import storeConfig from '../../store.config'

export default async function setMarketingData(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const { account } = storeConfig

  if (req.method === 'POST') {
    try {
      const { orderformID, utmSource } = req.body
      const { data } = await axios.post(
        `http://${account}.vtexcommercestable.com.br/api/checkout/pub/orderForm/${orderformID}/attachments/marketingData`,
        { utmSource },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      )

      res.send(JSON.stringify(data))
    } catch (err) {
      throw new Error(`Um erro ocorreu: ${err.message}`)
    }
  }
}
