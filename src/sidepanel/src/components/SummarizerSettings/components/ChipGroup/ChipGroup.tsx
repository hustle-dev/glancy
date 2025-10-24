import { ToggleGroup } from 'radix-ui'
import type { ReactNode } from 'react'

import css from './ChipGroup.module.scss'

interface ChipOption {
  value: string
  label: ReactNode
}

interface Props {
  options: ChipOption[]
  value: string
  disabled?: boolean
  onValueChange: (value: string) => void
}

const ChipGroup = ({ options, value, disabled = false, onValueChange }: Props) => {
  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      onValueChange={(newValue) => {
        if (newValue) onValueChange(newValue)
      }}
      className={css.root}
      disabled={disabled}
    >
      {options.map((option) => (
        <ToggleGroup.Item key={option.value} value={option.value} className={css.toggleItem}>
          {option.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}

export default ChipGroup
