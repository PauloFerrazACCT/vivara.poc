/* eslint-disable no-console */
import React from 'react'
import type { ComponentType } from 'react'

import StaticBanner from './sections/StaticBanner'
import ShowcaseBanner from './sections/ShowcaseBanner'
import NavigationCategory from './sections/NavigationCategory'
import NavigationCollection from './sections/NavigationCollection'
import CollectionCarousel from './sections/CollectionCarousel'
import CollectionSlider from './sections/StyleGirls'
import NavigationButtons from './sections/NavigationButtons'
import NavigattionTabs from './sections/NavigattionTabs'
import Carousel from './sections/Carousel'
import ThemeNavigation from './sections/ThemeNavigation'
import InstitutionalTitleandSubtitle from './sections/InstitutionalTitleandSubtitle'
import VideoCollection from './sections/VideoCollection'
import RichText from './sections/RichText'
import RichTextLife from './sections/RichTextLife'
import ImageTextImage from './sections/ImageTextImage'
import ExpansibleText from './sections/ExpansibleText'
import ExpansibleQuestions from './sections/ExpansibleQuestions'
import VideoFullScreen from './sections/VideoFullScreen'
import FullwidthStaticBanner from './sections/FullwidthStaticBanner'
import FormAllIn from './sections/FormAllIn/FormAllIn'
import DoubleImageGallery from './sections/DoubleImageGallery'
import TripleImageGallery from './sections/TripleImageGallery'
import GenerateLiveloCookie from './sections/GenerateLiveloCookie'
import FiveImageGallery from './sections/FiveImageGallery'
import SpaceBetweenSections from './sections/SpaceBetweenSections'
import RichTextFeatured from './sections/RichTextFeatured'
import FullwidthCarousel from './sections/FullwidthCarousel'
import TextAnchor from './sections/TextAnchor'
import ReadMore from './sections/ReadMore/ReadMore'
import ThreeCards from './sections/ThreeCards'
import CollectionCarouselWithDescription from './sections/CollectionCarouselWithDescription'
import GridCollection from './sections/GridCollection'
import FullwidthNarrowBanner from './sections/FullwidthNarrowBanner'
import KitsCarousel from './sections/KitsCarousel'

/**
 * Sections: Components imported from '../components/sections' only.
 * Do not import or render components from any other folder in here.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const COMPONENTS: Record<string, ComponentType<any>> = {
  Carousel,
  StaticBanner,
  NavigationCollection,
  NavigationCategory,
  ShowcaseBanner,
  CollectionCarousel,
  CollectionSlider,
  NavigationButtons,
  NavigattionTabs,
  ThemeNavigation,
  InstitutionalTitleandSubtitle,
  VideoCollection,
  RichText,
  RichTextLife,
  ImageTextImage,
  ExpansibleText,
  ExpansibleQuestions,
  VideoFullScreen,
  FullwidthStaticBanner,
  FormAllIn,
  DoubleImageGallery,
  TripleImageGallery,
  GenerateLiveloCookie,
  FiveImageGallery,
  SpaceBetweenSections,
  RichTextFeatured,
  FullwidthCarousel,
  TextAnchor,
  ReadMore,
  ThreeCards,
  CollectionCarouselWithDescription,
  GridCollection,
  FullwidthNarrowBanner,
  KitsCarousel,
}

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sections?: Array<{ name: string; data: any }>
  fold: string
}

function RenderLPCMS({ sections, fold }: Props) {
  return (
    <>
      {sections?.map(({ name, data }, index) => {
        const Component = COMPONENTS[name]

        if (!Component) {
          console.error(`Could not find component for block ${name}. Add a new component
          for this block or remove it from the CMS`)

          return null
        }

        return fold === 'above'
          ? index <= 2 && <Component key={`cms-section-${index}`} {...data} />
          : index > 2 && <Component key={`cms-section-${index}`} {...data} />
      })}
    </>
  )
}

export default RenderLPCMS
