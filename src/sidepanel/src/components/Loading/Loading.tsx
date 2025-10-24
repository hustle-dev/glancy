import css from './Loading.module.scss'

const Loading = () => {
  return (
    <div className={css.root}>
      <div className={css.spinner} />
      <p className={css.text}>Checking status...</p>
    </div>
  )
}

export default Loading
