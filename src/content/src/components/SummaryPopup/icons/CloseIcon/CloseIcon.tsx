import clsx from 'clsx'
import type { SVGProps } from 'react'

import css from './CloseIcon.module.scss'

const CloseIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className={clsx(css.root, className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M12 10.2223L17.3334 4.88889C17.8243 4.39797 18.6202 4.39797 19.1111 4.8889C19.602 5.37981 19.602 6.17574 19.1111 6.66666L13.7777 12.0001L19.1111 17.3334C19.602 17.8243 19.602 18.6202 19.1111 19.1111C18.6202 19.602 17.8243 19.602 17.3334 19.1111L12 13.7778L6.66666 19.1111C6.17575 19.602 5.37981 19.602 4.8889 19.1111C4.39797 18.6202 4.39797 17.8243 4.88889 17.3333L10.2222 12.0001L4.88888 6.66667C4.39796 6.17575 4.39797 5.37981 4.88889 4.88889C5.37981 4.39797 6.17575 4.39798 6.66667 4.8889L12 10.2223Z"
        fill="#BCC6D7"
      />
    </svg>
  )
}

export default CloseIcon
