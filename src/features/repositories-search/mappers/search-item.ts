import { longDate, timeAgo } from '../../../utils/date/time-ago'
import type { RepositorySearchItemResponseDTO } from '../api/dtos'
import type { SearchItemModel } from '../models/search-item'
import { formatThousands } from '../utils/numeric'

export const searchItemMapper = {
  toModel(dto: RepositorySearchItemResponseDTO): SearchItemModel {
    return {
      id: dto.id,
      image: dto.owner.avatar_url,
      organizationName: dto.owner.login,
      repositoryName: dto.name,
      repositoryDescription: dto.description,
      stars: formatThousands(dto.stargazers_count),
      forks: formatThousands(dto.forks_count),
      watchers: formatThousands(dto.watchers_count),
      updatedAt: timeAgo(dto.updated_at),
      createdAt: longDate(dto.created_at),
      repositoryUrl: dto.html_url,
      cloneUrl: dto.clone_url,
      language: dto.language
    }
  }
}
