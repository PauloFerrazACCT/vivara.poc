export default function useReleaseDate(
  productReleaseDate: string | undefined,
  months: number
): boolean {
  const releaseDate = Number(productReleaseDate)

  const currentDate = Date.now()

  const thirtyDaysInMilliseconds = 2592000000

  return currentDate - releaseDate <= months * thirtyDaysInMilliseconds
}
