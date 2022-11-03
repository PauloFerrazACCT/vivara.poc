import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import axios from 'axios'

import storeConfig from '../../store.config'

export default async function productAvailability(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const { account } = storeConfig

  if (req.method !== 'POST') {
    res.status(405)
    res.json({ message: 'Method not allowed' })

    return
  }

  try {
    const variables = req.body

    const { data } = await axios.post(
      `http://${account}.vtexcommercestable.com.br/api/dataentities/notify/documents?_schema=notify`,
      variables,
      {
        headers: {
          Accept: 'application/vnd.vtex.ds.v10+json',
          'Content-Type': 'application/json',
        },
      }
    )

    res.send(JSON.stringify(data))
  } catch (err) {
    throw new Error(`Um erro ocorreu: ${err.message}`)
  }
}
