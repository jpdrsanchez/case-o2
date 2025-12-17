import { useContext } from 'react'

import { RepositoriesSearchContext } from '../../context/repositories-search/context'

/**
 * This hook provides access to the RepositoriesSearchContext.
 * It allows components to consume the repository search state and actions.
 */
export const useRepositoriesSearchContext = () => {
  return useContext(RepositoriesSearchContext)
}
