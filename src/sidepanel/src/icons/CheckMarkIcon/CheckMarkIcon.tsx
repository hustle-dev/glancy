import clsx from 'clsx'
import type { SVGProps } from 'react'

import css from './CheckMarkIcon.module.scss'

const CheckMarkIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className={clsx(css.root, className)}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6982 6.32697L7.32125 10.7039C7.17896 10.8462 6.99302 10.9174 6.80626 10.9174C6.62032 10.9174 6.43357 10.8462 6.29209 10.7039L4.30249 8.71434C4.01792 8.43057 4.01792 7.96894 4.30249 7.68517C4.58626 7.4006 5.04708 7.4006 5.33165 7.68517L6.80626 9.1606L10.669 5.29781C10.9528 5.01323 11.4136 5.01323 11.6982 5.29781C11.9828 5.58157 11.9828 6.04239 11.6982 6.32697ZM13.6604 2.33987C10.5381 -0.779956 5.46189 -0.779956 2.34046 2.33987C-0.780155 5.46131 -0.780155 10.5392 2.34046 13.6598C3.90077 15.2202 5.951 16.0003 8.00042 16.0003C10.0498 16.0003 12.0993 15.2202 13.6604 13.6598C16.7802 10.5392 16.7802 5.46131 13.6604 2.33987Z"
        fill="#33B79F"
      />
    </svg>
  )
}

export default CheckMarkIcon
