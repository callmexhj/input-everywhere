import { memo, useState, useRef } from 'react'
import InputContent from './components/InputContent'
import SoftKeyboard from './components/SoftKeyboard'
function InputEverywhere({ size, onFocus, onBlur, keyboardMode, showHide, licenseType }) {
  const [showSoftKeyboard, setShowSoftKeyboard] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isCapitalized, setIsCapitalized] = useState(false)
  const softKeyboardRef = useRef(null)

  const handleOnFocus = () => {
    setShowSoftKeyboard(true)
    onFocus && onFocus()
  }

  const handleOnBlur = () => {
    setShowSoftKeyboard(false)
    onBlur && onBlur()
  }

  const onHide = () => {
    setShowSoftKeyboard(false)
  }

  const inputContentProps = {
    mode: keyboardMode,
    size,
    softKeyboardRef,
    inputValue,
    licenseType,
    setInputValue,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur
  }
  const softKeyboardProps = {
    show: showSoftKeyboard,
    mode: keyboardMode,
    softKeyboardRef,
    inputValue,
    isCapitalized,
    showHide,
    licenseType,
    onHide,
    setIsCapitalized,
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
