import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import Fallback from './components/Fallback'
import Loading from './components/Loading'
import SummarizerSettings from './components/SummarizerSettings'

const App = () => {
  const { reset } = useQueryErrorResetBoundary()
  return (
    <ErrorBoundary onReset={reset} FallbackComponent={Fallback}>
      <Suspense fallback={<Loading />}>
        <SummarizerSettings />
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
