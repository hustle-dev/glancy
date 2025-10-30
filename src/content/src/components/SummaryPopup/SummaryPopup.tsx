import { Popover, VisuallyHidden } from 'radix-ui'
import { useState } from 'react'

import Toast from '~/components/Toast'

import ShimmerLoader from './components/ShimmerLoader'
import CloseIcon from './icons/CloseIcon'
import CopyIcon from './icons/CopyIcon'
import TranslateIcon from './icons/TranslateIcon'

interface Props {
  open: boolean
  anchorEl: HTMLElement | null
  summary: string
  isLoading: boolean
  isStreaming: boolean
  onClose: () => void
}

interface Toast {
  open: boolean
  message: string
}

const SummaryPopup = ({ open, anchorEl, summary, isLoading, isStreaming, onClose }: Props) => {
  const [toast, setToast] = useState<Toast>({ open: false, message: '' })
  const handleToastOpenChange = (open: boolean) => {
    setToast({ open, message: toast.message })
  }
  const handleTranslate = () => {
    setToast({ open: true, message: 'Coming soon! 🌐' })
  }
  const handleCopy = () => {
    setToast({ open: true, message: 'Copied!' })
    void navigator.clipboard.writeText(summary)
  }
  const handleInteractOutside = (event: Event) => {
    const target = event.target as HTMLElement
    if (!target.closest('[data-radix-popover-content]')) {
      onClose()
    }
  }
  if (!anchorEl) return null
  return (
    <Popover.Root
      open={open}
      onOpenChange={(isOpen: boolean) => {
        if (!isOpen) {
          onClose()
        }
      }}
    >
      <Popover.Anchor virtualRef={{ current: anchorEl }} />
      <Popover.Content
        className="glancy-summary-popup"
        sideOffset={8}
        align="center"
        onInteractOutside={handleInteractOutside}
        onEscapeKeyDown={onClose}
        collisionPadding={10}
        onMouseUp={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="glancy-summary-popup__header">
          <h2 className="glancy-summary-popup__title">Summarize</h2>
          <Popover.Close className="glancy-summary-popup__close-button">
            <CloseIcon aria-hidden />
            <VisuallyHidden.Root>Close</VisuallyHidden.Root>
          </Popover.Close>
        </div>
        {isLoading ? (
          <ShimmerLoader />
        ) : (
          <>
            <div className="glancy-summary-popup__content">
              <p className="glancy-summary-popup__summary-text">
                {summary}
                {isStreaming && <span className="glancy-summary-popup__cursor">▊</span>}
              </p>
            </div>
            <div className="glancy-summary-popup__actions">
              <button
                className="glancy-summary-popup__action-button glancy-summary-popup__action-button--translate"
                onClick={handleTranslate}
              >
                <TranslateIcon aria-hidden />
                <VisuallyHidden.Root>Translate</VisuallyHidden.Root>
              </button>
              <button
                className="glancy-summary-popup__action-button glancy-summary-popup__action-button--copy"
                onClick={handleCopy}
              >
                <CopyIcon aria-hidden />
                <VisuallyHidden.Root>Copy</VisuallyHidden.Root>
              </button>
            </div>
          </>
        )}
        <div className="glancy-summary-popup__gradient" />
        <Toast
          open={toast.open}
          message={toast.message}
          onOpenChange={handleToastOpenChange}
          rootClassName="glancy-summary-popup__toast-root"
          descriptionClassName="glancy-summary-popup__toast-message"
          viewPortClassName="glancy-summary-popup__toast-viewport"
        />
      </Popover.Content>
    </Popover.Root>
  )
}

export default SummaryPopup
