import { useCallback, useRef } from 'react'
import root from 'react-shadow'

import FloatingButton from './components/FloatingButton'
import SummaryPopup from './components/SummaryPopup'
import { useFloatingUI, useSummarizer, useTextSelection } from './hooks'
import getAllStyles from './styles'

const App = () => {
  const { selection, setSelection, resetSelection } = useTextSelection()
  const { summary, isLoading, isStreaming, summarize, resetSummary } = useSummarizer()
  const { showPopup, anchorEl, openPopup, closePopup } = useFloatingUI()
  const shadowRootRef = useRef<ShadowRoot | null>(null)
  const handleButtonClick = useCallback(() => {
    openPopup(selection.position)
    setSelection({ ...selection, show: false })
    void summarize(selection.text)
  }, [openPopup, selection, setSelection, summarize])
  const handleClose = useCallback(() => {
    closePopup()
    resetSelection()
    resetSummary()
  }, [closePopup, resetSelection, resetSummary])
  return (
    <root.div
      ref={(element: HTMLElement | null) => {
        if (element?.shadowRoot) {
          shadowRootRef.current = element.shadowRoot
          const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
          element.style.setProperty('--font-size', rootFontSize.toString())
        }
      }}
    >
      <div className="glancy">
        {selection.show && <FloatingButton position={selection.position} onClick={handleButtonClick} />}
        <SummaryPopup
          open={showPopup}
          anchorEl={anchorEl}
          summary={summary}
          isLoading={isLoading}
          isStreaming={isStreaming}
          onClose={handleClose}
        />
      </div>
      <style type="text/css">{getAllStyles()}</style>
    </root.div>
  )
}

export default App
