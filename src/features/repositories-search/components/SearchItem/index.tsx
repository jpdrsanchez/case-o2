import { Card } from '../../../../components/data-display/card'
import { CodeIcon } from '../../../../components/icons/code'
import { StarIcon } from '../../../../components/icons/star'
import type { SearchItemModel } from '../../models/search-item'
import styles from './styles.module.css'

export const SearchItem = (
  props: SearchItemModel & { onClick: VoidFunction }
) => {
  return (
    <div
      role="button"
      className={styles.root}
      aria-label="Selecionar item"
      onClick={props.onClick}
    >
      <Card>
        <div className={styles.wrapper}>
          <div>
            <img
              src={props.image}
              alt={props.organizationName}
              className={styles.picture}
            />
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>
              {props.organizationName} / {props.repositoryName}
            </h2>
            <p className={styles.description}>{props.repositoryDescription}</p>
            <div className={styles.footer}>
              <div className={styles.stats}>
                <span className={styles['stats-item']}>
                  <StarIcon width={14} height={14} fill="#1f1f1f" />
                  {props.stars}
                </span>
                <span className={styles['stats-item']}>
                  <CodeIcon width={14} height={14} fill="#1f1f1f" />
                  {props.language}
                </span>
              </div>
              <p className={styles['updated-at']}>
                Atualizado: {props.updatedAt}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
