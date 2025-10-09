import type { ValueOf } from './ValueOf'

const SummarizerLength = {
  Short: 'short',
  Medium: 'medium',
  Long: 'long',
} as const

type SummarizerLength = ValueOf<typeof SummarizerLength>

export default SummarizerLength
