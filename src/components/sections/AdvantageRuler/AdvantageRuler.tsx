import React from 'react'
import { List } from '@faststore/ui'
import IconStore from 'src/components/icons/Store'
import IconTruck from 'src/components/icons/Truck'
import IconAward from 'src/components/icons/Award'
import IconTroca from 'src/components/icons/Troca'
import './advantageRuler.scss'
import { Link } from 'gatsby'

function AdvantageRuler() {
  return (
    <>
      <h2 className="ruler-title">A Experiência Vivara</h2>
      <div className="advantage-container">
        <p className="ruler-subtitle">Conheça nossas vantagens</p>
        <div className="ruler-description-border" />
        <div className="advantage-list">
          <List variant="unordered">
            <li>
              <div data-store-incentive="true" data-testid="store-incentive">
                <Link to="/estamos-com-voce">
                  <IconStore />
                  <div data-incentive-content="true">
                    <h3>Personal shopper</h3>
                    <p>
                      Nosso time de vendedores estão aqui para tirar as suas
                      dúvidas
                    </p>
                  </div>
                </Link>
              </div>
            </li>
            <li>
              <div data-store-incentive="true" data-testid="store-incentive">
                <Link to="/tipos-de-entrega">
                  <IconTruck />
                  <div data-incentive-content="true">
                    <h3>rapidez na entrega</h3>
                    <p>
                      Várias opções de frete para sua joia chegar o quanto antes
                    </p>
                  </div>
                </Link>
              </div>
            </li>
            <li>
              <div data-store-incentive="true" data-testid="store-incentive">
                <Link to="/institucional/politica-garantia">
                  <IconAward />
                  <div data-incentive-content="true">
                    <h3>Garantia digital</h3>
                    <p>Suas garantias em um só lugar</p>
                  </div>
                </Link>
              </div>
            </li>
            <li>
              <div data-store-incentive="true" data-testid="store-incentive">
                <Link to="/institucional/politica-troca">
                  <IconTroca />
                  <div data-incentive-content="true">
                    <h3>Troca fácil</h3>
                    <p>Troque seus produtos sem sair de casa</p>
                  </div>
                </Link>
              </div>
            </li>
          </List>
        </div>
      </div>
    </>
  )
}

export default AdvantageRuler
