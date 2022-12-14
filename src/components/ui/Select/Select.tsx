import React from 'react'
import { Select as UISelect } from '@faststore/ui'
import type { SelectProps } from '@faststore/ui'
import { CaretDown as CaretDownIcon } from 'phosphor-react'

import './select.scss'

interface UISelectProps extends SelectProps {
  /*
   * Redefines the id property to be required when using the Select component. The
   * id will be used to link the UISelect component and its label.
   */
  id: string
  /*
   * Defines the options available in the select. The SelectOptions object
   * keys are the property names, while the values correspond to the text that
   * will be displayed in the UI
   */
  options: Record<string, string>
  /*
   * Specifies the text that will be displayed in the label right next to the Select.
   * If omitted, the label will not be rendered.
   */
  labelText?: string
}

export default function Select({
  id,
  className,
  options,
  onChange,
  labelText,
  value,
  'aria-label': ariaLabel,
  testId,
}: UISelectProps) {
  return (
    <div data-select className={className}>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <UISelect
        data-testid={testId}
        onChange={onChange}
        aria-label={ariaLabel}
        id={id}
        value={value}
      >
        <option value="" disabled selected hidden>
          ORDENAR POR
        </option>

        {Object.keys(options)?.map((key) => (
          <option key={key} value={key}>
            {options[key]}
          </option>
        ))}
      </UISelect>
      <CaretDownIcon size={18} weight="bold" />
    </div>
  )
}
