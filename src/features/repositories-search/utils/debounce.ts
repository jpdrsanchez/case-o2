/**
 * This utility function creates a debounced version of the provided callback function.
 * The debounced function delays the execution of the callback until after the specified delay
 * has elapsed since the last time it was invoked.
 */
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
