import { Card } from '../../../../components/data-display/card'
import { CodeIcon } from '../../../../components/icons/code'
import { EyeIcon } from '../../../../components/icons/eye'
import { FolderIcon } from '../../../../components/icons/folder'
import { ForkIcon } from '../../../../components/icons/fork'
import { InfoIcon } from '../../../../components/icons/info'
import { StarIcon } from '../../../../components/icons/star'
import { Button } from '../../../../components/primitives/button'
import { useRepositoriesSearchContext } from '../../hooks/useRepositoriesSearchContext'
import styles from './styles.module.css'

export const RepositorySection = () => {
  const { selectedItem } = useRepositoriesSearchContext()

  return (
    <Card>
      <div className={styles.wrapper}>
        {!selectedItem && (
          <div className={styles['empty-state']}>
            <div className={styles.icon}>
              <InfoIcon />
            </div>
            <p>Nenhum repositório selecionado</p>
          </div>
        )}
        {selectedItem && (
          <div className={styles.content}>
            <div className={styles['title-wrapper']}>
              <div>
                <img
                  className={styles.picture}
                  src={selectedItem.image}
                  alt={selectedItem.organizationName}
                />
              </div>
              <h1 className={styles.title}>
                {selectedItem.organizationName} / {selectedItem.repositoryName}
              </h1>
            </div>
            <div role="separator" className={styles.divider} />
            <p className={styles.description}>
              {selectedItem.repositoryDescription}
            </p>
            <div role="separator" className={styles.divider} />
            <div className={styles.stats}>
              <span className={styles['stats-item']}>
                Estrelas:
                <StarIcon width={14} height={14} fill="#1f1f1f" />
                {selectedItem.stars}
              </span>
              <span className={styles['stats-item']}>
                Observadores:
                <EyeIcon width={14} height={14} fill="#1f1f1f" />
                {selectedItem.watchers}
              </span>
              <span className={styles['stats-item']}>
                Forks:
                <ForkIcon width={14} height={14} fill="#1f1f1f" />
                {selectedItem.forks}
              </span>
              <span className={styles['stats-item']}>
                Linguagem principal:
                <CodeIcon width={14} height={14} fill="#1f1f1f" />
                {selectedItem.language}
              </span>
            </div>
            <div role="separator" className={styles.divider} />
            <div className={styles['info-wrapper']}>
              <p>Criado em: {selectedItem.createdAt}</p>
              <p>Atualizado: {selectedItem.updatedAt}</p>
              <div className={styles['button-wrapper']}>
                <Button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(selectedItem.cloneUrl)
                    } catch (err) {
                      console.error(err)
                    }
                  }}
                >
                  Copiar Clone URL
                </Button>
                <a
                  className={styles.link}
                  href={selectedItem.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    <FolderIcon fill="#2482c9" />
                    Ver no GitHub
                  </span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
