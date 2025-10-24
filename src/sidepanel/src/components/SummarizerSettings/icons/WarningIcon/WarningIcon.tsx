import clsx from 'clsx'
import type { SVGProps } from 'react'

import css from './WarningIcon.module.scss'

const WarningIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
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
        d="M7.99924 12.0812C7.54974 12.0812 7.18594 11.7174 7.18594 11.2687C7.18594 10.8201 7.54974 10.4563 7.99924 10.4563C8.44793 10.4563 8.81174 10.8201 8.81174 11.2687C8.81174 11.7174 8.44793 12.0812 7.99924 12.0812ZM7.27187 4.56511C7.27187 4.16331 7.59768 3.8375 7.99948 3.8375C8.40128 3.8375 8.72709 4.16331 8.72709 4.56511V8.48368C8.72709 8.88548 8.40128 9.21129 7.99948 9.21129C7.59768 9.21129 7.27187 8.88548 7.27187 8.48368V4.56511ZM13.659 2.33956C10.5376 -0.780259 5.46131 -0.77945 2.33987 2.33956C-0.779955 5.461 -0.779955 10.5389 2.33987 13.6595C3.90099 15.2198 5.95042 16 7.99985 16C10.0485 16 12.0979 15.2198 13.659 13.6595C16.7788 10.5389 16.7788 5.461 13.659 2.33956Z"
        fill="#E03D46"
      />
    </svg>
  )
}

export default WarningIcon
