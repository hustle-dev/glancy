import { HoverCard, VisuallyHidden } from 'radix-ui'

import pxToRem from '../../utils/pxToRem'
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
          className="glancy-floating-button"
          onClick={onClick}
        >
          <SummaryIcon />
          <VisuallyHidden.Root>Summarize page content</VisuallyHidden.Root>
        </button>
      </HoverCard.Trigger>
      <HoverCard.Content className="glancy-floating-button__hover-card" side="top" sideOffset={8}>
        <div className="glancy-floating-button__hover-card-content">Summarizes long sentences concisely.</div>
        <HoverCard.Arrow className="glancy-floating-button__hover-card-arrow" />
      </HoverCard.Content>
    </HoverCard.Root>
  )
}

export default FloatingButton
