import { Button, RadioGroup, RadioOption } from '@faststore/ui'
import type {
  BrowserProductQueryQuery,
  SkuFragmentFragment,
} from '@generated/graphql'
import loadable from '@loadable/component'
import type { FC } from 'react'
import React, { useState } from 'react'
import SelectArrowIcon from 'src/components/icons/SelectArrow'
import { Image } from 'src/components/ui/Image'
import {
  useSelectedSKU,
  useSkuContext,
} from 'src/contexts/ProductContext/useProductContext'
import useProductCategory from 'src/sdk/product/useProductCategory'
import { sortSkuVariations } from 'src/utils/product/sortSkuVariations'

import storeConfig from '../../../../store.config'

import './sku-selector.scss'

const BaseModal = loadable(() => import('../BaseModal'))

export interface SkuSelectorProps {
  /**
   * Default SKU option.
   */
  defaultSku: string
  variants: SkuFragmentFragment[]
  categoryTree: Array<{
    item: string
    name: string
    position: number
  }>
  product: BrowserProductQueryQuery['product']
}

const SkuSelector: FC<SkuSelectorProps> = ({
  categoryTree,
  variants,
  defaultSku,
  product,
}) => {
  const [isSkuSelectorModalOpen, setIsSkuSelectorModalOpen] = useState(false)
  const [radioSelectedSku, setRadioSelectedSku] = useState<string>(defaultSku)
  const { setSelectedSKU } = useSkuContext()
  const selectedSKU = useSelectedSKU(product)

  const { account } = storeConfig

  const { imgTypeOptions, imgUrl, measureTitle, measureType } =
    useProductCategory({
      categoryTree,
    })

  const changeClassName =
    imgUrl === '' ? 'sku-selector-modal-no-gif' : 'sku-selector-modal'

  const imgOptions = {
    ...imgTypeOptions,
    aspectRatio: 1,
    layout: 'fixed' as const,
    backgroundColor: '#f0f0f0',
  }

  const handleCloseModal = () => {
    const sku = variants.findIndex(
      (variant) => variant.sku === radioSelectedSku
    )

    if (sku > -1) {
      setSelectedSKU(sku)
      setIsSkuSelectorModalOpen(false)
    }
  }

  const SelectAndClose = (e: string) => {
    const sku = variants.findIndex((variant) => variant.sku === e)

    if (sku > -1) {
      setSelectedSKU(sku)
      setIsSkuSelectorModalOpen(false)
    }
  }

  return (
    <>
      <span className="sku-measures-span">Tamanho</span>
      <Button
        className="sku-selector-open-button"
        onClick={() => {
          setIsSkuSelectorModalOpen(true)
        }}
      >
        {selectedSKU?.sku
          ? selectedSKU?.additionalProperty?.[0]?.value
          : measureType}
        <SelectArrowIcon />
      </Button>
      <BaseModal
        isOpen={isSkuSelectorModalOpen}
        onCloseButtonClick={handleCloseModal}
        className={changeClassName}
      >
        {imgUrl !== '' && (
          <div className="sku-selector-modal__section_measures">
            <span className="sku-selector-modal__title">
              Descubra seu tamanho
            </span>
            <Image
              alt="teste"
              baseUrl={`http://${account}.vtexassets.com/arquivos/${imgUrl}`}
              {...imgOptions}
            />
          </div>
        )}
        <div className="sku-selector-modal__section_selector">
          <span className="sku-selector-modal__title">{measureTitle}</span>

          <div className="radio-group">
            <RadioGroup
              name="sku-radio-group"
              selectedValue={radioSelectedSku}
              onChange={(v) => {
                setRadioSelectedSku(v?.currentTarget?.value)
                SelectAndClose(v.currentTarget.value)
              }}
            >
              {sortSkuVariations(variants)?.map((variant) => {
                const skuAvailability =
                  variant.offers.offers.length > 0
                    ? variant?.offers?.offers[0]?.availability
                    : 'https://schema.org/InStock'

                const isNotAvailable =
                  skuAvailability !== 'https://schema.org/InStock'

                return (
                  <RadioOption
                    label={variant?.additionalProperty?.[0]?.value}
                    value={variant?.sku}
                    key={variant?.sku}
                    data-store-radio-disabled={isNotAvailable}
                    disabled={isNotAvailable}
                  >
                    <span data-store-radio-disabled={isNotAvailable}>
                      {variant?.additionalProperty?.[0]?.value}
                    </span>
                  </RadioOption>
                )
              })}
            </RadioGroup>
          </div>
        </div>
      </BaseModal>
    </>
  )
}

export default SkuSelector
