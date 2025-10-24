import { HoverCard, VisuallyHidden } from 'radix-ui'

import pxToRem from '../../utils/pxToRem'
import css from './FloatingButton.module.scss'
import SummaryIcon from './icons/SummaryIcon'

interface Position {
  x: number
  y: number
}

interface Props {
  position: Position
  onClick: () => void
}

const FloatingButton = ({ position, onClick }: Props) => {
  return (
    <HoverCard.Root openDelay={100}>
      <HoverCard.Trigger asChild>
        <button
          style={{
            top: pxToRem(position.y),
            left: pxToRem(position.x),
          }}
          className={css.root}
          onClick={onClick}
        >
          <SummaryIcon />
          <VisuallyHidden.Root>Summarize page content</VisuallyHidden.Root>
        </button>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className={css.hoverCard} side="top" sideOffset={8}>
          <div className={css.hoverCardContent}>Summarizes long sentences concisely.</div>
          <HoverCard.Arrow className={css.hoverCardArrow} />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}

export default FloatingButton
