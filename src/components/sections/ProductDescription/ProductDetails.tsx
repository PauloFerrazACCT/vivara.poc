/* eslint-disable react-hooks/exhaustive-deps */
import type { SetStateAction, Dispatch } from 'react'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import ProductCard from './ProductCard'

type IgetSpecification = {
  url: string
  body: Record<string, unknown>

  setNewResult: Dispatch<SetStateAction<any>>
}

const getSpecification = async ({
  url,
  body,
  setNewResult,
}: IgetSpecification) => {
  await axios
    .post(url, body, {
      headers: {
        Accept: 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then((response) => {
      setNewResult(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
}

const ProductDetails = ({ specification }: any) => {
  const filterSpecification = specification.filter(
    (el: any) =>
      el.name === 'Material' || el.name === 'Pedras' || el.name === 'Coleção'
  )

  const filterProductId = specification.filter((e: any) => e.name === 'Cód')
  const productId = filterProductId[0]?.value

  const [res, setRes] = useState<any>([])
  const [newResult, setNewResult] = useState([])

  useEffect(() => {
    setRes([])

    for (const { name, value } of filterSpecification) {
      switch (name) {
        case 'Material':
          getSpecification({
            url: '/api/productSpecification/getMaterial',
            body: { materialName: value },
            setNewResult,
          })

          break

        case 'Pedras':
          getSpecification({
            url: '/api/productSpecification/getJewelStone',
            body: { jewelStoneName: value },
            setNewResult,
          })

          break

        default:
          break
      }
    }
  }, [productId])

  useEffect(() => {
    res.length > 0 ? setRes([...res, ...newResult]) : setRes([...newResult])
  }, [newResult])

  return (
    <>
      <div className="detailTitle">
        <h2>DETALHES</h2>
      </div>
      <ProductCard res={res} />
    </>
  )
}

export default ProductDetails
