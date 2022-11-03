import axios from 'axios'
import type { Dispatch, SetStateAction } from 'react'
import { useState, useEffect } from 'react'

type AvailableItemParam = {
  sku: string
}

type GetAvailableItemsData = {
  url: string
  body: Record<string, unknown>
  setAvailableItemsData: Dispatch<SetStateAction<any>>
}

const getAvailableItems = async ({
  url,
  body,
  setAvailableItemsData,
}: GetAvailableItemsData) => {
  await axios
    .post(url, body, {
      headers: {
        Accept: 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      setAvailableItemsData(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

export function useAvailableItems({ sku }: AvailableItemParam) {
  const [availableItemsData, setAvailableItemsData] = useState<any>([])
  const [availableItemsValue, setAvailableItemsValue] = useState()

  useEffect(() => {
    if (sku) {
      getAvailableItems({
        url: '/api/getAvailableItems',
        body: { skuId: sku },
        setAvailableItemsData,
      })
    }
  }, [sku])

  useEffect(() => {
    if (availableItemsData.length > 0) {
      const filteredValue = availableItemsData[0]?.items.filter(
        (item: any) => item.itemId === sku
      )

      setAvailableItemsValue(
        filteredValue[0]?.sellers[0]?.commertialOffer?.AvailableQuantity
      )
    }
  }, [availableItemsData, sku])

  return { availableItemsValue }
}
