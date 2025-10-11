import { eq } from 'es-toolkit/compat'

import { Availability, SummarizerFormat, SummarizerLength, SummarizerType } from '~/types'

import css from './App.module.scss'
import useCheckAvailability from './hooks/useCheckAvailability'
import useDownloadSummarizer from './hooks/useDownloadSummarizer'
import useSummarizerOptions from './hooks/useSummarizerOptions'
import getAvailabilityMessage from './utils/getAvailabilityMessage'

const App = () => {
  const { options, setOptions } = useSummarizerOptions()
  const { data: availability, error: availabilityError, refetch } = useCheckAvailability()
  const {
    handleDownload,
    downloadProgress,
    downloading,
    downloadCompleted,
    error: downloadError,
  } = useDownloadSummarizer(options, refetch)
  const disabled = downloading || eq(availability, Availability.Unavailable)
  return (
    <div className={css.root}>
      <header className={css.header}>
        <h1>Glancy</h1>
        <p className={css.subtitle}>Chrome Summarizer API 설정</p>
      </header>
      <div className={css.statusSection}>
        <h2>상태</h2>
        <p className={css.status}>{getAvailabilityMessage(availability)}</p>
      </div>
      {downloading && (
        <div className={css.progressSection}>
          <div className={css.progressBar}>
            <div className={css.progressFill} style={{ width: `${downloadProgress.toString()}%` }} />
          </div>
          <p className={css.progressText}>다운로드 중... {downloadProgress}%</p>
        </div>
      )}
      {availabilityError && (
        <div className={css.messageError}>
          <strong>오류:</strong> {availabilityError.message}
        </div>
      )}
      {downloadError && (
        <div className={css.messageError}>
          <strong>오류:</strong>{' '}
          {downloadError instanceof Error ? downloadError.message : '모델 다운로드 중 오류가 발생했습니다.'}
        </div>
      )}
      {downloadCompleted && (
        <div className={css.messageSuccess}>
          <strong>성공!</strong> Summarizer 모델이 성공적으로 설정되었습니다.
        </div>
      )}
      <div className={css.optionsSection}>
        <h2>요약 설정</h2>
        <div className={css.optionGroup}>
          <label htmlFor="type">요약 타입</label>
          <select
            id="type"
            value={options.type}
            onChange={(e) => {
              setOptions({ ...options, type: e.target.value as SummarizerType })
            }}
            disabled={disabled}
          >
            <option value={SummarizerType.KeyPoints}>핵심 요점</option>
            <option value={SummarizerType.Tldr}>TL;DR (간단 요약)</option>
            <option value={SummarizerType.Teaser}>티저</option>
            <option value={SummarizerType.Headline}>헤드라인</option>
          </select>
          <p className={css.optionDescription}>
            {eq(options.type, SummarizerType.KeyPoints) && '중요 사항을 글머리 기호 목록으로 표시'}
            {eq(options.type, SummarizerType.Tldr) && '바쁜 독자를 위한 간략한 개요'}
            {eq(options.type, SummarizerType.Teaser) && '흥미로운 부분에 초점을 맞춤'}
            {eq(options.type, SummarizerType.Headline) && '핵심 사항을 기사 제목 형식으로 요약'}
          </p>
        </div>
        <div className={css.optionGroup}>
          <label htmlFor="format">출력 형식</label>
          <select
            id="format"
            value={options.format}
            onChange={(e) => {
              setOptions({ ...options, format: e.target.value as SummarizerFormat })
            }}
            disabled={disabled}
          >
            <option value={SummarizerFormat.Markdown}>마크다운</option>
            <option value={SummarizerFormat.PlainText}>일반 텍스트</option>
          </select>
        </div>
        <div className={css.optionGroup}>
          <label htmlFor="length">요약 길이</label>
          <select
            id="length"
            value={options.length}
            onChange={(e) => {
              setOptions({ ...options, length: e.target.value as SummarizerLength })
            }}
            disabled={disabled}
          >
            <option value={SummarizerLength.Short}>짧게</option>
            <option value={SummarizerLength.Medium}>중간</option>
            <option value={SummarizerLength.Long}>길게</option>
          </select>
        </div>
        <div className={css.optionGroup}>
          <label htmlFor="sharedContext">공유 컨텍스트 (선택사항)</label>
          <textarea
            id="sharedContext"
            value={options.sharedContext}
            onChange={(e) => {
              setOptions({ ...options, sharedContext: e.target.value })
            }}
            placeholder="요약 품질을 향상시킬 배경 정보를 입력하세요..."
            rows={3}
            disabled={disabled}
          />
          <p className={css.optionDescription}>예: &quot;이 문서는 기술에 익숙한 독자를 대상으로 합니다.&quot;</p>
        </div>
      </div>
      <div className={css.actionSection}>
        <button
          className={css.downloadButton}
          onClick={handleDownload}
          disabled={disabled || eq(availability, Availability.Downloading)}
        >
          {downloading ? '다운로드 중...' : '설정 저장 및 Summarizer 생성'}
        </button>
      </div>
      <div className={css.infoSection}>
        <h3>요구사항</h3>
        <ul>
          <li>Chrome 138 이상</li>
          <li>데스크톱 환경 (Windows, Mac, Linux)</li>
          <li>저장소: Chrome 프로필이 포함된 볼륨에 여유 공간이 22GB 이상</li>
          <li>GPU: VRAM이 4GB 이상</li>
        </ul>
      </div>
    </div>
  )
}

export default App
