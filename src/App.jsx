import { useState, useRef, useEffect } from 'react'
import InputContent from './components/InputContent'
import SoftKeyboard from './components/SoftKeyboard'
function InputEverywhere({
  defaultValue = '',
  size = 'big',
  keyboardMode = 'number',
  showHide = true,
  keyBoardTitle = '传化安全键盘',
  showClear = true,
  showButton = true,
  buttonText = '确认',
  theme = '#1677FF',
  licenseType = 'default',
  checkModeTo = 'symbolNum',
  className = null,
  style = null,
  disOrder = false,
  regular = null,
  regularPlace = [],
  foucs = false,
  disabled = false,
  hideAfterSubmit = true,
  password = false,
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
  onFocus = () => { },
  onBlur = () => { },
  onSubmit = () => { },
  onRegular = () => { },
  onChange = () => { }
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
  const regularPlaceRef = useRef(regularPlace)
  // const givenValueRef = useRef(defaultValue)

  useEffect(() => {
    if (keyBoardModeInner === 'licensePlate') {
      let licensePlateDig = 7
      if (licenseType === 'green') {
        licensePlateDig = 8
      }
      const newValue = defaultValue.slice(0, licensePlateDig)
      setInputValue(newValue)
      setCursorPosition(newValue.length)
      return
    } else if (keyBoardModeInner === 'verificationCode') {
      let codeDig = 0
      if (verificationCodeConfig.length && verificationCodeConfig.length > 0) {
        codeDig = verificationCodeConfig.length
      }
      const newValue = defaultValue.slice(0, codeDig)
      setInputValue(newValue)
      setCursorPosition(newValue.length)
      return
    }
    setInputValue(defaultValue)
    setCursorPosition(defaultValue.length)
  }, [defaultValue])

  useEffect(() => {
    regularPlaceRef.current = regularPlace
  }, [regularPlace])

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

  const onClear = () => {
    setInputValue('')
    setCursorPosition(0)
  }

  const handleOnFocus = () => {
    setShowSoftKeyboard(true)
    onFocus && onFocus()
  }

  useEffect(() => {
    checkTextValue.current = inputValue
    onChange && onChange(inputValue)
  }, [inputValue])

  const handleOnBlur = () => {
    setShowSoftKeyboard(false)
    onBlur && onBlur()
    if (regularPlaceRef.current?.indexOf('blur') !== -1 && checkRule.current?.test) {
      onRegular && onRegular(checkReg(checkTextValue.current))
    }
  }

  const onHide = () => {
    setShowSoftKeyboard(false)
  }

  const handleSubmit = (e) => {
    onSubmit && onSubmit(e)
    if (regularPlaceRef.current?.indexOf('submit') !== -1 && checkRule.current?.test) {
      onRegular && onRegular(checkReg(checkTextValue.current))
    }
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
    showClear,
    foucs,
    disabled,
    password,
    onClear,
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
    checkModeTo,
    hideAfterSubmit,
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
    <div className={className} style={{ ...style }}>
      <InputContent {...inputContentProps} />
      <SoftKeyboard {...softKeyboardProps} />
    </div>
  )
}

export default InputEverywhere
