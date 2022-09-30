
/**
 * Formats a number according to complex rules.
 * 
 * The idea is to remove useless information, while following charMax rule.
 */
export const formatNumber = (x: number, {
  charMax = 5,
  decimals = 3,
} = {}) => {
  const sign = x < 0 ? '-' : ''
  let str = x.toFixed(decimals)
  // If negative keep the sign apart and reduce the string.
  if (x < 0) {
    str = str.substring(1)
    charMax--
  }
  let [int, frac] = str.split('.')
  if (int.length > charMax - 1) {
    return x.toPrecision(charMax - 3)
  }
  if (str.length > charMax) {
    const n = str.length - charMax - 1
    if (n > 0) {
      frac = frac.slice(0, -n)
    }
    return (
      frac.length > 0
        ? sign + int + '.' + frac
        : sign + int
    )
  }
  return sign + str
}
