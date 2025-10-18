import type { PropsWithChildren } from 'react'

import css from './CTAButton.module.scss'

interface Props extends PropsWithChildren {
  disabled?: boolean
  onClick?: () => void
}

const CTAButton = ({ disabled = false, onClick, children }: Props) => {
  return (
    <button className={css.root} onClick={onClick} disabled={disabled}>
      <svg className={css.icon} viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.5 0L9.18386 5.31614L14.5 7L9.18386 8.68386L7.5 14L5.81614 8.68386L0.5 7L5.81614 5.31614L7.5 0Z"
          fill="white"
        />
      </svg>
      {children}
    </button>
  )
}

export default CTAButton
