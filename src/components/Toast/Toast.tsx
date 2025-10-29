import clsx from 'clsx'
import { Toast as RadixToast } from 'radix-ui'

import css from './Toast.module.scss'

interface Props {
  open: boolean
  message: string
  viewPortClassName?: string
  onOpenChange: (open: boolean) => void
}

const Toast = ({ open, onOpenChange, viewPortClassName, message }: Props) => {
  return (
    <RadixToast.Provider swipeDirection="up" duration={2000}>
      <RadixToast.Root className={css.root} open={open} onOpenChange={onOpenChange}>
        <RadixToast.Description className={css.message}>{message}</RadixToast.Description>
      </RadixToast.Root>
      <RadixToast.Viewport className={clsx(css.viewport, viewPortClassName)} />
    </RadixToast.Provider>
  )
}

export default Toast
