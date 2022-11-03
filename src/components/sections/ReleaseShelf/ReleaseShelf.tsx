import React, { useRef } from 'react'
import Button from 'src/components/ui/VivaraButton'
import Slider from 'react-slick'
import ProductCard from 'src/components/product/ProductCard'
import sliderSettings from 'src/configs/slider-home-shelf'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import {
  ArrowRightIcon,
  ArrowLeftIcon,
} from 'src/images/svg/components/ArrowIcons'
import './styles.scss'
import { Link } from 'gatsby'

interface Props {
  products: ProductSummary_ProductFragment[]
}

function ReleaseShelf({ products }: Props) {
  const sliderRef = useRef<any>(null)

  if (sliderSettings.slidesToShow > products.length) {
    sliderSettings.slidesToShow = products.length
  }

  return (
    <section className="release-shelf">
      <h2 className="release-shelf__title">Lançamentos</h2>
      <p className="release-shelf__subtitle">
        Descubra a próxima peça Vivara para adicionar a sua coleção
      </p>
      <div className="release-shelf__slider">
        <Slider ref={sliderRef} {...sliderSettings}>
          {products?.map((product, idx) => (
            <ProductCard product={product} index={idx} key={idx} />
          ))}
        </Slider>
        <button
          aria-label="Seta para esquerda"
          className="release-shelf__arrow-left"
          onClick={() => sliderRef.current.slickPrev()}
        >
          <ArrowLeftIcon />
        </button>
        <button
          aria-label="Seta para direita"
          className="release-shelf__arrow-right"
          onClick={() => sliderRef.current.slickNext()}
        >
          <ArrowRightIcon />
        </button>
      </div>
      <Link to="/colecao/lancamentos">
        <Button variant="outlined">ver todos os lançamentos</Button>
      </Link>
    </section>
  )
}

export default ReleaseShelf
