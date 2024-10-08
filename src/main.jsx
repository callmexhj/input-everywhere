import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import InputEverywhere from './App.jsx'
import './index.css'

const onFocus = () => {
  console.log('focus')
}

const onBlur = () => {
  console.log('blur')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InputEverywhere size={'big'} keyboardMode={'number'} onFocus={onFocus} onBlur={onBlur} />
  </StrictMode>,
)
