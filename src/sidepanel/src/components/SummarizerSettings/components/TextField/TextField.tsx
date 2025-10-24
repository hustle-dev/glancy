import css from './TextField.module.scss'

interface Props {
  value: string
  placeholder?: string
  disabled?: boolean
  onChange: (value: string) => void
}

const TextField = ({ value, placeholder, disabled = false, onChange }: Props) => {
  return (
    <textarea
      className={css.root}
      value={value}
      onChange={(e) => {
        onChange(e.target.value)
      }}
      placeholder={placeholder}
      disabled={disabled}
      rows={3}
    />
  )
}

export default TextField
