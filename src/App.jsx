import { memo, useState, useRef, useEffect } from 'react'
import InputContent from './components/InputContent'
import SoftKeyboard from './components/SoftKeyboard'
function InputEverywhere({
  size,
  onFocus,
  onBlur,
  keyboardMode,
  showHide,
  licenseType,
  onSubmit,
  cursorConfig,
  regular,
  onRegular,
  showButton,
  buttonText,
  theme,
  verificationCodeConfig
}) {
  const [showSoftKeyboard, setShowSoftKeyboard] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isCapitalized, setIsCapitalized] = useState(false)
  const softKeyboardRef = useRef(null)
  const [cursorPosition, setCursorPosition] = useState(1)
  const [keyBoardModeInner, setKeyboardModeInner] = useState(keyboardMode)

  useEffect(() => {
    // 键盘切换初始化
    setKeyboardModeInner(keyboardMode)
  }, [keyboardMode])

  const handleOnFocus = () => {
    setShowSoftKeyboard(true)
    onFocus && onFocus()
  }

  const handleOnBlur = () => {
    setShowSoftKeyboard(false)
    onBlur && onBlur()
    if (regular?.length > 0) {
      onRegular && onRegular(checkReg())
    }
  }

  const onHide = () => {
    setShowSoftKeyboard(false)
  }

  const handleSubmit = (e) => {
    onSubmit && onSubmit(e)
  }

  const checkReg = (e) => {
    if (regular && regular.length > 0) {
      const regexPattern = new RegExp(regular)
      console.log(inputValue, regular)
      const result = regexPattern.test(inputValue)
      return result
    }
  }

  const inputContentProps = {
    mode: keyBoardModeInner,
    size,
    softKeyboardRef,
    inputValue,
    licenseType,
    verificationCodeConfig,
    cursorConfig,
    cursorPosition,
    setCursorPosition,
    setInputValue,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur
  }
  const softKeyboardProps = {
    show: showSoftKeyboard,
    mode: keyBoardModeInner,
    softKeyboardRef,
    inputValue,
    isCapitalized,
    showHide,
    licenseType,
    verificationCodeConfig,
    cursorConfig,
    cursorPosition,
    showButton,
    buttonText,
    theme,
    setCursorPosition,
    onHide,
    setIsCapitalized,
    setInputValue,
    setShowSoftKeyboard,
    onSubmit: handleSubmit,
    setKeyboardModeInner
  }
  return (
    <>
      <InputContent { ...inputContentProps } />
      <SoftKeyboard { ...softKeyboardProps } />
    </>
  )
}

export default memo(InputEverywhere)
