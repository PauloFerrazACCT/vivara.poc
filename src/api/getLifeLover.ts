import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import getMasterdataURL from '../services/masterdata'

export default async function getLifeLover(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const masterdataURL = await getMasterdataURL()

  const { email } = req.body

  if (req.method === 'POST') {
    try {
      const { data } = await masterdataURL.get(
        `/api/dataentities/CL/search?_fields=lifelover,email,firstName,lastName&_where=email="${encodeURIComponent(
          email
        )}"`,
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
