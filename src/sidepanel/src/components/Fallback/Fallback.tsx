import type { FallbackProps } from 'react-error-boundary'

import CTAButton from '../CTAButton'
import css from './Fallback.module.scss'

const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className={css.root}>
      <div className={css.iconWrapper}>
        <svg className={css.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18C1.64 18.3 1.55 18.65 1.55 19.01C1.55 19.37 1.64 19.72 1.82 20.02C2 20.32 2.26 20.56 2.57 20.72C2.88 20.88 3.23 20.96 3.59 20.95H20.41C20.77 20.96 21.12 20.88 21.43 20.72C21.74 20.56 22 20.32 22.18 20.02C22.36 19.72 22.45 19.37 22.45 19.01C22.45 18.65 22.36 18.3 22.18 18L13.71 3.86C13.53 3.56 13.27 3.31 12.96 3.14C12.65 2.97 12.3 2.88 11.94 2.88C11.58 2.88 11.23 2.97 10.92 3.14C10.61 3.31 10.35 3.56 10.17 3.86H10.29Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className={css.title}>Something went wrong</h2>
      <p className={css.message}>{(error as Error).message}</p>
      <CTAButton onClick={resetErrorBoundary}>Try Again</CTAButton>
    </div>
  )
}

export default Fallback
