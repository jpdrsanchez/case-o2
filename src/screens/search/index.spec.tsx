import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SearchScreen } from '.'
import { useRepositoriesSearch } from '../../features/repositories-search/hooks/useRepositoriesSearch'

jest.mock(
  '../../features/repositories-search/hooks/useRepositoriesSearch',
  () => ({
    useRepositoriesSearch: jest.fn()
  })
)

const mockedUseRepositoriesSearch =
  useRepositoriesSearch as jest.MockedFunction<typeof useRepositoriesSearch>

describe('Search repositories feature', () => {
  it('Should render with no data when the user has not searched for any repositories', () => {
    mockedUseRepositoriesSearch.mockReturnValue({
      error: undefined,
      loading: undefined,
      filters: {
        perPage: 5,
        query: ''
      },
      handleClear: () => {},
      handleFilters: () => {},
      handlePagination: () => {},
      handleGetResults: async _ => {},
      setSelectedItem: () => {},
      results: undefined,
      pagination: {
        current: 1,
        first: 1,
        last: 1,
        hasNext: false,
        hasPrev: false,
        next: undefined,
        prev: undefined
      },
      selectedItem: undefined,
      totalCount: undefined
    })

    render(<SearchScreen />)

    screen.getByRole('textbox')
    screen.getByRole('button', { name: /Limpar/i })
    screen.getByText(/Nenhum repositório selecionado/i)
  })

  it('Should render the list of repositories when the user has searched for repositories', () => {
    mockedUseRepositoriesSearch.mockReturnValue({
      error: false,
      loading: false,
      filters: {
        perPage: 5,
        query: 'repo-1'
      },
      handleClear: () => {},
      handleFilters: () => {},
      handlePagination: () => {},
      handleGetResults: async _ => {},
      setSelectedItem: () => {},
      results: [
        {
          id: 1,
          cloneUrl: '',
          repositoryName: 'repo-1',
          repositoryUrl: 'test.com/repo-1',
          repositoryDescription: 'Repository 1',
          language: 'JavaScript',
          createdAt: '12 de Julho de 2019',
          updatedAt: 'há 5 dias',
          forks: '3k',
          image: 'test.com/image.png',
          stars: '5k',
          watchers: '2k',
          organizationName: 'test-org'
        }
      ],
      pagination: {
        current: 1,
        first: 1,
        last: 1,
        hasNext: false,
        hasPrev: false,
        next: undefined,
        prev: undefined
      },
      selectedItem: undefined,
      totalCount: 1
    })

    render(<SearchScreen />)

    screen.getByRole('button', { name: /Selecionar item/i })
    screen.getByRole('img', { name: /test-org/i })
    screen.getByText(/test-org \/ repo-1/i)
    screen.getByText(/Repository 1/i)
  })

  it('Should call the correct functions when interacting with the search input and buttons', async () => {
    const clearFunction = jest.fn()
    const filterFunction = jest.fn()
    const paginationFunction = jest.fn()
    const getResultsFunction = jest.fn()
    const selectItemFunction = jest.fn()

    mockedUseRepositoriesSearch.mockReturnValue({
      error: false,
      loading: false,
      filters: {
        perPage: 5,
        query: 'repo-1'
      },
      handleClear: clearFunction,
      handleFilters: filterFunction,
      handlePagination: paginationFunction,
      handleGetResults: getResultsFunction,
      setSelectedItem: selectItemFunction,
      results: [
        {
          id: 1,
          cloneUrl: '',
          repositoryName: 'repo-1',
          repositoryUrl: 'test.com/repo-1',
          repositoryDescription: 'Repository 1',
          language: 'JavaScript',
          createdAt: '12 de Julho de 2019',
          updatedAt: 'há 5 dias',
          forks: '3k',
          image: 'test.com/image.png',
          stars: '5k',
          watchers: '2k',
          organizationName: 'test-org'
        }
      ],
      pagination: {
        current: 2,
        first: 1,
        last: 1,
        hasNext: true,
        hasPrev: true,
        next: undefined,
        prev: undefined
      },
      selectedItem: undefined,
      totalCount: 1
    })

    const user = userEvent.setup()

    render(<SearchScreen />)

    await user.click(screen.getByRole('button', { name: /Limpar/i }))

    expect(clearFunction).toHaveBeenCalledTimes(1)

    await user.click(screen.getByRole('button', { name: /Selecionar item/i }))

    expect(selectItemFunction).toHaveBeenCalledTimes(1)

    await user.click(screen.getByRole('button', { name: /Página anterior/i }))
    await user.click(screen.getByRole('button', { name: /Próxima página/i }))

    expect(paginationFunction).toHaveBeenCalledTimes(2)
    expect(paginationFunction).toHaveBeenCalledWith({
      current: 1
    })
    expect(paginationFunction).toHaveBeenCalledWith({
      current: 3
    })

    await user.type(screen.getByRole('textbox'), 'repo-2')
    expect(filterFunction).toHaveBeenCalledTimes(6)
  })

  it('should show the selected repository details when a repository is selected', () => {
    mockedUseRepositoriesSearch.mockReturnValue({
      error: false,
      loading: false,
      filters: {
        perPage: 5,
        query: 'repo-1'
      },
      handleClear: () => {},
      handleFilters: () => {},
      handlePagination: () => {},
      handleGetResults: async _ => {},
      setSelectedItem: () => {},
      results: [
        {
          id: 1,
          cloneUrl: '',
          repositoryName: 'repo-1',
          repositoryUrl: 'test.com/repo-1',
          repositoryDescription: 'Repository 1',
          language: 'JavaScript',
          createdAt: '12 de Julho de 2019',
          updatedAt: 'há 5 dias',
          forks: '3k',
          image: 'test.com/image.png',
          stars: '5k',
          watchers: '2k',
          organizationName: 'test-org'
        }
      ],
      pagination: {
        current: 1,
        first: 1,
        last: 1,
        hasNext: false,
        hasPrev: false,
        next: undefined,
        prev: undefined
      },
      selectedItem: {
        id: 1,
        cloneUrl: '',
        repositoryName: 'repo-1',
        repositoryUrl: 'test.com/repo-1',
        repositoryDescription: 'Repository 1',
        language: 'JavaScript',
        createdAt: '12 de Julho de 2019',
        updatedAt: 'há 5 dias',
        forks: '3k',
        image: 'test.com/image.png',
        stars: '5k',
        watchers: '2k',
        organizationName: 'test-org'
      },
      totalCount: 1
    })

    render(<SearchScreen />)

    const images = screen.getAllByRole('img', { name: /test-org/i })
    expect(images).toHaveLength(2)

    const titles = screen.getAllByText(/test-org \/ repo-1/i)
    expect(titles).toHaveLength(2)

    const descriptions = screen.getAllByText(/Repository 1/i)
    expect(descriptions).toHaveLength(2)

    screen.getByRole('button', { name: /Copiar Clone URL/i })
    screen.getByRole('link', { name: /Ver no GitHub/i })
  })
})
