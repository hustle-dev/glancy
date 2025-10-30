import { eq } from 'es-toolkit/compat'
import { useCallback, useEffect, useState } from 'react'

import type { ChromeStorage } from '~/types'

import type { Options } from './useSummarizerOptions'

const useDownloadSummarizer = (options: Options, refetchAvailability: () => void) => {
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [error, setError] = useState<Error | null>(null)
  const downloading = downloadProgress > 0 && downloadProgress < 100
  const downloadCompleted = eq(downloadProgress, 100)
  const handleDownload = useCallback(async () => {
    setDownloadProgress(0)
    setError(null)
    try {
      if (!navigator.userActivation.isActive) {
        throw new Error('사용자 활성화가 필요합니다. 버튼을 다시 클릭해주세요.')
      }
      const { type, format, length, sharedContext } = options
      await self.Summarizer.create({
        type,
        format,
        length,
        sharedContext,
        monitor(m) {
          m.addEventListener('downloadprogress', (e) => {
            const downloadEvent = e as unknown as { loaded: number }
            const progress = Math.round(downloadEvent.loaded * 100)
            setDownloadProgress(progress)
          })
        },
      })
      await chrome.storage.local.set<ChromeStorage>({
        summarizerOptions: options,
        summarizerReady: true,
      })
      refetchAvailability()
    } catch (err) {
      const error = err instanceof Error ? err : new Error('알 수 없는 오류가 발생했습니다.')
      setError(error)
      throw error
    }
  }, [options, refetchAvailability])
  useEffect(() => {
    if (downloadCompleted) {
      refetchAvailability()
    }
  }, [downloadCompleted, refetchAvailability])
  return { handleDownload, downloadProgress, downloading, downloadCompleted, error }
}

export default useDownloadSummarizer
