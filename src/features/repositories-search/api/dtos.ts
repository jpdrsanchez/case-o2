/**
 * DTOs related to repository search feature.
 * In the context of this application, DTOs are used to type the data retrieved from
 * the GitHub API for repository search operations. These data will be transformed into
 * models used within the application.
 */

export interface RepositorySearchRequestDTO {
  q: string
  page: number
  per_page: number
}

export interface RepositorySearchItemResponseDTO {
  id: number
  name: string
  owner: {
    avatar_url: string
    login: string
    url: string
  }
  html_url: string
  clone_url: string
  open_issues_count: number
  forks_count: number
  watchers_count: number
  stargazers_count: number
  description: string
  archived: boolean
  language: string
  created_at: string
  updated_at: string
  visibility: string
  topics: string[]
}

export interface RepositorySearchResponseDTO {
  incomplete_results: boolean
  items: RepositorySearchItemResponseDTO[]
  total_count: number
}
