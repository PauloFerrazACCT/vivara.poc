import { Link } from 'gatsby'
import React from 'react'
import MyAccountUser from 'src/components/icons/MyAccountUser'

import storeConfig from '../../../../store.config'

import './styles.scss'

const WishlistMenu = () => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const logoutAccount = () => {
    const { account } = storeConfig

    const logoutUrl =
      account === 'lojavivara'
        ? 'https://secure.vivara.com.br/api/vtexid/pub/logout?scope=lojavivara&returnUrl=https://secure.vivara.com.br/'
        : 'https://secureqa.vivara.com.br/api/vtexid/pub/logout?scope=qavivara&returnUrl=https://secureqa.vivara.com.br/'

    window.location.href = logoutUrl
  }

  const listItems = [
    {
      name: 'Dados pessoais',
      path: 'profile',
    },
    {
      name: 'Endereços',
      path: 'addresses',
    },
    {
      name: 'Pedidos',
      path: 'orders',
    },
    {
      name: 'Cartões',
      path: 'cards',
    },
    {
      name: 'Autenticação',
      path: 'authentication',
    },
    {
      name: 'Histórico de Pedidos',
      path: 'order-history',
    },
    {
      name: 'Trocas e Devoluções',
      path: 'exchanges-and-returns',
    },
    {
      name: 'Garantias e Serviços',
      path: 'warranty-and-services',
    },
    {
      name: 'Minhas Medidas',
      path: 'my-measures',
    },
  ]

  return (
    <div className="wishlist-menu__container">
      <div className="wishlist-menu__greeting-container">
        <MyAccountUser />
        <p className="wishlist-menu__greeting">Olá!</p>
      </div>
      <div className="wishlist-menu__link-container">
        {listItems?.map((item, index) => (
          <Link
            to={`/account#/${item.path}`}
            key={index}
            className="wishlist-menu__link"
          >
            {item.name}
          </Link>
        ))}
        <Link to="/wishlist" className="wishlist-menu__link-wishlist">
          Meus Favoritos
        </Link>
        <Link to="/life-lovers" className="wishlist-menu__link">
          Life Lover
        </Link>
        <button onClick={logoutAccount} className="wishlist-menu__link">
          Sair
        </button>
      </div>
    </div>
  )
}

export default WishlistMenu
