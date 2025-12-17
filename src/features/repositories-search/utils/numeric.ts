/**
 * This utility function formats a numeric value into a string with 'k' suffix for thousands.
 */
export const formatThousands = (value: number): string => {
  if (value >= 1000) {
    return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  }

  return value.toString()
}
