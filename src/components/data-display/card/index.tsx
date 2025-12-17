import type { PropsWithChildren } from 'react'

import styles from './styles.module.css'

export const Card = (props: PropsWithChildren) => {
  return <div className={styles.wrapper}>{props.children}</div>
}
