import clsx from 'clsx'
import type { PropsWithChildren } from 'react'

import css from './Chip.module.scss'

interface Props extends PropsWithChildren {
  active?: boolean
  disabled?: boolean
  onClick?: () => void
}

const Chip = ({ active = false, disabled = false, onClick, children }: Props) => {
  return (
    <button className={clsx(css.root, { [css.active]: active })} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Chip
