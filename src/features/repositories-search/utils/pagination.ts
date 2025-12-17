interface PartialPagination {
  first: number
  last: number
  next?: number
  prev?: number
}

/**
 * Generates pagination links from the GitHub API Link header.
 */
export const generatePagination = (
  linkHeader?: string | null
): PartialPagination => {
  const defaultPaginationLinks = {
    first: 1,
    last: 1,
    next: undefined,
    prev: undefined
  } satisfies PartialPagination

  if (!linkHeader) return defaultPaginationLinks

  linkHeader.split(',').forEach(link => {
    const [urlPart, relPart] = link.split(';').map(part => part.trim())

    const relMatch = relPart?.match(/rel="(.+?)"/)
    const pageMatch = urlPart?.match(/page=(\d+)/)

    if (!relMatch || !pageMatch) return

    const rel = relMatch[1]
    const page = Number(pageMatch[1])

    Object.assign(defaultPaginationLinks, {
      [rel]: page
    })
  })

  return defaultPaginationLinks
}
