import type { ValueOf } from './ValueOf'

const SummarizerType = {
  /**
   * 요약은 짧고 요점을 파악할 수 있어야 하며, 바쁜 독자에게 적합한 입력에 대한 간략한 개요를 제공해야 합니다.
   * - short: 문장 1개
   * - medium: 3문장
   * - long: 5문장
   */
  Tldr: 'tldr',
  /**
   * 요약은 입력의 가장 흥미로운 부분에 초점을 맞춰 독자가 더 많이 읽도록 유도해야 합니다.
   * - short: 문장 1개
   * - medium: 3문장
   * - long: 5문장
   */
  Teaser: 'teaser',
  /**
   * 요약은 입력에서 가장 중요한 사항을 추출하여 글머리 기호 목록으로 표시해야 합니다.
   * - short: 글머리 기호 3개
   * - medium: 글머리기호 5개
   * - long: 글머리기호 7개
   */
  KeyPoints: 'key-points',
  /**
   * 요약에는 입력의 핵심 사항이 기사 제목 형식으로 하나의 문장에 효과적으로 포함되어야 합니다
   * - short: 12단어
   * - medium: 17단어
   * - long: 22단어
   */
  Headline: 'headline',
} as const

type SummarizerType = ValueOf<typeof SummarizerType>

export default SummarizerType
