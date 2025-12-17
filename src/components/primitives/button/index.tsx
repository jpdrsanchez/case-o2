import styles from './styles.module.css'

interface ButtonProps extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  icon?: React.ReactNode
}

export const Button = (props: React.PropsWithChildren<ButtonProps>) => {
  const { icon, ...buttonProps } = props
  const shouldRenderIcon = Boolean(icon)

  return (
    <button
      {...buttonProps}
      className={`${styles.wrapper} ${shouldRenderIcon && !props.children ? styles['icon-wrapper'] : ''}`}
    >
      {shouldRenderIcon && <span className={styles.icon}>{icon}</span>}
      {props.children}
    </button>
  )
}
