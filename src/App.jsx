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
  buttonText = '确认',
  theme,
  verificationCodeConfig,
  className,
  style,
  keyBoardTitle = '传化安全键盘',
  disOrder
}) {
  const [showSoftKeyboard, setShowSoftKeyboard] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isCapitalized, setIsCapitalized] = useState(false)
  const softKeyboardRef = useRef(null)
  const [cursorPosition, setCursorPosition] = useState(0)
  const [keyBoardModeInner, setKeyboardModeInner] = useState(keyboardMode)
  const [lastModeMemory, setLastModeMemory] = useState(null)
  const prevKeyBoardModeInnerRef = useRef('alphabet')
  const checkTextValue = useRef('')
  const checkRule = useRef(null)

  useEffect(() => {
    checkRule.current = regular
  }, [regular])

  useEffect(() => {
    // 键盘切换初始化
    setKeyboardModeInner(keyboardMode)
    prevKeyBoardModeInnerRef.current = keyboardMode
  }, [keyboardMode])

  useEffect(() => {
    setLastModeMemory(prevKeyBoardModeInnerRef.current)
    prevKeyBoardModeInnerRef.current = keyBoardModeInner
  }, [keyBoardModeInner])

  const handleOnFocus = () => {
    setShowSoftKeyboard(true)
    onFocus && onFocus()
  }

  useEffect(() => {
    checkTextValue.current = inputValue
  }, [inputValue])

  const handleOnBlur = () => {
    setShowSoftKeyboard(false)
    onBlur && onBlur()
    console.log(regular)
    if (checkRule.current?.test) {
      onRegular && onRegular(checkReg(checkTextValue.current))
    }
  }

  const onHide = () => {
    setShowSoftKeyboard(false)
  }

  const handleSubmit = (e) => {
    onSubmit && onSubmit(e)
  }

  const checkReg = (e) => {
    const regexPattern = new RegExp(checkRule.current)
    const result = regexPattern.test(e)
    return result
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
    showSoftKeyboard,
    setCursorPosition,
    setInputValue,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
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
    lastModeMemory,
    keyBoardTitle,
    setCursorPosition,
    onHide,
    setIsCapitalized,
    setInputValue,
    setShowSoftKeyboard,
    onSubmit: handleSubmit,
    setKeyboardModeInner,
    disOrder
  }
  return (
    <div className={className} style={{...style}}>
      <InputContent { ...inputContentProps } />
      <SoftKeyboard { ...softKeyboardProps } />
    </div>
  )
}

export default memo(InputEverywhere)
