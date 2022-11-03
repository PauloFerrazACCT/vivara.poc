import React from 'react'
import { Link } from 'gatsby'
import type { LifeLoverData, UserLifeLover } from 'src/pages/life-lovers'
import loadable from '@loadable/component'

import storeConfig from '../../../store.config'
import {
  BannerImg,
  BannerLoggedImg,
  LifeLoversImg,
  MiniBannerImg,
  MiniBannerImgMobile,
  HeartImg,
  CategoryPulseirasImg,
  CategoryPingentesImg,
  CategoryAneisImg,
  CategoryBrincosImg,
} from '../../images/life-lover'

const LifeLoverBenefits = loadable(() => import('./LifeLoverBenefits'))

type LifeLoverContentProps = {
  user: UserLifeLover
  lifeLoverData?: LifeLoverData
}

const HandleIsNotLifeLover = (user: UserLifeLover) => {
  return (
    <>
      {user === 'LOGGEDNOTLIFELOVER' && (
        <section className="grid-content text-banner">
          <LifeLoversImg />

          <h5 className="text-banner__title">
            PARECE QUE VOCÊ GOSTA MUITO DE <strong>LIFE BY VIVARA</strong>, MAS
            AINDA NÃO É UM APAIXONADO
          </h5>
          <h5 className="text-banner__subtitle">
            OS <strong>LIFE LOVERS</strong> SÃO VERDADEIROS LOUCOS POR LIFE!
          </h5>
          <p className="text-banner__description">
            Mas não se preocupe, você também pode se tornar um deles. Siga
            colecionando cada vez mais momentos com a gente que, em breve, você
            pode receber um convite.
          </p>
          <Link to="/#" className="text-banner__btn">
            VER REGULAMENTO
          </Link>
        </section>
      )}

      {user === 'LOGGEDNOTLIFELOVER' && (
        <>
          <div className="grid-content mini-banner">
            <MiniBannerImg />
          </div>
          <div className="grid-content mini-banner--mobile">
            <MiniBannerImgMobile />
          </div>
        </>
      )}
    </>
  )
}

const HandleIsNotLogged = (user: UserLifeLover) => {
  return (
    <>
      {(user === 'NOTLOGGED' || user === 'LOGGEDISLIFELOVER') && (
        <section className="grid-content banner">
          <div className="banner__left">
            {user === 'NOTLOGGED' ? <BannerImg /> : <BannerLoggedImg />}
          </div>
          <div className="banner__right">
            {user === 'NOTLOGGED' ? (
              <>
                <LifeLoversImg />
                <h2 className="banner__title">UM CLUBE ESPECIAL</h2>
                <h2 className="banner__title--strong">SÓ PARA VOCÊ</h2>
                <p className="banner__paragraph">
                  <strong>Life Lovers</strong> é um programa de relacionamento
                  gratuito e apenas para convidados. Nele, os membros têm acesso
                  a novidades, vantagens e benefícios exclusivos qua apenas
                  apaixonados por <strong>Life by Vivara</strong> podem ter.
                </p>
              </>
            ) : (
              <>
                <h2 className="banner__title">
                  #EUSOU<strong>LIFELOVER</strong>
                </h2>
                <h2 className="banner__title space">
                  DESTAQUE<strong> DA SEMANA</strong>
                </h2>
                <h4>COLEÇÃO TEEN</h4>
                <p className="banner__paragraph">
                  Pedras naturais para colorir o look e florescer a sua <br />
                  identidade em um sim para a vida
                </p>
              </>
            )}

            {user === 'NOTLOGGED' ? (
              <>
                <Link
                  to={`${storeConfig.secureSubdomain}/login?returnUrl=%2Faccount%23%2Flife-lover`}
                  className="banner__btn--dark"
                >
                  QUERO SER UM LIFE LOVER
                </Link>
                <Link
                  to={`${storeConfig.secureSubdomain}/login?returnUrl=%2Faccount%23%2Flife-lover`}
                  className="banner__btn"
                >
                  JÁ SOU LIFE LOVER
                </Link>
              </>
            ) : (
              <Link to="/#" className="banner__btn--dark">
                VER COLEÇÃO COMPLETA
              </Link>
            )}
          </div>
        </section>
      )}

      {user === 'NOTLOGGED' && (
        <section className="grid-content how-it-works">
          <h2 className="how-it-works__title">COMO FUNCIONA O CLUBE?</h2>
          <div className="how-it-works__content">
            <div className="how-it-works__item">
              <HeartImg />
              <p>
                O Clube Life Lovers é<strong> exclusico para convidados</strong>{' '}
                que são apaixonados por <strong>Life by Vivara</strong>
              </p>
            </div>
            <div className="how-it-works__item">
              <HeartImg />
              <p>
                Quanto mais você coleciona seus
                <strong> momentos com Life by Vivara, </strong>
                mais chances tem de ser convidado
              </p>
            </div>
            <div className="how-it-works__item">
              <HeartImg />
              <p>
                Ao ser convidado, você se torna
                <strong> membro do clube </strong> mais queridinho do momento e
                passa a ter <strong> benefícios exclusivos</strong>
              </p>
            </div>
          </div>
        </section>
      )}

      {user !== 'NOTLOGGED' && (
        <section className="grid-content category-navigation">
          <h2 className="category-navigation__title">
            Seleção especial para você <strong>Life Lover</strong>
          </h2>
          <p className="category-navigation__subtitle">
            Escolha joias e acessórios com o seu estilo
          </p>

          <div className="category-navigation__content">
            <Link
              to="/vivara/joias/pulseiras"
              aria-label="link para a categoria pulseiras"
              className="category-navigation__link"
            >
              <CategoryPulseirasImg />
              <span>Pulseiras</span>
            </Link>
            <Link
              to="/vivara/joias/pingentes"
              aria-label="link para a categoria pingentes"
              className="category-navigation__link"
            >
              <CategoryPingentesImg />
              <span>Pingentes</span>
            </Link>
            <Link
              to="/vivara/joias/aneis"
              aria-label="link para a categoria aneis"
              className="category-navigation__link"
            >
              <CategoryAneisImg />
              <span>Anéis</span>
            </Link>
            <Link
              to="/vivara/joias/brincos"
              aria-label="link para a categoria brincos"
              className="category-navigation__link"
            >
              <CategoryBrincosImg />
              <span>Brincos</span>
            </Link>
          </div>
        </section>
      )}
    </>
  )
}

const LifeLoverContent = ({ user, lifeLoverData }: LifeLoverContentProps) => {
  return (
    <>
      {user === 'LOGGEDISLIFELOVER' && (
        <div className="top-banner__bg">
          <section className="grid-content top-banner">
            <div className="top-banner__item">
              <LifeLoversImg />
            </div>
            <div className="top-banner__item">
              <div />
              <div>
                <h5 className="top-banner__title">
                  <strong> HELLO,</strong> {lifeLoverData?.[0].firstName}{' '}
                  {lifeLoverData?.[0].lastName}
                </h5>
              </div>
            </div>
          </section>
        </div>
      )}

      {HandleIsNotLifeLover(user)}
      {HandleIsNotLogged(user)}

      <LifeLoverBenefits />

      {user === 'NOTLOGGED' && (
        <>
          <div className="grid-content mini-banner">
            <MiniBannerImg />
          </div>
          <div className="grid-content mini-banner--mobile">
            <MiniBannerImgMobile />
          </div>
        </>
      )}
    </>
  )
}

export default LifeLoverContent
