import axios from 'axios'

const handleShippingData = async (items: Item[], postalCode: string) => {
  const defaultResponse = { logisticsInfo: [{ slas: [] }] }
  const variables = {
    items,
    postalCode,
    country: 'BRA',
  }

  try {
    const { data: response } = await axios.post('/api/simulation', variables, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response || defaultResponse
  } catch (error) {
    console.error(error)

    return defaultResponse
  }
}

export default handleShippingData
