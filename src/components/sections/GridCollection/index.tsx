import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { Image } from 'src/components/ui/Image'
import { EventPromoClick } from 'src/components/common/EventPromoClick'
import './styles.scss'
import { PromoView } from 'src/components/common/PromoView'

type GridCollectionProps = {
  src: string
  href: string
  alt: string
  label: string
}
type Props = {
  banners: GridCollectionProps[]
  variant?: string
}
function GridCollection({ banners, variant }: Props) {
  const [style, setStyle] = useState('')
  const [altForEvent, setAltForEvent] = useState<string>('')
  const [mainTitle, setMainTitle] = useState<string>('')

  useEffect(() => {
    window.location.pathname === '/colecoes-life' && setStyle('life')
    // eslint-disable-next-line no-lone-blocks
    {
      window.location.pathname === '/colecoes-life'
        ? setMainTitle('Coleções Life')
        : setMainTitle('Coleções Vivara')
    }
  }, [])

  const gridClass = variant ? `grid-collection-${variant}` : 'grid-collection'

  const { AddPromoView } = PromoView({
    altForEvent,
    identifier: 'grid-collection-home',
  })

  return (
    <div className={`${gridClass}-container home-gridcollection`}>
      {
        <>
          <div className={`${gridClass}-description`}>
            <div className={`${gridClass}-title ${style}`}>
              <h2>{mainTitle}</h2>
            </div>
          </div>
          {AddPromoView()}
          <div className={`${gridClass}-items home-gridcollection-items`}>
            <div className={`${gridClass}-images home-gridcollection-images`}>
              {banners?.map((item, index) => (
                <Link
                  to={item.href}
                  aria-label={`link para a coleção ${item.alt}`}
                  key={item.alt}
                  className={`${gridClass}-link-area ${style}`}
                  onClick={() => {
                    EventPromoClick(item.alt, `GridCollection-Home`)
                  }}
                >
                  <Image
                    baseUrl={item.src}
                    alt={`${item.alt}${index}`}
                    aspectRatio={1}
                    layout="constrained"
                    backgroundColor="#F0F0F0"
                    loading="eager"
                    options={{
                      fitIn: true,
                    }}
                    setAltForEvent={setAltForEvent}
                  />
                  <h3>{item.label}</h3>
                </Link>
              ))}
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default GridCollection
