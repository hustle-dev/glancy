import { useMutation } from '@tanstack/react-query'

import type { SummarizerOptions } from '~/types'

const useDownloadSummarizer = () => {
  return useMutation({
    mutationFn: async (options: SummarizerOptions) => {
      if (!navigator.userActivation.isActive) {
        throw new Error('사용자 활성화가 필요합니다. 버튼을 다시 클릭해주세요.')
      }
      const { onProgress, type, format, length, sharedContext } = options
      const summarizer = await self.Summarizer.create({
        type,
        format,
        length,
        sharedContext: sharedContext ?? '',
        monitor(m) {
          m.addEventListener('downloadprogress', (e) => {
            const downloadEvent = e as unknown as { loaded: number }
            const progress = Math.round(downloadEvent.loaded * 100)
            onProgress?.(progress)
          })
        },
      })
      return summarizer
    },
  })
}

export default useDownloadSummarizer
