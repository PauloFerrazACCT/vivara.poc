import React, { memo } from 'react'

import './product-benefits.scss'

function ProductBenefits() {
  return (
    <div className="ProductproductBenefits">
      <h2 className="ProductproductBenefits__title">Benefícios Vivara</h2>
      <ul className="ProductproductBenefits__list">
        <li className="ProductproductBenefits__listItem">
          Garantia de 12 meses;
        </li>
        <li className="ProductproductBenefits__listItem">
          Troca gratuita em 7 dias após o recebimento para itens promocionais e
          30 dias para os demais.
        </li>
      </ul>
    </div>
  )
}

export default memo(ProductBenefits)
