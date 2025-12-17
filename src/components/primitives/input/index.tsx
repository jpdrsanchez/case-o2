import { useId } from 'react'

import { SearchIcon } from '../../icons/search'
import styles from './styles.module.css'

interface InputProps {
  name: string
  value: string
  onChange: (value: string) => void
  id?: string
  placeholder?: string
  ariaLabel?: string
}

export const Input = (props: InputProps) => {
  const id = useId()

  return (
    <label className={styles.wrapper} htmlFor={props.id || id}>
      <div className={styles.icon}>
        <SearchIcon />
      </div>
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
