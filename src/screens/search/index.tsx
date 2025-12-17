import { useState } from 'react'

import { Card } from '../../components/data-display/card'
import { Input } from '../../components/primitives/input'
import styles from './styles.module.css'

export const SearchScreen = () => {
  const [value, setValue] = useState('')

  return (
    <div className={styles.wrapper}>
      <Card>
        <div>
          <Input name="search" value={value} onChange={setValue} />
        </div>
      </Card>
      <Card>{value}</Card>
    </div>
  )
}
