import styles from './styles.module.css'

interface SkeletonProps {
  className?: string
}

export const Skeleton = (props: SkeletonProps) => {
  return (
    <div {...props} className={`${styles.wrapper} ${props.className ?? ''}`} />
  )
}
