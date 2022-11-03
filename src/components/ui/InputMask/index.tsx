import type { FC, InputHTMLAttributes } from 'react'
import React, { useCallback } from 'react'

import { cep, date, tel, cpf } from './masks'

type MaskTypes = 'cep' | 'date' | 'tel' | 'cpf'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask: MaskTypes
}

const InputMask: FC<InputProps> = ({ mask, ...props }) => {
  const handleOnInput = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    switch (mask) {
      case 'cep': {
        cep(e)
        break
      }

      case 'date': {
        date(e)
        break
      }

      case 'tel': {
        tel(e)
        break
      }

      case 'cpf': {
        cpf(e)
        break
      }

      default: {
        break
      }
    }
  }, [])

  return <input onInput={handleOnInput} {...props} />
}

export default InputMask
