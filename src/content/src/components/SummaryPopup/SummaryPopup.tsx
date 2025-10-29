import clsx from 'clsx'
import { Popover, VisuallyHidden } from 'radix-ui'
import { useState } from 'react'

import Toast from '~/components/Toast'

import ShimmerLoader from './components/ShimmerLoader'
import CloseIcon from './icons/CloseIcon'
import CopyIcon from './icons/CopyIcon'
import TranslateIcon from './icons/TranslateIcon'
import css from './SummaryPopup.module.scss'

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
      <Popover.Portal>
        <Popover.Content
          className={css.root}
          sideOffset={8}
          align="center"
          onInteractOutside={handleInteractOutside}
          onEscapeKeyDown={onClose}
          avoidCollisions={false}
          onMouseUp={(e) => {
            e.stopPropagation()
          }}
        >
          <div className={css.header}>
            <h2 className={css.title}>Summarize</h2>
            <Popover.Close className={css.closeButton}>
              <CloseIcon aria-hidden />
              <VisuallyHidden.Root>Close</VisuallyHidden.Root>
            </Popover.Close>
          </div>
          {isLoading ? (
            <ShimmerLoader />
          ) : (
            <>
              <div className={css.content}>
                <p className={css.summaryText}>
                  {summary}
                  {isStreaming && <span className={css.cursor}>▊</span>}
                </p>
              </div>
              <div className={css.actions}>
                <button className={clsx(css.actionButton, css.translateButton)} onClick={handleTranslate}>
                  <TranslateIcon aria-hidden />
                  <VisuallyHidden.Root>Translate</VisuallyHidden.Root>
                </button>
                <button className={clsx(css.actionButton, css.copyButton)} onClick={handleCopy}>
                  <CopyIcon aria-hidden />
                  <VisuallyHidden.Root>Copy</VisuallyHidden.Root>
                </button>
              </div>
            </>
          )}
          <div className={css.gradient} />
          <Toast
            open={toast.open}
            message={toast.message}
            onOpenChange={handleToastOpenChange}
            viewPortClassName={css.toastViewport}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default SummaryPopup
