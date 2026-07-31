import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LandingPage } from './pages/LandingPage'
import './styles/landing.css'
import './styles/mobile-polish.css'
import './features/rhythm/styles/rhythm.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LandingPage />
  </StrictMode>,
)
