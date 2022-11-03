import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import axios from 'axios'

import storeConfig from '../../store.config'

export default async function regionalizeOrderform(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const { account } = storeConfig

  if (req.method === 'POST') {
    try {
      const { orderformID } = req.body
      const { postalCodeData } = req.body

      const variables = {
        clearAddressIfPostalCodeNotFound: true,
        selectedAddresses: [
          {
            addressType: 'residential',
            isDisposable: true,
            addressQuery: '',
            ...postalCodeData,
          },
          {
            addressType: 'search',
            isDisposable: true,
            addressQuery: '',
            ...postalCodeData,
          },
        ],
      }

      const { data } = await axios.post(
        `http://${account}.vtexcommercestable.com.br/api/checkout/pub/orderForm/${orderformID}/attachments/shippingData`,
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
