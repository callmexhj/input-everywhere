import { memo, useState, useRef, useEffect } from 'react'
import InputContent from './components/InputContent'
import SoftKeyboard from './components/SoftKeyboard'
function InputEverywhere({
  size = 'big',
  keyboardMode = 'number',
  showHide = true,
  keyBoardTitle = '传化安全键盘',
  showButton = true,
  buttonText = '确认',
  theme = '#1677FF',
  licenseType = 'default',
  className = null,
  style = null,
  disOrder = false,
  regular = null,
  cursorConfig = {
    show: true,
    blink: true
  },
  verificationCodeConfig = {
    mode: ['number', 'alphabet'],
    length: 6,
    onlyCapitalized: true,
    autocommit: false,
    autoclose: true
  },
  onFocus = () => {},
  onBlur = () => {},
  onSubmit = () => {},
  onRegular = () => {}
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
