import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './app/i18n/LanguageContext'
import { AuthProvider } from './app/auth/AuthContext'
import { ToastProvider } from './app/toast/ToastContext'
import ToastContainer from './components/Toast/ToastContainer'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <LanguageProvider>
        <ToastProvider>
          <App />
          <ToastContainer />
        </ToastProvider>
      </LanguageProvider>
    </AuthProvider>
  </StrictMode>,
)
