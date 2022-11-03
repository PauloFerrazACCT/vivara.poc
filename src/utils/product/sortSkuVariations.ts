import type { SkuFragmentFragment } from '@generated/graphql'

export const sortSkuVariations = (skuVariants: SkuFragmentFragment[]) => {
  return skuVariants.sort((a, b) => {
    return (
      parseInt(a.additionalProperty?.[0]?.value.replace(/\D/g, ''), 10) -
      parseInt(b.additionalProperty?.[0]?.value.replace(/\D/g, ''), 10)
    )
  })
}
