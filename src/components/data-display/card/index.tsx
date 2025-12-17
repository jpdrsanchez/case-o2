import styles from './styles.module.css'

export const Card = (props: React.PropsWithChildren) => {
  return <div className={styles.wrapper}>{props.children}</div>
}
