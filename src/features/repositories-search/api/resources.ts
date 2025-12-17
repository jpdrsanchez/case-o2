import queryString from 'query-string'

import { client } from './client'
import type {
  RepositorySearchRequestDTO,
  RepositorySearchResponseDTO
} from './dtos'
import { generatePagination } from '../utils/pagination'
import type { PaginationModel } from '../models/pagination'

interface RepositorySearchResourceResponse {
  data: RepositorySearchResponseDTO
  pagination: PaginationModel
}

export const repositorySearchResource = async (
  request: RepositorySearchRequestDTO
) => {
  const parsedRequest = queryString.stringify(request, {
    skipEmptyString: true,
    skipNull: true
  })

  const url = `/search/repositories?${parsedRequest}`

  const response = await client.get<RepositorySearchResponseDTO>(url)
  const pagination = generatePagination(response.headers['link'])

  return {
    data: response.data,
    pagination: {
      ...pagination,
      hasNext: Boolean(pagination.next),
      hasPrev: Boolean(pagination.prev),
      current: request.page
    }
  } satisfies RepositorySearchResourceResponse
}
