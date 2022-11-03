import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import axios from 'axios'

import storeConfig from '../../store.config'

export default async function setCustomData(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const { account } = storeConfig

  if (req.method === 'POST') {
    try {
      const { orderformID, appName, fieldName, fieldValue } = req.body

      const { data } = await axios.put(
        `http://${account}.vtexcommercestable.com.br/api/checkout/pub/orderForm/${orderformID}/customData/${appName}/${fieldName}`,
        { value: fieldValue },
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
