import clsx from 'clsx'
import type { SVGProps } from 'react'

import css from './CloseIcon.module.scss'

const CloseIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className={clsx(css.root, className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 13 13"
      fill="none"
      {...props}
    >
      <path
        d="M6.23256 4.75128L10.677 0.306783C11.0861 -0.102317 11.7494 -0.102316 12.1585 0.306786C12.5676 0.715885 12.5676 1.37916 12.1585 1.78825L7.71403 6.23275L12.1585 10.6772C12.5676 11.0863 12.5676 11.7495 12.1585 12.1586C11.7494 12.5677 11.0861 12.5677 10.677 12.1586L6.23256 7.71422L1.78814 12.1586C1.37904 12.5677 0.715763 12.5677 0.306664 12.1586C-0.102438 11.7495 -0.102438 11.0863 0.306664 10.6772L4.7511 6.23275L0.306652 1.78826C-0.102445 1.37916 -0.102443 0.715884 0.306656 0.306785C0.715758 -0.102316 1.37904 -0.102314 1.78814 0.306791L6.23256 4.75128Z"
        fill="#BCC6D7"
      />
    </svg>
  )
}

export default CloseIcon
