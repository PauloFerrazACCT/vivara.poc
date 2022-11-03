import { useCallback } from 'react'
import { sendProductImpression } from 'src/hooks/useProductImpression'
import useWindowDimensions from 'src/hooks/useWindowDimensions'

export const useCheckSendProducts = (
  productsDataToEvent: any[] | undefined,
  pageSize: number,
  currencyCode: string,
  title: string
) => {
  const { width } = useWindowDimensions()
  const isMobile = width < 640
  const isTablet = width > 640 && width < 965
  const isNotebook = width > 965 && width < 1280
  const isDesktop = width > 1280

  const checkEventTrigger = useCallback(() => {
    if (!(productsDataToEvent?.length && title && currencyCode)) {
      return
    }

    const impression = {
      sendlastProduct(condition: boolean) {
        condition &&
          sendProductImpression(
            productsDataToEvent.slice(-1),
            0,
            pageSize,
            title,
            currencyCode
          )
      },
      send(condition: boolean) {
        condition &&
          sendProductImpression(
            productsDataToEvent,
            0,
            pageSize,
            title,
            currencyCode
          )
      },
    }

    impression.sendlastProduct(isMobile && productsDataToEvent.length > 1)
    impression.send(isMobile && productsDataToEvent.length === 1)

    impression.sendlastProduct(isTablet && productsDataToEvent.length > 2)
    impression.send(isTablet && productsDataToEvent.length === 2)

    impression.sendlastProduct(isNotebook && productsDataToEvent.length > 3)
    impression.send(isNotebook && productsDataToEvent.length === 3)

    impression.sendlastProduct(isDesktop && productsDataToEvent.length > 4)
    impression.send(isDesktop && productsDataToEvent.length === 4)
  }, [
    currencyCode,
    isDesktop,
    isMobile,
    isNotebook,
    isTablet,
    pageSize,
    productsDataToEvent,
    title,
  ])

  return { checkEventTrigger }
}
