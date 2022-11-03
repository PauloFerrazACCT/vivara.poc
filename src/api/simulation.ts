import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import axios from 'axios'

import storeConfig from '../../store.config'

export default async function simulation(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const { account } = storeConfig

  if (req.method === 'POST') {
    try {
      const variables = req.body

      const { data } = await axios.post(
        `http://${account}.vtexcommercestable.com.br/api/checkout/pub/orderforms/simulation`,
        variables,
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
