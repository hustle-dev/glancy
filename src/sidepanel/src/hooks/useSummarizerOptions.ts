import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { STORAGE_KEY } from '~/constants'
import type { ChromeStorage } from '~/types'
import { SummarizerFormat, SummarizerLength, SummarizerType } from '~/types'

type Options = NonNullable<ChromeStorage['summarizerOptions']>

const defaultOptions: Options = {
  type: SummarizerType.KeyPoints,
  format: SummarizerFormat.Markdown,
  length: SummarizerLength.Medium,
  sharedContext: '',
}

const useSummarizerOptions = () => {
  const [options, setOptions] = useState<Options>(defaultOptions)
  const { data: savedOptions } = useQuery({
    queryKey: ['summarizer', 'savedOptions'],
    queryFn: async () => {
      const { summarizerOptions } = await chrome.storage.local.get<ChromeStorage>(STORAGE_KEY.SummarizerOptions)
      return summarizerOptions ?? null
    },
    staleTime: 0,
  })
  useEffect(() => {
    if (savedOptions) {
      setOptions((prev) => ({ ...prev, ...savedOptions }))
    }
  }, [savedOptions])
  return { options, setOptions }
}

export default useSummarizerOptions
export type { Options }
