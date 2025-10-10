import type { Availability, SummarizerFormat, SummarizerLength, SummarizerType } from '~/types'

declare global {
  interface Window {
    Summarizer: SummarizerStatic
  }
}

interface SummarizerStatic {
  create(options?: SummarizerCreateOptions): Promise<Summarizer>
  availability(): Promise<Availability>
}

interface SummarizerCreateOptions {
  type?: SummarizerType
  format?: SummarizerFormat
  length?: SummarizerLength
  sharedContext?: string
  signal?: AbortSignal
  monitor?: CreateMonitorCallback
  expectedInputLanguages?: string[]
  expectedContextLanguages?: string[]
  outputLanguage?: string
}

type CreateMonitorCallback = (monitor: CreateMonitor) => void

interface CreateMonitor extends EventTarget {
  ondownloadprogress: ((this: CreateMonitor, ev: Event) => unknown) | null
}

interface Summarizer {
  readonly type: SummarizerType
  readonly format: SummarizerFormat
  readonly length: SummarizerLength
  readonly sharedContext: string
  readonly expectedInputLanguages: readonly string[]
  readonly expectedContextLanguages: readonly string[]
  readonly outputLanguage: string
  readonly inputQuota: number
  summarize(input: string, options?: SummarizeOptions): Promise<string>
  summarizeStreaming(input: string, options?: SummarizeOptions): ReadableStream
  measureInputUsage(input: string, options?: SummarizeOptions): Promise<number>
  destroy(): void
}

interface SummarizeOptions {
  context?: string
  signal?: AbortSignal
}
