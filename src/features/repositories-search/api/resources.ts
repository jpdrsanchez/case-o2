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
  const parsedRequest = new URLSearchParams()

  if (request.q.trim().length) parsedRequest.set('q', request.q)
  if (request.page) parsedRequest.set('page', request.page.toString())
  if (request.per_page)
    parsedRequest.set('per_page', request.per_page.toString())

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
