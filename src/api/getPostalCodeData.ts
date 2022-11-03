import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import axios from 'axios'

import storeConfig from '../../store.config'

export default async function getPostalCodeData(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const { account } = storeConfig

  if (req.method === 'POST') {
    try {
      const { postalCode } = req.body
      const { data } = await axios.get(
        `http://${account}.vtexcommercestable.com.br/api/checkout/pub/postal-code/BRA/${postalCode}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      res.send(JSON.stringify(data))
    } catch (err) {
      throw new Error(`Um erro ocorreu: ${err.message}`)
    }
  }
}
