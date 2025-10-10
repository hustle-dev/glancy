import type SummarizerFormat from './SummarizerFormat'
import type SummarizerLength from './SummarizerLength'
import type SummarizerType from './SummarizerType'

interface SummarizerOptions {
  /**
   * 이 요약기가 생성할 요약 유형을 지정하는 열거형 값입니다.
   */
  type?: SummarizerType
  /**
   * 요약본의 텍스트 형식을 지정하는 열거형 값입니다.
   */
  format?: SummarizerFormat
  /**
   * 생성된 요약본의 상대적 길이를 지정하는 열거형 값입니다.
   */
  length?: SummarizerLength
  /**
   * 요약할 텍스트 조각이 사용되는 맥락을 설명하는 sharedContext 문자열로, 요약기가 더 적합한 요약을 생성하는 데 도움이 됩니다.
   */
  sharedContext?: string
  /**
   * 입력 텍스트의 예상 언어를 지정하는 문자열 배열로, 유효한 BCP 47 언어 태그여야 합니다. 기본값은 ["en"]입니다.
   */
  expectedInputLanguages?: string[]
  /**
   * 제공된 컨텍스트 문자열(요약기에 전달된 sharedContext 또는 summarize() 또는 summarizeStreaming() 호출 시 지정된 컨텍스트)의 예상 언어를 지정하는 문자열 배열로,
   * 유효한 BCP 47 언어 태그여야 합니다. 기본값은 ["en"]입니다.
   */
  expectedContextLanguages?: string[]
  /**
   * 요약기가 생성하는 요약문의 예상 언어를 지정하는 문자열로, 유효한 BCP 47 언어 태그여야 합니다. 기본값은 en입니다.
   */
  outputLanguage?: string
  onProgress?: (progress: number) => void
}

export type { SummarizerOptions }
