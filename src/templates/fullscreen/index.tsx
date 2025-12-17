import type { PropsWithChildren } from 'react'

import styles from './styles.module.css'

export const FullscreenTemplate = (props: PropsWithChildren) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>{props.children}</div>
    </div>
  )
}
