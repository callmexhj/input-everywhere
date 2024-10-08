import { memo, useState, useRef } from 'react'
import InputContent from './components/InputContent'
import SoftKeyboard from './components/SoftKeyboard'
function InputEverywhere({ size, onFocus, onBlur, keyboardMode }) {
  const [showSoftKeyboard, setShowSoftKeyboard] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const softKeyboardRef = useRef(null)
  const handleOnFocus = () => {
    setShowSoftKeyboard(true)
    onFocus && onFocus()
  }
  const handleOnBlur = () => {
    setShowSoftKeyboard(false)
    onBlur && onBlur()
  }
  const inputContentProps = {
    size,
    softKeyboardRef,
    inputValue,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur
  }
  const softKeyboardProps = {
    show: showSoftKeyboard,
    mode: keyboardMode,
    softKeyboardRef,
    inputValue,
    setInputValue
  }
  return (
    <>
      <InputContent { ...inputContentProps } />
      <SoftKeyboard { ...softKeyboardProps } />
    </>
  )
}

export default memo(InputEverywhere)
