/**
 * This module defines the repository search resource function for interacting with the GitHub API.
 */

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

/**
 * This function performs a search for repositories on GitHub based on the provided request parameters.
 * It constructs the appropriate query string, makes a GET request to the GitHub API, and processes the response to extract data and pagination information.
 *
 * @param request The search request parameters (filters and pagination)
 *
 * @returns The search results and pagination information retrieved from the GitHub API.
 */
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
