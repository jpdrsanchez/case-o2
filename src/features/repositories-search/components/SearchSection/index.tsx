import { Card } from '../../../../components/data-display/card'
import { Skeleton } from '../../../../components/feedback/skeleton'
import { LeftArrowIcon } from '../../../../components/icons/left-arrow'
import { RightArrowIcon } from '../../../../components/icons/right-arrow'
import { Button } from '../../../../components/primitives/button'
import { Input } from '../../../../components/primitives/input'
import { useRepositoriesSearchContext } from '../../hooks/useRepositoriesSearchContext'
import { SearchItem } from '../SearchItem'
import styles from './styles.module.css'

export const SearchSection = () => {
  const {
    loading,
    items,
    filters,
    pagination,
    handlePagination,
    handleFilters,
    handleClear,
    handleSelectItem
  } = useRepositoriesSearchContext()

  return (
    <Card>
      <div className={styles.wrapper}>
        <div className={styles['input-wrapper']}>
          <Input
            ariaLabel="Pesquisar repositórios"
            placeholder="Pesquisar repositórios"
            name="search"
            value={filters.query}
            onChange={value => handleFilters({ query: value })}
          />
          <Button onClick={handleClear}>Limpar</Button>
        </div>
        {Boolean(loading) && (
          <ul className={styles.list}>
            <li>
              <Skeleton className={styles.skeleton} />
            </li>
            <li>
              <Skeleton className={styles.skeleton} />
            </li>
            <li>
              <Skeleton className={styles.skeleton} />
            </li>
            <li>
              <Skeleton className={styles.skeleton} />
            </li>
            <li>
              <Skeleton className={styles.skeleton} />
            </li>
          </ul>
        )}
        {Boolean(items?.length && !loading) && (
          <>
            <ul className={styles.list}>
              {items?.map(item => {
                return (
                  <li key={item.id}>
                    <SearchItem
                      {...item}
                      onClick={() => {
                        handleSelectItem(item)
                      }}
                    />
                  </li>
                )
              })}
            </ul>
            <nav className={styles.pagination}>
              <Button
                aria-label="Página anterior"
                disabled={!pagination.hasPrev}
                icon={<LeftArrowIcon fill="#e3eefb" />}
                onClick={() => {
                  handlePagination({
                    current: pagination.current - 1
                  })
                }}
              />
              <Button
                aria-label="Próxima página"
                disabled={!pagination.hasNext}
                icon={<RightArrowIcon fill="#e3eefb" />}
                onClick={() => {
                  handlePagination({
                    current: pagination.current + 1
                  })
                }}
              />
            </nav>
          </>
        )}
      </div>
    </Card>
  )
}
