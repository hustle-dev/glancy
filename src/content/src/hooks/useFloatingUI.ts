import { useCallback, useState } from 'react'

import pxToRem from '../utils/pxToRem'

interface Position {
  x: number
  y: number
}

const VIRTUAL_ELEMENT_SIZE = 40

const createVirtualAnchor = (position: Position): HTMLElement => {
  const element = document.createElement('div')
  element.style.position = 'absolute'
  element.style.left = pxToRem(position.x)
  element.style.top = pxToRem(position.y)
  element.style.width = pxToRem(VIRTUAL_ELEMENT_SIZE)
  element.style.height = pxToRem(VIRTUAL_ELEMENT_SIZE)
  document.body.appendChild(element)
  return element
}

const useFloatingUI = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const openPopup = useCallback((position: Position) => {
    const virtualElement = createVirtualAnchor(position)
    setAnchorEl(virtualElement)
    setShowPopup(true)
  }, [])
  const closePopup = useCallback(() => {
    setShowPopup(false)
    if (anchorEl?.parentNode) {
      anchorEl.parentNode.removeChild(anchorEl)
    }
    setAnchorEl(null)
  }, [anchorEl])
  return {
    showPopup,
    anchorEl,
    openPopup,
    closePopup,
  }
}

export default useFloatingUI
