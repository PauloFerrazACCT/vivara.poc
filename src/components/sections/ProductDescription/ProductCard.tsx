import React, { useRef, useMemo } from 'react'
import Slider from 'react-slick'
import sliderSettings from 'src/configs/slider-product-details'

const ProductCard = ({ res }: any) => {
  const sliderRef = useRef<any>(null)

  const card = useMemo(() => {
    if (res.length === 0) {
      return <p>Detalhes não disponíveis</p>
    }

    return res?.map((element: any) => {
      const title = element.nomematerial
        ? 'nomematerial'
        : element.nomepedra
        ? 'nomepedra'
        : 'Colecao'

      const description = element.descricaomaterial
        ? 'descricaomaterial'
        : element.descricaopedra
        ? 'descricaopedra'
        : 'descricaocolecao'

      return (
        <div className="detail" key={element?.id}>
          <h3 className="detail-title">{element[title]}</h3>
          <p className="detail-content">{element[description]}</p>
        </div>
      )
    })
  }, [res])

  return (
    <Slider ref={sliderRef} {...sliderSettings}>
      {card}
    </Slider>
  )
}

export default ProductCard
