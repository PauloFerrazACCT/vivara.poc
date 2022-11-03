import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import axios from 'axios'

import storeConfig from '../../store.config'

export default async function getSearchStore(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const { account } = storeConfig

  if (req.method === 'GET') {
    try {
      const { data } = await axios.get(
        `https://${account}.vtexcommercestable.com.br/api/dataentities/LJ/search?_fields=bairro,cidade,cep,loja,obs,estado,logradouro,telefone`,
        {
          headers: {
            'REST-Range': 'resources=0-233',
          },
        }
      )

      res.send(JSON.stringify(data))
    } catch (err) {
      res.status(err.response.status)
      res.send(err.message)
    }
  }
}
