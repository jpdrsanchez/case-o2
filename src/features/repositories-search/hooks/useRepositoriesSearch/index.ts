import { useCallback, useEffect, useRef, useState } from 'react'
import type { SearchrRepositoryFiltersModel } from '../../models/search-repository-filters'
import type { SearchItemModel } from '../../models/search-item'
import { repositorySearchResource } from '../../api/resources'
import { searchItemMapper } from '../../mappers/search-item'
import type { PaginationModel } from '../../models/pagination'
import { debounce } from '../../utils/debounce'

/**
 * This hook manages the state and logic for searching repositories.
 * It handles filters, pagination, results retrieval, and error/loading states.
 *
 * @returns An object containing state and handler functions for repository search.
 */
export const useRepositoriesSearch = () => {
  const [filters, setFilters] = useState<SearchrRepositoryFiltersModel>({
    perPage: 5,
    query: ''
  })
  const [pagination, setPagination] = useState<PaginationModel>({
    current: 1,
    first: 1,
    last: 1,
    hasNext: false,
    hasPrev: false,
    next: undefined,
    prev: undefined
  })
  const [results, setResults] = useState<SearchItemModel[]>()
  const [selectedItem, setSelectedItem] = useState<SearchItemModel>()
  const [totalCount, setTotalCount] = useState<number>()
  const [loading, setLoading] = useState<boolean>()
  const [error, setError] = useState<boolean>()

  const handleGetResults = useCallback(
    async (request: SearchrRepositoryFiltersModel & { page: number }) => {
      try {
        setError(false)
        setLoading(true)

        const response = await repositorySearchResource({
          page: request.page,
          per_page: request.perPage,
          q: request.query
        })

        setResults(response.data.items.map(searchItemMapper.toModel))
        setTotalCount(response.data.total_count)
        setPagination(response.pagination)
      } catch (error) {
        console.error(error)
        setError(true)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const handleFilters = useCallback(
    (newFilters: Partial<SearchrRepositoryFiltersModel>) => {
      setFilters(prev => ({
        ...prev,
        ...newFilters
      }))
    },
    []
  )

  const handlePagination = useCallback(
    (newPagination: Partial<PaginationModel>) => {
      setPagination(prev => ({
        ...prev,
        ...newPagination
      }))
    },
    []
  )

  const handleClear = useCallback(() => {
    setFilters({
      query: '',
      perPage: 5
    })
    setPagination({
      current: 1,
      first: 1,
      last: 1,
      hasNext: false,
      hasPrev: false,
      next: undefined,
      prev: undefined
    })
    setResults([])
    setLoading(false)
    setError(false)
    setTotalCount(0)
  }, [])

  const { current } = pagination

  const debouncedSearch = useRef(debounce(handleGetResults, 500))

  useEffect(() => {
    if (filters.query.length > 0) {
      debouncedSearch.current({ ...filters, page: current })
    }
  }, [filters, current])

  return {
    handleGetResults,
    handleFilters,
    handlePagination,
    handleClear,
    setSelectedItem,
    selectedItem,
    pagination,
    filters,
    results,
    totalCount,
    loading,
    error
  }
}
