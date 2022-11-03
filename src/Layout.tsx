import React, {
  lazy,
  Suspense,
  useEffect,
  useState,
  createContext,
} from 'react'
import { useUI } from 'src/sdk/ui/Provider'
import type { ProductSummary_ProductFragment } from '@generated/graphql'
import { Skeleton } from '@faststore/ui'
import loadable from '@loadable/component'
import { Helmet } from 'react-helmet'

import Header from './components/common/Header'
import HeaderLife from './components/common/HeaderLife'
import TelemarketingBar from './components/common/TelemarketingBar/TelemarketingBar'
import type { CmsSection } from './components/common/Header/Header'
import './Layout.scss'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import WhatsApp from './components/common/GTMScript/WhatsApp'

const CartSidebar = lazy(() => import('src/components/cart/CartSidebar'))
const Footer = loadable(() => import('src/components/common/Footer/Footer'))
const Cookies = loadable(() => import('./components/modal/Cookies'))

interface Props {
  data: Product
  children?: React.ReactNode
  params?: any
  location?: any
  serverData?: any
}

type Product = {
  product: ProductSummary_ProductFragment
  cmsGlobalComponents?: Record<string, CmsSection[]>
}

type HeaderSizeContextProps = {
  headerSize: number | null
  setHeaderSize: (number: number | null) => void
  isTelemarketingBarVisible: boolean
  setIsTelemarketingBarVisible: (isTelemarketing: boolean) => void
}

export const HeaderSizeContext = createContext<HeaderSizeContextProps | null>(
  null
)

function Layout({
  children,
  data,
  params,
  location: { pathname },
  serverData,
}: Props) {
  const { cart: displayCart } = useUI()
  const [location, setLocation] = useState<any>(null)
  const [isLife, setIsLife] = useState(false)
  const [isTelemarketingBarVisible, setIsTelemarketingBarVisible] =
    useState(false)

  const [loadLife, setLoadLife] = useState(true)

  const [headerSize, setHeaderSize] = useState<number | null>(null)

  const hideAboveFooter = pathname?.includes('/nossas-lojas')

  useEffect(() => {
    setLocation(data)
  }, [data])

  const isPDP = !!data?.product
  const slug = params?.slug

  // Check brand, slug and path to switch between Life and Vivara headers
  useEffect(() => {
    if (
      pathname?.includes('/life') === true ||
      serverData?.product?.brand?.name === 'Life by Vivara' ||
      slug === 'life'
    ) {
      setIsLife(true)
    }

    setLoadLife(false)
  }, [serverData, slug, pathname])

  const checkLife = isLife ? (
    <HeaderLife
      location={location}
      isPDP={isPDP}
      content={data.cmsGlobalComponents}
    />
  ) : (
    <Header
      location={location}
      isPDP={isPDP}
      content={data.cmsGlobalComponents}
    />
  )

  const noScriptIframe = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WJ4J8X6"
  height="0" width="0" style="display:none;visibility:hidden"></iframe>`

  return (
    <>
      <Helmet>
        <script src="/apm-azure.js" async />
      </Helmet>
      <noscript dangerouslySetInnerHTML={{ __html: noScriptIframe }} />
      <HeaderSizeContext.Provider
        value={{
          headerSize,
          setHeaderSize,
          isTelemarketingBarVisible,
          setIsTelemarketingBarVisible,
        }}
      >
        <div className="layout-header-wrapper">
          <TelemarketingBar />
          {loadLife ? <Skeleton /> : checkLife}
        </div>
        <div id="layout">
          {!loadLife && <Cookies />}

          <main className="main-container">{children}</main>

          {!loadLife && <Footer hideAboveFooter={hideAboveFooter} />}

          {displayCart && (
            <Suspense fallback={null}>
              <CartSidebar />
            </Suspense>
          )}
        </div>
      </HeaderSizeContext.Provider>
      <WhatsApp categoryTree={[]} />
    </>
  )
}

export default Layout
