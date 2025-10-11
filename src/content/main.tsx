import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './src/App.tsx'

const container = document.createElement('div')
container.id = 'glancy'
document.body.appendChild(container)

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
