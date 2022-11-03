export function cep(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 9
  let { value } = e.currentTarget

  value = value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2')
  e.currentTarget.value = value

  return e
}

export function date(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 10
  let { value } = e.currentTarget

  value = value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1')
  e.currentTarget.value = value

  return e
}

export function cpf(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 14
  let { value } = e.currentTarget

  value = value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
  e.currentTarget.value = value

  return e
}

export function tel(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 15
  let { value } = e.currentTarget

  value = value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2')
  e.currentTarget.value = value

  return e
}
