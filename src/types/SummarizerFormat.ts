import type { ValueOf } from './ValueOf'

const SummarizerFormat = {
  Markdown: 'markdown',
  PlainText: 'plain-text',
} as const

type SummarizerFormat = ValueOf<typeof SummarizerFormat>

export default SummarizerFormat
