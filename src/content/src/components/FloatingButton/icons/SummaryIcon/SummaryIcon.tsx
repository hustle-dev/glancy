import clsx from 'clsx'
import type { SVGProps } from 'react'

const SummaryIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      className={clsx('glancy-summary-icon', className)}
      {...props}
      viewBox="0 0 34 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 2H30" stroke="#D8E0E9" strokeWidth="4" strokeLinecap="round" />
      <path d="M2 11H30" stroke="#D8E0E9" strokeWidth="4" strokeLinecap="round" />
      <path d="M2 20H19" stroke="#D8E0E9" strokeWidth="4" strokeLinecap="round" />
      <path d="M14 20L19 20" stroke="#93A9C0" strokeWidth="4" strokeLinecap="round" />
      <path
        d="M24.9296 20.9557C26.4267 20.6052 27.6052 19.4267 27.9557 17.9296C28.0737 17.4254 28.4822 17 29 17C29.5178 17 29.9263 17.4254 30.0444 17.9296C30.3948 19.4267 31.5733 20.6052 33.0704 20.9557C33.5746 21.0737 34 21.4822 34 22C34 22.5178 33.5746 22.9263 33.0704 23.0443C31.5733 23.3948 30.3948 24.5733 30.0444 26.0704C29.9263 26.5746 29.5178 27 29 27C28.4822 27 28.0737 26.5746 27.9557 26.0704C27.6052 24.5733 26.4267 23.3948 24.9296 23.0443C24.4254 22.9263 24 22.5178 24 22C24 21.4822 24.4254 21.0737 24.9296 20.9557Z"
        fill="#0077FF"
      />
      <path d="M2 11H13" stroke="#93A9C0" strokeWidth="4" strokeLinecap="round" />
      <path d="M19 2H30" stroke="#93A9C0" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export default SummaryIcon
