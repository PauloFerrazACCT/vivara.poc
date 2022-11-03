import React, { useEffect, useState } from 'react'

type Props = {
  heightMobile: string
  heightDesktop: string
}

function SpaceBetweenSections({ heightMobile, heightDesktop }: Props) {
  const [isMobile, setIsMobile] = useState<boolean>()

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', () =>
      setIsMobile(window.innerWidth < 1024)
    )
  }, [])

  return (
    <>
      {isMobile ? (
        <div style={{ height: `${heightMobile}px` }} />
      ) : (
        <div style={{ height: `${heightDesktop}px` }} />
      )}
    </>
  )
}

export default SpaceBetweenSections
