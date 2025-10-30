import { useCallback, useState } from 'react'

import type { ChromeStorage } from '~/types'
import { SummarizerFormat, SummarizerLength, SummarizerType } from '~/types'

interface SummarizerState {
  summary: string
  isLoading: boolean
  isStreaming: boolean
}

const DEFAULT_OPTIONS = {
  type: SummarizerType.KeyPoints,
  format: SummarizerFormat.Markdown,
  length: SummarizerLength.Medium,
  sharedContext: '',
}

const ERROR_MESSAGES = {
  NOT_CONFIGURED: '⚠️ Summarizer is not configured yet. Please click the extension icon to set it up.',
  GENERIC_ERROR: '❌ An error occurred while generating the summary:',
}

const useSummarizer = () => {
  const [state, setState] = useState<SummarizerState>({
    summary: '',
    isLoading: false,
    isStreaming: false,
  })
  const resetSummary = useCallback(() => {
    setState({
      summary: '',
      isLoading: false,
      isStreaming: false,
    })
  }, [])
  const summarize = useCallback(async (text: string) => {
    if (!text) return
    setState({
      summary: '',
      isLoading: true,
      isStreaming: false,
    })
    try {
      const { summarizerOptions, summarizerReady } = await chrome.storage.local.get<ChromeStorage>([
        'summarizerOptions',
        'summarizerReady',
      ])
      if (!summarizerReady) {
        setState({
          summary: ERROR_MESSAGES.NOT_CONFIGURED,
          isLoading: false,
          isStreaming: false,
        })
        return
      }
      const options = summarizerOptions ?? DEFAULT_OPTIONS
      const summarizer = await self.Summarizer.create(options)
      setState((prev) => ({ ...prev, isStreaming: true }))
      const stream = summarizer.summarizeStreaming(text)
      const reader = stream.getReader()
      try {
        let fullSummary = ''
        let result = await reader.read()
        let hasReceivedFirstChunk = false
        while (!result.done) {
          const { value } = result
          if (!hasReceivedFirstChunk) {
            setState((prev) => ({ ...prev, isLoading: false }))
            hasReceivedFirstChunk = true
          }
          fullSummary += value
          setState((prev) => ({ ...prev, summary: fullSummary }))
          result = await reader.read()
        }
      } finally {
        reader.releaseLock()
      }
    } catch (error) {
      const errorMessage = `${ERROR_MESSAGES.GENERIC_ERROR} ${error instanceof Error ? error.message : String(error)}`
      setState({
        summary: errorMessage,
        isLoading: false,
        isStreaming: false,
      })
    } finally {
      setState((prev) => ({ ...prev, isLoading: false, isStreaming: false }))
    }
  }, [])
  return {
    ...state,
    summarize,
    resetSummary,
  }
}

export default useSummarizer
