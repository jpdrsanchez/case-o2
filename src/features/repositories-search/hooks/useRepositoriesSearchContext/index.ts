import { useContext } from 'react'

import { RepositoriesSearchContext } from '../../context/repositories-search/context'

export const useRepositoriesSearchContext = () => {
  return useContext(RepositoriesSearchContext)
}
