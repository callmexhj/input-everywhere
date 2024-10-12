import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import InputEverywhere from './App.jsx'
import { Radio, Col, InputNumber, Row, Slider, Checkbox, Switch } from 'antd'
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
  },
  {
    label: '验证码',
    value: 'verificationCode'
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

const onSubmit = (value) => {
  console.log('submit', value)
}

const OptionPicker = ({ keyboardMode, setKeyboardMode }) => {
  const onKeyboardModeChanged = ({ target: { value } }) => {
    setKeyboardMode(value)
  }
  return (
    <Radio.Group size="large" buttonStyle="solid" options={keyboardTypeOptions} onChange={onKeyboardModeChanged} value={keyboardMode} />
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

const VerificationCodePicker = ({ verificationCodeConfig, setVerificationCodeConfig }) => {
  const modeOptions = [
    {
      label: '数字',
      value: 'number',
    },
    {
      label: '字母',
      value: 'alphabet',
    }
  ]
  const onModeChanged = (mode) => {
    setVerificationCodeConfig({
      ...verificationCodeConfig,
      mode
    })
  }
  const onLengthChange = (length) => {
    setVerificationCodeConfig({
      ...verificationCodeConfig,
      length
    })
  }
  const onOnlyCapitalizedChanged = (onlyCapitalized) => {
    setVerificationCodeConfig({
      ...verificationCodeConfig,
      onlyCapitalized
    })
  }
  const onAutocommitChanged = (autocommit) => {
    setVerificationCodeConfig({
      ...verificationCodeConfig,
      autocommit
    })
  }
  return (
    <>
      <div>
        <span>长度</span>
        <Row>
          <Col span={12}>
            <Slider
              min={4}
              max={10}
              onChange={onLengthChange}
              value={verificationCodeConfig.length}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={1}
              max={20}
              style={{
                margin: '0 16px',
              }}
              value={verificationCodeConfig.length}
              onChange={onLengthChange}
            />
          </Col>
        </Row>
      </div>
      <div>
        <span>验证码类型：</span>
        <Checkbox.Group options={modeOptions} onChange={onModeChanged} value={verificationCodeConfig.mode} />
      </div>
      <div>
        <span>是否仅大写（仅当字母模式选中后生效）：</span>
        <Switch checked={verificationCodeConfig.onlyCapitalized} onChange={onOnlyCapitalizedChanged} />
      </div>
      <div>
        <span>是否在长度达标后自动提交：</span>
        <Switch checked={verificationCodeConfig.autocommit} onChange={onAutocommitChanged} />
      </div>
    </>
  )
}

const CursorConfig = ({ cursorConfig, setCursorConfig }) => {
  const onCursorShowChanged = (show) => {
    setCursorConfig({
      ...cursorConfig,
      show
    })
  }
  const onBlinkChanged = (blink) => {
    setCursorConfig({
      ...cursorConfig,
      blink
    })
  }
  return (
    <>
      <div>
        <span>是否显示文本输入框光标：</span>
        <Switch checked={cursorConfig.show} onChange={onCursorShowChanged} />
      </div>
      <div>
        <span>光标是否闪烁：</span>
        <Switch checked={cursorConfig.blink} onChange={onBlinkChanged} />
      </div>
    </>
  )
}

const TestDemoPage = () => {
  const [keyboardMode, setKeyboardMode] = useState('number')
  const [isShowHide, setIsShowHide] = useState(false)
  const [size, setSize] = useState('big')
  const [licenseType, setLicenseType] = useState('default')
  const [verificationCodeConfig, setVerificationCodeConfig] = useState({
    length: 6,
    mode: ['number', 'alphabet'],
    onlyCapitalized: true,
    autocommit: true
  })
  const [cursorConfig, setCursorConfig] = useState({
    show: true,
    blink: true
  })
  return (
    <>
      <InputEverywhere
        size={size}
        keyboardMode={keyboardMode}
        showHide={isShowHide}
        onFocus={onFocus}
        onBlur={onBlur}
        onSubmit={onSubmit}
        licenseType={licenseType}
        verificationCodeConfig={verificationCodeConfig}
        cursorConfig={cursorConfig}
      />
      <div style={{ marginTop: 20 }}>
        <span>输入类型：</span>
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
      <div style={{ marginTop: 20 }}>
        <span>验证码配置：</span>
        <VerificationCodePicker verificationCodeConfig={verificationCodeConfig} setVerificationCodeConfig={setVerificationCodeConfig} />
      </div>
      <div style={{ marginTop: 20 }}>
        <span>光标配置：</span>
        <CursorConfig cursorConfig={cursorConfig} setCursorConfig={setCursorConfig} />
      </div>
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TestDemoPage />
  </StrictMode>,
)
