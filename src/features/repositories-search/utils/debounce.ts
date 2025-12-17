export const debounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay: number
) => {
  let timeout: number

  return (...args: T) => {
    window.clearTimeout(timeout)
    timeout = window.setTimeout(() => {
      callback(...args)
    }, delay)
  }
}
