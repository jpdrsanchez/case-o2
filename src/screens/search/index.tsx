import styles from './styles.module.css'
import { RepositoriesSearchProvider } from '../../features/repositories-search/context/repositories-search/provider'
import { SearchSection } from '../../features/repositories-search/components/SearchSection'
import { RepositorySection } from '../../features/repositories-search/components/RepositorySection'

export const SearchScreen = () => {
  return (
    <RepositoriesSearchProvider>
      <div className={styles.wrapper}>
        <SearchSection />
        <RepositorySection />
      </div>
    </RepositoriesSearchProvider>
  )
}
