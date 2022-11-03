import { usePagination, useSearch } from '@faststore/sdk'
import { GatsbySeo } from 'gatsby-plugin-next-seo'
import NavigationCategory from 'src/components/sections/NavigationCategory'
import { Funnel as FilterIcon } from 'phosphor-react'
import React, { useContext, useEffect, useState } from 'react'
import Filter from 'src/components/search/Filter'
import Sort from 'src/components/search/Sort'
import Button from 'src/components/ui/Button'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { Skeleton } from '@acctglobal/skeleton'
import { HeaderSizeContext } from 'src/Layout'
import useScrollPosition from 'src/hooks/useScrollPosition'
import loadable from '@loadable/component'

import { useOrderedFacets } from './useOrderedFacets'
import { useTotalCount } from './useTotalCount'
import { useGalleryQuery } from './useGalleryQuery'
import GalleryPage from './ProductGalleryPage'
import './product-gallery.scss'
import LayoutGridList from './LayoutGridList'

const LinkButton = loadable(() => import('src/components/ui/Button/LinkButton'))

interface Props {
  title: string
  cmsHome?: any
  term: string | null
  base: string
}

interface AnchorOffset {
  top: number
}

const ADJUST_OFFSET = 20

function ProductGallery({ title, term, base, cmsHome }: Props) {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)
  const [anchorOffset, setAnchorOffset] = useState<AnchorOffset>()
  const [stickyClass, setStickyClass] = useState('')
  const scrollPosition = useScrollPosition()
  const headerSizeContext = useContext(HeaderSizeContext)
  const { pages, state: searchState, addNextPage, addPrevPage } = useSearch()
  const { data, isValidating } = useGalleryQuery()
  const totalCount = useTotalCount(data)
  const orderedFacets = useOrderedFacets(data)
  const { next, prev } = usePagination(totalCount)
  const { width } = useWindowDimensions()
  const [layout, setLayout] = useState('grid')
  const isLayoutList = layout === 'list'
  const handleChangeLayout = (value: string) => {
    setLayout(value)
  }

  const isSearchPage = title === 'Search Results'

  const idToTop = 'scroll-to-top'

  function scrollToTop(id: string) {
    if (id && id !== '') {
      const elToScroll = document.getElementById(id)

      if (elToScroll) {
        window.scroll({ top: 0 })
        let sizeTop = 150

        const headerHeight = document
          .querySelector('.header-content-wrapper')
          ?.getBoundingClientRect().height

        const topBarHeight = document
          .querySelector('.topbar-wrapper-vivara')
          ?.getBoundingClientRect().height

        if (headerHeight && topBarHeight) {
          sizeTop = headerHeight + topBarHeight
        }

        const y = elToScroll?.getBoundingClientRect().top

        setTimeout(() => {
          window.scrollTo({ top: y - sizeTop, behavior: 'smooth' })
        }, 1000)
      }
    }
  }

  useEffect(() => {
    if (headerSizeContext?.headerSize && !anchorOffset) {
      setAnchorOffset({ top: -(headerSizeContext.headerSize + ADJUST_OFFSET) })
    }

    const isBrand =
      !!base.split('/')?.[3] && base.split('/')?.[2] === 'relogios'

    if (isBrand) {
      idToTop && scrollToTop(idToTop)
    }
  }, [anchorOffset, base, headerSizeContext])

  const stickyFilter = () => {
    scrollPosition > 25 ? setStickyClass('-sticky-filter') : setStickyClass('')
  }

  useEffect(() => {
    window.addEventListener('scroll', stickyFilter)

    return () => {
      window.removeEventListener('scroll', stickyFilter)
    }
  })

  return (
    <div className="product-listing / grid-content-full">
      {!isValidating && orderedFacets?.length === 0 ? (
        <>
          <div
            id={`${idToTop ?? idToTop}`}
            className="product-listing__content-grid / grid-content"
          >
            <div className={`product-listing__filters${stickyClass}`}>
              <Filter
                isOpen={isFilterOpen}
                setIsOpen={setIsFilterOpen}
                facets={orderedFacets}
                onDismiss={() => setIsFilterOpen(false)}
                term={term}
                base={base}
              />
            </div>
            <div className="product-listing__wrapper">
              <div className="product-listing__sort">
                <Button
                  variant="tertiary"
                  data-testid="open-filter-button"
                  icon={<FilterIcon size={25} />}
                  iconPosition="left"
                  aria-label="Abrir filtros"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  FILTRAR
                </Button>
              </div>
            </div>

            <div className="blank-container">
              <h1> Infelizmente não encontramos resultados para a sua busca</h1>
              <div className="intruction-container">
                <h3>Ao realizar nova busca, você pode: </h3>
                <ul className="blank-list">
                  <li>verificar a ortografia da palavra</li>
                  <li>usar apenas uma palavra</li>
                  <li>buscar por termos genéricos</li>
                  <li>tentar o uso de sinônimos</li>
                </ul>
              </div>
              {cmsHome ? (
                <section className="page__section">
                  <NavigationCategory
                    title="OU SE PREFERIR, VOCÊ PODE NAVEGAR PELAS NOSSAS CATEGORIAS"
                    variant="search"
                    subtitle={null}
                    {...cmsHome?.sections?.[1].data}
                  />
                </section>
              ) : null}
            </div>
          </div>
        </>
      ) : (
        <div
          id={`${idToTop ?? idToTop}`}
          className="product-listing__content-grid / grid-content"
        >
          <div
            id="productgrid"
            className="product-grid-anchor"
            style={anchorOffset}
          />
          <div className={`product-listing__filters${stickyClass}`}>
            <Filter
              isOpen={isFilterOpen}
              setIsOpen={setIsFilterOpen}
              facets={orderedFacets}
              onDismiss={() => setIsFilterOpen(false)}
              term={term}
              base={base}
            />
          </div>

          <div className="product-listing__wrapper">
            <div className="product-listing__sort">
              <Button
                variant="tertiary"
                data-testid="open-filter-button"
                icon={<FilterIcon size={25} />}
                iconPosition="left"
                aria-label="Abrir filtros"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                FILTRAR
              </Button>
              <Sort />
            </div>

            <div
              className="product-listing__results-count"
              data-count={totalCount}
            >
              <LayoutGridList
                layout={layout}
                handleChangeLayout={handleChangeLayout}
              />

              {isSearchPage ? (
                totalCount !== 0 ? (
                  <h2
                    data-testid="total-product-count"
                    className="total-product-count"
                  >
                    ENCONTRAMOS <strong>{totalCount} RESULTADOS</strong> PARA
                    SUA BUSCA
                  </h2>
                ) : (
                  <Skeleton width={325} height={16} backgroundColor="#F4F4F4" />
                )
              ) : totalCount !== 0 ? (
                <h2
                  data-testid="total-product-count"
                  className="total-product-count"
                >
                  <strong>{totalCount} Produtos</strong>
                </h2>
              ) : (
                <Skeleton width={90} height={16} backgroundColor="#F4F4F4" />
              )}
            </div>
          </div>

          <div className="product-listing__results">
            {/* Add link to prev page. This helps on SEO */}
            {prev !== false && (
              <div className="product-listing__pagination product-listing__pagination--top">
                <GatsbySeo linkTags={[{ rel: 'prev', href: prev.link }]} />
                <LinkButton
                  className="previous-items"
                  data-testid="show-previous"
                  onClick={(e) => {
                    e.currentTarget.blur()
                    e.preventDefault()
                    addPrevPage()
                  }}
                  to={prev.link}
                  rel="prev"
                  variant="tertiary"
                >
                  CARREGAR PRODUTOS ANTERIORES
                </LinkButton>
              </div>
            )}
            {/* Render ALL products */}
            {data ? (
              <>
                {pages?.map((page) => (
                  <GalleryPage
                    key={`gallery-page-${page}`}
                    showSponsoredProducts={false}
                    fallbackData={page === searchState.page ? data : undefined}
                    page={page}
                    title={title}
                    layoutGridOrList={isLayoutList}
                    setIsButtonLoading={setIsButtonLoading}
                  />
                ))}
              </>
            ) : (
              <Skeleton
                table={
                  width
                    ? width < 768
                      ? { rows: 2, columns: 2 }
                      : { rows: 2, columns: 4 }
                    : undefined
                }
                width={1224}
                height={400}
                backgroundColor="#F4F4F4"
              />
            )}

            {/* Prefetch Previous and Next pages */}
            {prev !== false && (
              <GalleryPage
                showSponsoredProducts={false}
                page={prev.cursor}
                display={false}
                title={title}
                layoutGridOrList={isLayoutList}
              />
            )}
            {next !== false && (
              <GalleryPage
                showSponsoredProducts={false}
                page={next.cursor}
                display={false}
                title={title}
                layoutGridOrList={isLayoutList}
              />
            )}

            {/* Add link to next page. This helps on SEO */}
            {next !== false && (
              <div className="product-listing__pagination product-listing__pagination--bottom">
                <GatsbySeo linkTags={[{ rel: 'next', href: next.link }]} />
                <LinkButton
                  className="more-items"
                  data-testid="show-more"
                  onClick={(e) => {
                    e.currentTarget.blur()
                    e.preventDefault()
                    setIsButtonLoading(true)
                    addNextPage()
                  }}
                  to={next.link}
                  rel="next"
                  variant="secondary"
                >
                  {isButtonLoading ? 'CARREGANDO...' : 'CARREGAR MAIS PRODUTOS'}
                </LinkButton>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductGallery
