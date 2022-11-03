import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import axios from 'axios'

import storeConfig from '../../store.config'

export default async function getOrderFormId(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const { account } = storeConfig

  if (req.method === 'GET') {
    try {
      const { data } = await axios.get(
        `https://${account}.vtexcommercestable.com.br/api/checkout/pub/orderForm/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      )

      res.send(JSON.stringify(data.orderFormId))
    } catch (err) {
      throw new Error(`Um erro ocorreu: ${err.message}`)
    }
  }
}
