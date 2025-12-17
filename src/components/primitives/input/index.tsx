import { useId } from 'react'

import styles from './styles.module.css'

interface InputProps {
  name: string
  value: string
  onChange: (value: string) => void
  icon?: React.ReactNode
  id?: string
  placeholder?: string
  ariaLabel?: string
}

export const Input = (props: InputProps) => {
  const id = useId()
  const shouldRenderIcon = Boolean(props.icon)

  return (
    <label
      className={`${styles.wrapper} ${shouldRenderIcon ? styles['wrapper-icon'] : ''}`}
      htmlFor={props.id || id}
    >
      {shouldRenderIcon && <span className={styles.icon}>{props.icon}</span>}
      <input
        className={styles.input}
        name={props.name}
        id={props.id || id}
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        aria-label={props.ariaLabel}
      />
    </label>
  )
}
