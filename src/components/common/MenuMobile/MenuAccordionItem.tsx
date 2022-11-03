import React, { forwardRef } from 'react'
import {
  Icon as UIIcon,
  AccordionItem as UIAccordionItem,
  AccordionPanel as UIAccordionPanel,
  AccordionButton as UIAccordionButton,
} from '@faststore/ui'
import type { AccordionItemProps } from '@faststore/ui'
import MenuPinkArrowDownIcon from 'src/components/icons/MenuPinkArrowDown'
import MenuPinkArrowUpIcon from 'src/components/icons/MenuPinkArrowUp'

interface Props extends AccordionItemProps<any> {
  /**
   * Attribute to check whether the item is expanded or not.
   */
  isExpanded: boolean
  /**
   * Label for Accordion button
   */
  buttonLabel?: string
  /**
   * Attribute to indicate if element is on firstLayer of the menu or not.
   */
  firstLayer?: boolean
  /**
   * Attribute to indicate if element has Life or Vivara styling.
   */
  isLifeMenu?: boolean
}

const AccordionItem = forwardRef<HTMLDivElement, Props>(function AccordionItem(
  {
    children,
    isExpanded,
    index,
    buttonLabel = '',
    firstLayer,
    isLifeMenu,
    testId = 'store-accordion-item',
    ...otherProps
  },
  ref
) {
  const itemStyle = firstLayer ? 'first-layer' : 'second-layer'
  const brandStyle = isLifeMenu ? 'life' : 'vivara'
  const arrowDirection = isExpanded ? (
    <MenuPinkArrowUpIcon itemStyle={itemStyle} />
  ) : (
    <MenuPinkArrowDownIcon itemStyle={itemStyle} />
  )

  return (
    <UIAccordionItem
      ref={ref}
      index={index}
      data-testid={`${testId}-item`}
      {...otherProps}
    >
      <UIAccordionButton
        className={`title-subsection__${itemStyle}-${brandStyle}`}
        data-testid={`${testId}-button`}
      >
        {buttonLabel}
        {buttonLabel !== 'Ver categorias' && (
          <UIIcon
            data-testid={`${testId}-button-icon`}
            component={arrowDirection}
          />
        )}
      </UIAccordionButton>
      <UIAccordionPanel data-testid={`${testId}-panel`}>
        {children}
      </UIAccordionPanel>
      <div className={`divider-${itemStyle}`} />
    </UIAccordionItem>
  )
})

export default AccordionItem
