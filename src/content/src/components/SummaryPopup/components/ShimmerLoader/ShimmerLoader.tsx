import css from './ShimmerLoader.module.scss'

const ShimmerLoader = () => {
  return (
    <div className={css.root}>
      <div className={css.shimmerLines}>
        <div className={css.line1} />
        <div className={css.line2} />
        <div className={css.line3} />
        <div className={css.line4} />
        <div className={css.line5} />
        <div className={css.line6} />
        <div className={css.line7} />
        <div className={css.line8} />
      </div>
      <p className={css.loadingText}>Summarizing...</p>
    </div>
  )
}

export default ShimmerLoader
