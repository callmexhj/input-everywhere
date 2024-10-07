import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import InputEverywhere from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InputEverywhere size={'big'} />
  </StrictMode>,
)
