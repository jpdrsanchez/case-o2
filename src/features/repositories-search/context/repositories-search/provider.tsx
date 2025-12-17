import { useRepositoriesSearch } from '../../hooks/useRepositoriesSearch'
import { RepositoriesSearchContext } from './context'

export const RepositoriesSearchProvider = (props: React.PropsWithChildren) => {
  const repositoriesSearch = useRepositoriesSearch()

  return (
    <RepositoriesSearchContext.Provider
      value={{
        handleFilters: repositoriesSearch.handleFilters,
        handlePagination: repositoriesSearch.handlePagination,
        handleClear: repositoriesSearch.handleClear,
        handleSelectItem: repositoriesSearch.setSelectedItem,
        filters: repositoriesSearch.filters,
        pagination: repositoriesSearch.pagination,
        items: repositoriesSearch.results,
        totalCount: repositoriesSearch.totalCount,
        error: repositoriesSearch.error,
        loading: repositoriesSearch.loading,
        selectedItem: repositoriesSearch.selectedItem
      }}
    >
      {props.children}
    </RepositoriesSearchContext.Provider>
  )
}
