import { useEffect, useState } from 'react'

import type { ChromeStorage } from '~/types'
import { SummarizerFormat, SummarizerLength, SummarizerType } from '~/types'

import css from './App.module.scss'

const App = () => {
  const [selectedText, setSelectedText] = useState('')
  const [summary, setSummary] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection()
      const text = selection?.toString().trim()
      if (text && text.length > 100) {
        setSelectedText(text)
        setIsVisible(true)
        setSummary('')
      } else {
        setIsVisible(false)
      }
    }
    document.addEventListener('mouseup', handleSelection)
    document.addEventListener('keyup', handleSelection)
    return () => {
      document.removeEventListener('mouseup', handleSelection)
      document.removeEventListener('keyup', handleSelection)
    }
  }, [])
  const handleSummarize = async () => {
    if (!selectedText) return
    setIsLoading(true)
    setIsStreaming(false)
    setSummary('')
    try {
      const { summarizerOptions, summarizerReady } = await chrome.storage.local.get<ChromeStorage>([
        'summarizerOptions',
        'summarizerReady',
      ])
      if (!summarizerReady) {
        setSummary('⚠️ Summarizer가 아직 설정되지 않았습니다. 확장 프로그램 아이콘을 클릭하여 설정해주세요.')
        setIsLoading(false)
        return
      }
      const { type, format, length, sharedContext } = summarizerOptions ?? {
        type: SummarizerType.KeyPoints,
        format: SummarizerFormat.Markdown,
        length: SummarizerLength.Medium,
        sharedContext: '',
      }
      const summarizer = await self.Summarizer.create({
        type,
        format,
        length,
        sharedContext,
      })
      setIsLoading(false)
      setIsStreaming(true)
      const stream = summarizer.summarizeStreaming(selectedText)
      const reader = stream.getReader()
      try {
        let fullSummary = ''
        let result = await reader.read()
        while (!result.done) {
          const { value } = result
          fullSummary += value
          setSummary(fullSummary)
          result = await reader.read()
        }
      } finally {
        reader.releaseLock()
      }
    } catch (error) {
      setSummary(`❌ 요약 생성 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsLoading(false)
      setIsStreaming(false)
    }
  }
  const handleClose = () => {
    setIsVisible(false)
    setSelectedText('')
    setSummary('')
  }
  if (!isVisible) return null
  return (
    <div className={css.root}>
      <div className={css.header}>
        <h3>✨ Glancy 요약기</h3>
        <button className={css.close} onClick={handleClose}>
          ✕
        </button>
      </div>
      <div className={css.content}>
        <div className={css.selected}>
          <strong>선택된 텍스트:</strong>
          <p>{selectedText.substring(0, 150)}...</p>
        </div>
        {summary && (
          <div className={css.summary}>
            <strong>요약:</strong>
            <div className={`${css.summaryContent} ${isStreaming ? css.streaming : ''}`}>
              {summary}
              {isStreaming && <span className={css.cursor}>▊</span>}
            </div>
          </div>
        )}
        <button
          className={css.glancyButton}
          onClick={handleSummarize}
          disabled={isLoading || isStreaming || !selectedText}
        >
          {isLoading ? '모델 준비 중...' : isStreaming ? '요약 생성 중...' : '요약하기'}
        </button>
      </div>
    </div>
  )
}

export default App
