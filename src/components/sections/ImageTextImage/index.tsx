import React from 'react'

import BlockDesktop from './BlockDesktop'
import BlockMobile from './BlockMobile'
import './styles.scss'

type ImageTextImageProps = {
  src1: string
  src2: string
  href: string
  alt: string
  title: string
  description: string
  buttonText?: string
  buttonTextColor?: string
  buttonBackground?: string
}

export type Props = {
  ImageTextImage: ImageTextImageProps[]
}
// eslint-disable-next-line
function ImageTextImage({ ImageTextImage }: Props) {
  return (
    <>
      <div className="block-mobile">
        <BlockMobile ImageTextImage={ImageTextImage} />
      </div>
      <div className="block-desktop">
        <BlockDesktop ImageTextImage={ImageTextImage} />
      </div>
    </>
  )
}

export default ImageTextImage
