/**
 * Model related to pagination in repository search results.
 */
export interface PaginationModel {
  first: number
  last: number
  next?: number
  prev?: number
  hasNext: boolean
  hasPrev: boolean
  current: number
}
