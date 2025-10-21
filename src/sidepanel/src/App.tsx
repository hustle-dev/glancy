import { Availability, SummarizerFormat, SummarizerLength, SummarizerType } from '~/types'

import css from './App.module.scss'
import ChipGroup from './components/ChipGroup'
import CTAButton from './components/CTAButton'
import TextField from './components/TextField'
import useCheckAvailability from './hooks/useCheckAvailability'
import useDownloadSummarizer from './hooks/useDownloadSummarizer'
import useSummarizerOptions from './hooks/useSummarizerOptions'

const App = () => {
  const { options, setOptions } = useSummarizerOptions()
  const { data: availability, refetch } = useCheckAvailability()
  const { handleDownload, downloading } = useDownloadSummarizer(options, refetch)
  const disabled = downloading || availability === Availability.Unavailable
  return (
    <div className={css.root}>
      <header className={css.header}>
        <h1 className={css.title}>AI Glancy</h1>
        <p className={css.subtitle}>
          I help you grasp more content, faster{'\n'}— with concise, to-the-point summaries.
        </p>
      </header>
      <main className={css.main}>
        <section className={css.section}>
          <h3 className={css.sectionTitle}>Summary Type</h3>
          <ChipGroup
            value={options.type}
            onValueChange={(value) => {
              setOptions({ ...options, type: value as SummarizerType })
            }}
            options={[
              { value: SummarizerType.KeyPoints, label: 'Key Points' },
              { value: SummarizerType.Tldr, label: 'Tldr' },
              { value: SummarizerType.Teaser, label: 'Teaser' },
              { value: SummarizerType.Headline, label: 'Headline' },
            ]}
            disabled={disabled}
          />
        </section>
        <section className={css.section}>
          <h3 className={css.sectionTitle}>Summary Length</h3>
          <ChipGroup
            value={options.length}
            onValueChange={(value) => {
              setOptions({ ...options, length: value as SummarizerLength })
            }}
            options={[
              { value: SummarizerLength.Short, label: 'Short' },
              { value: SummarizerLength.Medium, label: 'Medium' },
              { value: SummarizerLength.Long, label: 'Long' },
            ]}
            disabled={disabled}
          />
        </section>
        <section className={css.section}>
          <h3 className={css.sectionTitle}>Output Format</h3>
          <ChipGroup
            value={options.format}
            onValueChange={(value) => {
              setOptions({ ...options, format: value as SummarizerFormat })
            }}
            options={[
              { value: SummarizerFormat.Markdown, label: 'Markdown' },
              { value: SummarizerFormat.PlainText, label: 'Plain Text' },
            ]}
            disabled={disabled}
          />
        </section>

        <section className={css.section}>
          <h3 className={css.sectionTitle}>Prompt</h3>
          <TextField
            value={options.sharedContext}
            onChange={(value) => {
              setOptions({ ...options, sharedContext: value })
            }}
            placeholder="Text Field"
            disabled={disabled}
          />
        </section>
      </main>
      <div className={css.actionSection}>
        <CTAButton onClick={handleDownload} disabled={disabled || availability === Availability.Downloading}>
          {downloading ? 'Downloading...' : 'Save Settings'}
        </CTAButton>
      </div>
    </div>
  )
}

export default App
