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
  },
  {
    label: '数字字母',
    value: 'numAlphabet',
  },
  {
    label: '车牌',
    value: 'licensePlate'
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

const sizeOptions = [
  {
    label: '大',
    value: 'big',
  },
  {
    label: '中',
    value: 'default',
  },
  {
    label: '小',
    value: 'small',
  }
]

const licenseTypeOptions = [
  {
    label: '绿牌',
    value: 'green',
  },
  {
    label: '默认',
    value: 'default',
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

const SizePicker = ({ size, setSize }) => {
  const onSizeChanged = ({ target: { value } }) => {
    setSize(value)
  }
  return (
    <Radio.Group size="large" buttonStyle="solid" options={sizeOptions} optionType="button" value={size} onChange={onSizeChanged} />
  )
}

const LicenseTypePicker = ({ licenseType, setLicenseType }) => {
  const onLicenseTypeChanged = ({ target: { value } }) => {
    setLicenseType(value)
  }
  return (
    <Radio.Group size="large" buttonStyle="solid" options={licenseTypeOptions} optionType="button" value={licenseType} onChange={onLicenseTypeChanged} />
  )
}

const TestDemoPage = () => {
  const [keyboardMode, setKeyboardMode] = useState('number')
  const [isShowHide, setIsShowHide] = useState(false)
  const [size, setSize] = useState('big')
  const [licenseType, setLicenseType] = useState('default')
  return (
    <>
      <InputEverywhere size={size} keyboardMode={keyboardMode} showHide={isShowHide} onFocus={onFocus} onBlur={onBlur} licenseType={licenseType} />
      <div style={{ marginTop: 20 }}>
        <span>键盘类型：</span>
        <OptionPicker keyboardMode={keyboardMode} setKeyboardMode={setKeyboardMode} />
      </div>
      <div style={{ marginTop: 20 }}>
        <span>是否显示隐藏按钮：</span>
        <HidePicker isShowHide={isShowHide} setIsShowHide={setIsShowHide} />
      </div>
      <div style={{ marginTop: 20 }}>
        <span>输入框Size：</span>
        <SizePicker size={size} setSize={setSize} />
      </div>
      {
        keyboardMode === 'licensePlate' && (<div style={{ marginTop: 20 }}>
          <span>车牌类型：</span>
          <LicenseTypePicker licenseType={licenseType} setLicenseType={setLicenseType} />
        </div>)
      }
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TestDemoPage />
  </StrictMode>,
)
