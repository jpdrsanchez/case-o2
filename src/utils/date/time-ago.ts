import { DateTime } from 'luxon'

export const timeAgo = (isoDateString: string): string => {
  const date = DateTime.fromISO(isoDateString)

  return date.toRelative({ locale: 'pt-BR' }) || ''
}

export const longDate = (isoDateString: string): string => {
  const date = DateTime.fromISO(isoDateString)

  return date.toFormat("dd 'de' LLLL 'de' yyyy")
}
