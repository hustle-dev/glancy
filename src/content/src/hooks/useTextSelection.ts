import { useCallback, useEffect, useState } from 'react'

interface Position {
  x: number
  y: number
}

interface TextSelection {
  text: string
  position: Position
  show: boolean
}

const MIN_TEXT_LENGTH = 100
const BUTTON_OFFSET_X = 8
const BUTTON_OFFSET_Y = -4

const useTextSelection = () => {
  const [selection, setSelection] = useState<TextSelection>({
    text: '',
    position: { x: 0, y: 0 },
    show: false,
  })
  const resetSelection = useCallback(() => {
    setSelection({
      text: '',
      position: { x: 0, y: 0 },
      show: false,
    })
  }, [])
  const handleSelection = useCallback(() => {
    const windowSelection = window.getSelection()
    const text = windowSelection?.toString().trim()
    if (text && text.length > MIN_TEXT_LENGTH) {
      const range = windowSelection?.getRangeAt(0)
      if (range) {
        const rects = range.getClientRects()
        if (rects.length > 0) {
          const lastRect = rects[rects.length - 1]
          const x = lastRect.right + window.scrollX + BUTTON_OFFSET_X
          const y = lastRect.top + window.scrollY + BUTTON_OFFSET_Y
          setSelection({
            text,
            position: { x, y },
            show: true,
          })
        }
      }
    } else {
      setSelection((prev) => ({ ...prev, show: false }))
    }
  }, [])
  const handleSelectionChange = useCallback(() => {
    const windowSelection = window.getSelection()
    const text = windowSelection?.toString().trim()
    if (!text) {
      setSelection((prev) => ({ ...prev, show: false }))
    }
  }, [])
  useEffect(() => {
    document.addEventListener('mouseup', handleSelection)
    document.addEventListener('selectionchange', handleSelectionChange)
    return () => {
      document.removeEventListener('mouseup', handleSelection)
      document.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, [handleSelection, handleSelectionChange])
  return { selection, setSelection, resetSelection }
}

export default useTextSelection
