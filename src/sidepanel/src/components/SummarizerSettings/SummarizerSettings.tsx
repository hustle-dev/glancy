import { eq } from 'es-toolkit/compat'
import { useState } from 'react'

import Toast from '~/components/Toast'
import { Availability, SummarizerFormat, SummarizerLength, SummarizerType } from '~/types'

import CTAButton from '../CTAButton'
import ChipGroup from './components/ChipGroup'
import TextField from './components/TextField'
import useSuspenseCheckAvailability from './hooks/useCheckAvailability'
import useDownloadSummarizer from './hooks/useDownloadSummarizer'
import useSummarizerOptions from './hooks/useSummarizerOptions'
import CheckMarkIcon from './icons/CheckMarkIcon'
import WarningIcon from './icons/WarningIcon'
import css from './SummarizerSettings.module.scss'

const AVAILABILITY_STATUS = {
  [Availability.Available]: {
    text: 'You can start using the Glancy summarizer.',
    icon: <CheckMarkIcon />,
  },
  [Availability.Downloading]: {
    text: "Downloading... You can use it once it's ready.",
    icon: undefined,
  },
  [Availability.Downloadable]: {
    text: 'Model download required.',
    icon: <WarningIcon />,
  },
  [Availability.Unavailable]: {
    text: 'Not available on this device. Check power or disk space.',
    icon: <WarningIcon />,
  },
}

const SummarizerSettings = () => {
  const { options, setOptions } = useSummarizerOptions()
  const { data: availability, refetch } = useSuspenseCheckAvailability()
  const { handleDownload, downloadProgress, downloading } = useDownloadSummarizer(options, refetch)
  const disabled = downloading || eq(availability, Availability.Unavailable)
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const handleSaveSettings = async () => {
    await handleDownload()
    const message = eq(availability, Availability.Downloadable) ? 'Downloading Model...' : 'Setup is complete!'
    setToastMessage(message)
    setToastOpen(true)
  }
  return (
    <div className={css.root}>
      <header className={css.header}>
        <h1 className={css.title}>AI Glancy</h1>
        <p className={css.subtitle}>
          I help you grasp more content, faster{'\n'}— with concise, to-the-point summaries.
        </p>
      </header>
      <div className={css.status}>
        {AVAILABILITY_STATUS[availability].icon ?? (
          <div className={css.progressIndicator}>
            <p className={css.progressText}>{downloadProgress.toFixed(0)}%</p>
          </div>
        )}
        <p className={css.statusText}>{AVAILABILITY_STATUS[availability].text}</p>
      </div>
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
            placeholder="Add any context that might help with the summary..."
            disabled={disabled}
          />
        </section>
      </main>
      <div className={css.actionSection}>
        <CTAButton onClick={handleSaveSettings} disabled={disabled || eq(availability, Availability.Downloading)}>
          {downloading
            ? 'Downloading...'
            : eq(availability, Availability.Downloadable)
              ? 'Download Model & Save'
              : 'Save Settings'}
        </CTAButton>
      </div>
      <Toast open={toastOpen} onOpenChange={setToastOpen} message={toastMessage} />
    </div>
  )
}

export default SummarizerSettings
