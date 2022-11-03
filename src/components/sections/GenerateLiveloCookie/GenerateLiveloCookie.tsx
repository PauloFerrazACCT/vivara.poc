import type React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { set } from 'idb-keyval'
import { useCart } from 'src/sdk/cart'

const GenerateLiveloCookie: React.FC = () => {
  const { id } = useCart()

  useEffect(() => {
    const setIsOriginLivelo = async () => {
      const { data: newOrderFormId } = await axios.get('/api/getOrderFormId')

      if (id === '') {
        await set('main::store::cart', {
          id: newOrderFormId,
          items: {},
        })
      }

      try {
        await axios.post('/api/setMarketingData', {
          utmSource: 'livelo',
          orderformID: id === '' ? newOrderFormId : id,
        })
      } catch (error) {
        console.error(error)
      }
    }

    setIsOriginLivelo()
  }, [])

  return null
}

export default GenerateLiveloCookie
