import React, { forwardRef } from 'react'
import {
  Icon as UIIcon,
  AccordionItem as UIAccordionItem,
  AccordionPanel as UIAccordionPanel,
  AccordionButton as UIAccordionButton,
} from '@faststore/ui'
import type { AccordionItemProps } from '@faststore/ui'
import {
  CaretUp as CaretUpIcon,
  CaretDown as CaretDownIcon,
} from 'phosphor-react'

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
   * Addicional labeel
   */
  addicionalLabel?: string
}

const AccordionItem = forwardRef<HTMLDivElement, Props>(function AccordionItem(
  {
    children,
    isExpanded,
    index = 0,
    buttonLabel = '',
    addicionalLabel,
    testId = 'store-accordion-item',
    ...otherProps
  },
  ref
) {
  return (
    <UIAccordionItem
      ref={ref}
      index={index}
      data-testid={`${testId}-item`}
      {...otherProps}
    >
      <UIAccordionButton
        className="title-subsection"
        data-testid={`${testId}-button`}
      >
        {buttonLabel}
        <div>
          {addicionalLabel && (
            <span className="addicional-label">{addicionalLabel}</span>
          )}

          <UIIcon
            data-testid={`${testId}-button-icon`}
            component={
              isExpanded ? (
                <CaretUpIcon size={18} />
              ) : (
                <CaretDownIcon size={18} />
              )
            }
          />
        </div>
      </UIAccordionButton>
      <UIAccordionPanel data-testid={`${testId}-panel`}>
        {children}
      </UIAccordionPanel>
    </UIAccordionItem>
  )
})

export default AccordionItem
