import { Toast as RadixToast } from 'radix-ui'

import css from './Toast.module.scss'

interface Props {
  open: boolean
  message: string
  onOpenChange: (open: boolean) => void
}

const Toast = ({ open, onOpenChange, message }: Props) => {
  return (
    <RadixToast.Provider swipeDirection="up" duration={2000}>
      <RadixToast.Root className={css.root} open={open} onOpenChange={onOpenChange}>
        <RadixToast.Description className={css.message}>{message}</RadixToast.Description>
      </RadixToast.Root>
      <RadixToast.Viewport className={css.viewport} />
    </RadixToast.Provider>
  )
}

export default Toast
