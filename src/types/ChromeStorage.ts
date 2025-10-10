import type { SummarizerOptions } from './SummarizerOptions'

interface ChromeStorage {
  summarizerOptions?: Required<Pick<SummarizerOptions, 'type' | 'format' | 'length' | 'sharedContext'>>
  summarizerReady?: boolean
}

export type { ChromeStorage }
