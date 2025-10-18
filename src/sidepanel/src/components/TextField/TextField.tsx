import css from './TextField.module.scss'

interface Props {
  value: string
  placeholder?: string
  disabled?: boolean
  onChange: (value: string) => void
}

const TextField = ({ value, placeholder = 'Text Field', disabled = false, onChange }: Props) => {
  return (
    <input
      type="text"
      className={css.root}
      value={value}
      onChange={(e) => {
        onChange(e.target.value)
      }}
      placeholder={placeholder}
      disabled={disabled}
    />
  )
}

export default TextField
