import type { PaginationModel } from '../../models/pagination'
import type { SearchItemModel } from '../../models/search-item'
import type { SearchrRepositoryFiltersModel } from '../../models/search-repository-filters'

export interface RepositorySearch {
  filters: SearchrRepositoryFiltersModel
  pagination: PaginationModel
  loading?: boolean
  error?: boolean
  totalCount?: number
  items?: SearchItemModel[]
  selectedItem?: SearchItemModel
  handleSelectItem: (item: SearchItemModel) => void
  handleFilters: (filters: Partial<SearchrRepositoryFiltersModel>) => void
  handlePagination: (pagination: Partial<PaginationModel>) => void
  handleClear: VoidFunction
}
