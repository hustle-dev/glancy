import clsx from 'clsx'
import type { SVGProps } from 'react'

import css from './CopyIcon.module.scss'

const CopyIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className={clsx(css.root, className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 18"
      fill="none"
      {...props}
    >
      <path
        d="M3.55542 3.6V0.9C3.55542 0.402948 3.9534 0 4.44432 0H15.1111C15.602 0 16 0.402948 16 0.9V13.5C16 13.9971 15.602 14.4 15.1111 14.4H12.4444V17.0992C12.4444 17.5967 12.0445 18 11.5495 18H0.894819C0.400529 18 0 17.5999 0 17.0992L0.0023111 4.50078C0.00239999 4.0033 0.402351 3.6 0.897272 3.6H3.55542ZM5.33321 3.6H12.4444V12.6H14.2222V1.8H5.33321V3.6Z"
        fill="#B6C0D0"
      />
    </svg>
  )
}

export default CopyIcon
