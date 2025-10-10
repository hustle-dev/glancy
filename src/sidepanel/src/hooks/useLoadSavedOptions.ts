import { useQuery } from '@tanstack/react-query'

import { STORAGE_KEY } from '~/constants'
import type { ChromeStorage } from '~/types'

const useLoadSavedOptions = () => {
  return useQuery({
    queryKey: ['summarizer', 'savedOptions'],
    queryFn: async () => {
      const { summarizerOptions } = await chrome.storage.local.get<ChromeStorage>(STORAGE_KEY.SummarizerOptions)
      return summarizerOptions ?? null
    },
    staleTime: 0,
    refetchOnMount: true,
  })
}

export default useLoadSavedOptions
