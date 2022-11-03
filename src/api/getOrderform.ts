import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import axios from 'axios'

import storeConfig from '../../store.config'

export default async function getOrderform(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const { account } = storeConfig

  const { orderformID } = req.body

  if (req.method === 'POST') {
    try {
      const { data } = await axios.get(
        `https://${account}.vtexcommercestable.com.br/api/checkout/pub/orderForm/${orderformID}?refreshOutdatedData=true`,
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
