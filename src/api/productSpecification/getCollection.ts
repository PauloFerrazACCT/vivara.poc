import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import axios from 'axios'

import storeConfig from '../../../store.config'

export default async function getCollection(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const { account } = storeConfig

  const { collection } = req.body

  if (req.method === 'POST') {
    try {
      const { data } = await axios.get(
        `https://${account}.vtexcommercestable.com.br/api/dataentities/IN/search?_fields=_all&_where=colecao="${encodeURIComponent(
          collection
        )}"`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )

      res.send(JSON.stringify(data))
    } catch (err) {
      throw new Error(`Um erro ocorreu: ${err.message}`)
    }
  }
}
