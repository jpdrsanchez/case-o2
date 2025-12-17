import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
  ReactNode
} from 'react'

import styles from './styles.module.css'

interface ButtonProps extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  icon?: ReactNode
}

export const Button = (props: PropsWithChildren<ButtonProps>) => {
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
