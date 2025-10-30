import appStyles from './App.scss?inline'
import floatingButtonStyles from './components/FloatingButton/FloatingButton.scss?inline'
import summaryIconStyles from './components/FloatingButton/icons/SummaryIcon/SummaryIcon.scss?inline'
import shimmerLoaderStyles from './components/SummaryPopup/components/ShimmerLoader/ShimmerLoader.scss?inline'
import closeIconStyles from './components/SummaryPopup/icons/CloseIcon/CloseIcon.scss?inline'
import copyIconStyles from './components/SummaryPopup/icons/CopyIcon/CopyIcon.scss?inline'
import translateIconStyles from './components/SummaryPopup/icons/TranslateIcon/TranslateIcon.scss?inline'
import summaryPopupStyles from './components/SummaryPopup/SummaryPopup.scss?inline'

const getAllStyles = (): string =>
  `
    ${appStyles}
    ${floatingButtonStyles}
    ${summaryIconStyles}
    ${summaryPopupStyles}
    ${shimmerLoaderStyles}
    ${closeIconStyles}
    ${copyIconStyles}
    ${translateIconStyles}
  `

export default getAllStyles
