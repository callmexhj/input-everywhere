import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import InputEverywhere from './App.jsx'
import { Radio } from 'antd'
import './index.css'

const keyboardTypeOptions = [
  {
    label: '纯数字',
    value: 'number',
  },
  {
    label: '纯字母',
    value: 'alphabet',
  }
]

const hideStatus = [
  {
    label: '是',
    value: true,
  },
  {
    label: '否',
    value: false,
  }
]

const onFocus = () => {
  console.log('focus')
}

const onBlur = () => {
  console.log('blur')
}

const OptionPicker = ({ keyboardMode, setKeyboardMode }) => {
  const onKeyboardModeChanged = ({ target: { value } }) => {
    setKeyboardMode(value)
  }
  return (
    <Radio.Group size="large" buttonStyle="solid" options={keyboardTypeOptions} onChange={onKeyboardModeChanged} value={keyboardMode} optionType="button" />
  )
}

const HidePicker = ({ isShowHide, setIsShowHide }) => {
  const onHideChanged = ({ target: { value } }) => {
    setIsShowHide(value)
  }
  return (
    <Radio.Group size="large" buttonStyle="solid" options={hideStatus} optionType="button" value={isShowHide} onChange={onHideChanged} />
  )
}

const TestDemoPage = () => {
  const [keyboardMode, setKeyboardMode] = useState('number')
  const [isShowHide, setIsShowHide] = useState(false)
  return (
    <>
      <InputEverywhere size={'big'} keyboardMode={keyboardMode} showHide={isShowHide} onFocus={onFocus} onBlur={onBlur} />
      <div style={{ marginTop: 20 }}>
        <span>键盘类型：</span>
        <OptionPicker keyboardMode={keyboardMode} setKeyboardMode={setKeyboardMode} />
      </div>
      <div style={{ marginTop: 20 }}>
        <span>是否显示隐藏按钮：</span>
        <HidePicker isShowHide={isShowHide} setIsShowHide={setIsShowHide} />
      </div>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TestDemoPage />
  </StrictMode>,
)
