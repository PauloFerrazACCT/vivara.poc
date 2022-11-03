import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

import getMasterdataURL from '../services/masterdata'

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const masterdataURL = await getMasterdataURL()

  if (!masterdataURL) {
    return
  }

  if (req.method === 'GET') {
    try {
      if (!req.query.userId) {
        return
      }

      const { data } = await masterdataURL.get(
        '/api/dataentities/sizeguide/search?_schema=sizeguide-schema',
        {
          params: {
            _fields: 'id,measures',
            _where: `userId = "${req.query.userId}"`,
          },
        }
      )

      res.send(JSON.stringify(data))
    } catch (err) {
      throw new Error(`Um erro ocorreu: ${err.message}`)
    }
  }

  if (req.method === 'POST') {
    try {
      const { data } = await masterdataURL.post(
        `api/dataentities/sizeguide/documents?_schema=sizeguide-schema`,
        req.body
      )

      res.send(JSON.stringify(data))
    } catch (err) {
      throw new Error(`Um erro ocorreu: ${err.message}`)
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { measuresId, userId, measures } = req.body

      const { data } = await masterdataURL.patch(
        `api/dataentities/sizeguide/documents/${measuresId}?_schema=sizeguide-schema`,
        {
          userId,
          measures,
        }
      )

      res.send(JSON.stringify(data))
    } catch (err) {
      throw new Error(`Um erro ocorreu: ${err.message}`)
    }
  }
}
