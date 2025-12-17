import { createContext } from 'react'
import type { RepositorySearch } from './types'

/**
 * Context for managing repository search state and actions.
 */
export const RepositoriesSearchContext = createContext<RepositorySearch>({
  error: undefined,
  loading: undefined,
  totalCount: undefined,
  items: undefined,
  selectedItem: undefined,
  filters: {
    perPage: 10,
    query: ''
  },
  pagination: {
    current: 1,
    first: 1,
    last: 1,
    hasNext: false,
    hasPrev: false,
    next: undefined,
    prev: undefined
  },
  handleSelectItem: () => {},
  handleFilters: () => {},
  handlePagination: () => {},
  handleClear: () => {}
})
