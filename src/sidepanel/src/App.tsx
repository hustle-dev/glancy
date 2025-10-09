import { eq } from 'es-toolkit/compat'
import { useEffect, useState } from 'react'

import { Availability, SummarizerFormat, SummarizerLength, SummarizerType } from '~/types'

import css from './App.module.scss'
import getAvailabilityMessage from './utils/getAvailabilityMessage'

interface SummarizerOptions {
  type: SummarizerType
  format: SummarizerFormat
  length: SummarizerLength
  sharedContext: string
}

const App = () => {
  const [availability, setAvailability] = useState<Availability | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const [options, setOptions] = useState<SummarizerOptions>({
    type: SummarizerType.KeyPoints,
    format: SummarizerFormat.Markdown,
    length: SummarizerLength.Medium,
    sharedContext: '',
  })
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    void checkAvailability()
    void loadSavedOptions()
  }, [])

  const checkAvailability = async () => {
    if (!('Summarizer' in self)) {
      setError('Summarizer API를 지원하지 않는 브라우저입니다.')
      return
    }

    try {
      // @ts-expect-error - Summarizer API is experimental
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const status = await self.Summarizer.availability()
      setAvailability(status as Availability)
    } catch (err) {
      console.error(err)
      setError('API 지원 여부를 확인하는 중 오류가 발생했습니다.')
    }
  }

  const loadSavedOptions = async () => {
    try {
      const result = await chrome.storage.local.get('summarizerOptions')
      console.log('result', result.summarizerOptions)

      if (result.summarizerOptions) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setOptions(result.summarizerOptions)
      }
    } catch (err) {
      console.error('설정을 불러오는 중 오류:', err)
    }
  }

  const handleDownload = async () => {
    if (!navigator.userActivation.isActive) {
      setError('사용자 활성화가 필요합니다. 버튼을 다시 클릭해주세요.')
      return
    }

    setIsLoading(true)
    setIsDownloading(true)
    setError('')
    setSuccess(false)
    setDownloadProgress(0)

    try {
      // @ts-expect-error - Summarizer API is experimental
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const summarizer = await self.Summarizer.create({
        type: options.type,
        format: options.format,
        length: options.length,
        sharedContext: options.sharedContext || undefined,
        monitor(m: unknown) {
          ;(m as EventTarget).addEventListener('downloadprogress', (e: unknown) => {
            const progress = Math.round((e as { loaded: number }).loaded * 100)
            setDownloadProgress(progress)
            console.log(`Downloaded ${progress.toString()}%`)
          })
        },
      })

      // 설정 저장
      await chrome.storage.local.set({
        summarizerOptions: options,
        summarizerReady: true,
      })

      // Summarizer 객체를 직접 저장할 수 없으므로, 준비 상태만 저장
      console.log('Summarizer created successfully:', summarizer)

      setSuccess(true)
      setIsDownloading(false)
      setDownloadProgress(100)
    } catch (err) {
      console.error('Summarizer 생성 오류:', err)
      setError(`모델 다운로드 중 오류가 발생했습니다: ${err instanceof Error ? err.message : String(err)}`)
      setIsDownloading(false)
    } finally {
      setIsLoading(false)
    }
  }
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
      {error && (
        <div className={css.messageError}>
          <strong>오류:</strong> {error}
        </div>
      )}
      {success && (
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
          <p className={css.optionDescription}>예: &quot;이 문서는 기술에 익숙한 독자를 대상으로 합니다.&quot;</p>
        </div>
      </div>
      {isDownloading && (
        <div className={css.progressSection}>
          <div className={css.progressBar}>
            <div className={css.progressFill} style={{ width: `${downloadProgress.toString()}%` }} />
          </div>
          <p className={css.progressText}>다운로드 중... {downloadProgress}%</p>
        </div>
      )}

      <div className={css.actionSection}>
        <button
          className={css.downloadButton}
          onClick={handleDownload}
          disabled={
            isLoading ||
            eq(availability, Availability.Unavailable) ||
            eq(availability, Availability.Downloadable) ||
            success
          }
        >
          {isLoading
            ? '다운로드 중...'
            : success
              ? '✓ 완료'
              : eq(availability, Availability.Downloadable) || eq(availability, Availability.Available)
                ? '설정 저장 및 Summarizer 생성'
                : '모델 다운로드 및 설정'}
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
