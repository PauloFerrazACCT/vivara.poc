import React from 'react'
import FacebookLife from 'src/components/icons/Footer/vivara-life/FacebookLife'
import InstagramLife from 'src/components/icons/Footer/vivara-life/InstagramLife'
import PinterestLife from 'src/components/icons/Footer/vivara-life/PinterestLife'
import YoutubeLife from 'src/components/icons/Footer/vivara-life/YoutubeLife'
import FacebookVivara from 'src/components/icons/Footer/vivara/FacebookVivara'
import InstagramVivara from 'src/components/icons/Footer/vivara/InstagramVivara'
import LinkedinVivara from 'src/components/icons/Footer/vivara/LinkedinVivara'
import TikTokVivara from 'src/components/icons/Footer/vivara/TikTokVivara'
import YoutubeVivara from 'src/components/icons/Footer/vivara/YoutubeVivara'
import { List as UIList, Icon as UIIcon, Link } from '@faststore/ui'
import TiktokLife from 'src/components/icons/Footer/vivara-life/TikTokLife'
import PinterestVivara from 'src/components/icons/Footer/vivara/PinterestVivara'

const vivara = [
  {
    href: 'https://pt-br.facebook.com/Vivara/',
    title: 'Facebook',
    target: '_blank',
    rel: 'noopener noreferrer',
    Icon: <FacebookVivara />,
  },
  {
    href: 'https://www.instagram.com/vivaraonline/?hl=pt-br ',
    title: 'Instagram',
    target: '_blank',
    rel: 'noopener noreferrer',
    Icon: <InstagramVivara />,
  },
  {
    href: 'https://br.pinterest.com/VivaraOnline/',
    title: 'Pinterest',
    target: '_blank',
    rel: 'noopener noreferrer',
    Icon: <PinterestVivara />,
  },
  {
    href: 'https://www.tiktok.com/discover/Vivara',
    title: 'TikTok',
    target: '_blank',
    rel: 'noopener noreferrer',
    Icon: <TikTokVivara />,
  },
  {
    href: 'https://www.linkedin.com/company/vivara/',
    title: 'Linkedin',
    target: '_blank',
    rel: 'noopener noreferrer',
    Icon: <LinkedinVivara />,
  },
  {
    href: 'https://www.youtube.com/user/onlinevivara',
    title: 'Youtube',
    target: '_blank',
    rel: 'noopener noreferrer',
    Icon: <YoutubeVivara />,
  },
]

const vivaraLife = [
  {
    href: 'https://www.facebook.com/lifebyvivaraonline/',
    title: 'Facebook',
    target: '_blank',
    rel: 'noopener noreferrer',
    Icon: <FacebookLife />,
  },
  {
    href: 'https://www.instagram.com/lifebyvivara/',
    title: 'Instagram',
    target: '_blank',
    rel: 'noopener noreferrer',
    Icon: <InstagramLife />,
  },
  {
    href: 'https://br.pinterest.com/LifebyVivara/',
    title: 'Pinterest',
    target: '_blank',
    rel: 'noopener noreferrer',
    Icon: <PinterestLife />,
  },
  {
    href: 'https://www.tiktok.com/@life_byvivara',
    title: 'TikTok',
    target: '_blank',
    rel: 'noopener noreferrer',
    Icon: <TiktokLife />,
  },
  {
    href: 'https://www.youtube.com/user/onlinevivara',
    title: 'Youtube',
    target: '_blank',
    rel: 'noopener noreferrer',
    Icon: <YoutubeLife />,
  },
]

const mapLinks = (
  array: Array<{
    href: string
    title: string
    target: string
    rel: string
    Icon: JSX.Element
  }>
) =>
  array.map((list, index) => {
    const { Icon } = list

    return (
      <li className="social-container-li" key={index}>
        <Link
          href={list.href}
          title={list.title}
          target={list.target}
          rel={list.rel}
        >
          <UIIcon component={Icon} />
        </Link>
      </li>
    )
  })

export const SocialNetworkList = () => {
  return (
    <>
      <UIList className="social-container">
        <li className="first vivara">
          <p>VIVARA</p>
        </li>
        {mapLinks(vivara)}
      </UIList>
      <UIList className="social-container">
        <li className="first loja-vivara">
          <p>Life By Vivara</p>
        </li>
        {mapLinks(vivaraLife)}
      </UIList>
    </>
  )
}
