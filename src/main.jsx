import { StrictMode, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import InputEverywhere from './App.jsx'
import { Radio, Col, InputNumber, Row, Slider, Checkbox, Switch, Input, ColorPicker, Select } from 'antd'
import './index.css'
const TestDemoPage = () => {
  const [keyboardMode, setKeyboardMode] = useState('number')
  const [isShowHide, setIsShowHide] = useState(true)
  const [size, setSize] = useState('big')
  const [disOrder, setDisOrder] = useState(false)
  const [licenseType, setLicenseType] = useState('default')
  const [verificationCodeConfig, setVerificationCodeConfig] = useState({
    length: 6,
    mode: ['number', 'alphabet'],
    onlyCapitalized: true,
    autocommit: true,
    autoclose: true
  })
  const [cursorConfig, setCursorConfig] = useState({
    show: true,
    blink: true
  })
  const [regular, setRegular] = useState('/^.{0,4}$/')
  const testRef = useRef(null)
  const [showButton, setShowButton] = useState(true)
  const [theme, setTheme] = useState('#1677FF')
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
    // testRef.current.style.bottom = '100px'
    // testRef.current.style.position = 'relative'
  }

  const onBlur = () => {
    console.log('blur')
    // testRef.current.style.bottom = null
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
      <Radio.Group size="large" buttonStyle="solid" options={hideStatus} value={isShowHide} onChange={onHideChanged} />
    )
  }

  const SizePicker = ({ size, setSize }) => {
    const onSizeChanged = ({ target: { value } }) => {
      setSize(value)
    }
    return (
      <Radio.Group size="large" buttonStyle="solid" options={sizeOptions} value={size} onChange={onSizeChanged} />
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

  const ButtonSetting = ({ showButton, setShowButton }) => {

    const onButtonChanged = (e) => {
      setShowButton(e)
    }
    return (
      <Switch checked={showButton} onChange={onButtonChanged} />
    )
  }

  const DisOrderSetting = ({disOrder,setDisOrder})=>{
    const onDisOrderChanged = (e)=>{
      setDisOrder(e)
    }
    return(
      <Switch checked={disOrder} onChange={onDisOrderChanged}/>
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

    const onAutocloseChanged = (autoclose) => {
      setVerificationCodeConfig({
        ...verificationCodeConfig,
        autoclose
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
          <span>是否仅大写（仅当验证码选择字母键盘后生效）：</span>
          <Switch checked={verificationCodeConfig.onlyCapitalized} onChange={onOnlyCapitalizedChanged} />
        </div>
        <div>
          <span>是否在长度达标后自动提交：</span>
          <Switch checked={verificationCodeConfig.autocommit} onChange={onAutocommitChanged} />
        </div>
        <div>
          <span>是否在自动提交后收起键盘：</span>
          <Switch checked={verificationCodeConfig.autoclose} onChange={onAutocloseChanged} />
        </div>
      </>
    )
  }

  const onRegular = (e) => {
    // console.log(e)
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

  const RegularVerification = ({ regular, setRegular }) => {
    return (
      <Input value={regular} onChange={(e) => setRegular(e.target.value)} />
    )
  }
  const ThemePicker = ({ theme, setTheme }) => {
    return (
      <Select 
      style={{ width: 140 }}
        options={[
          { value: '#1677ff' },
          { value: '#52c41a' },
          { value: '#faad14' },
          { value: '#fa8c16' },
          { value: '#2f54eb' },
          { value: '#722ed1' }
        ]}
        value={theme}
        onChange={(e) => setTheme(e)}
        labelRender={({value}) => {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 20, height: 20, background: value, marginRight: 10 }}></div>
              { value }
            </div>
          )
        }}
        optionRender={(option) => {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 20, height: 20, background: option.data.value, marginRight: 10 }}></div>
              { option.data.value }
            </div>
          )
        }}
      />
    )
  }
  return (
    <div ref={testRef}>
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
        regular={regular}
        showButton={showButton}
        onRegular={onRegular}
        buttonText={'确认'}
        theme={theme}
        disOrder={disOrder}
        keyBoardTitle={'传化安全键盘'}
      />
      <div style={{ marginTop: 20 }}>
        <span>输入类型：</span>
        <OptionPicker keyboardMode={keyboardMode} setKeyboardMode={setKeyboardMode} />
      </div>
      <div style={{ marginTop: 20 }}>
        <span>是否乱序（仅纯数字键盘）：</span>
        <DisOrderSetting disOrder={disOrder} setDisOrder={setDisOrder} />
      </div>
      <div style={{ marginTop: 20 }}>
        <span>是否显示隐藏按钮：</span>
        <HidePicker isShowHide={isShowHide} setIsShowHide={setIsShowHide} />
      </div>
      <div style={{ marginTop: 20 }}>
        <span>输入框Size：</span>
        <SizePicker size={size} setSize={setSize} />
      </div>
      <div style={{ marginTop: 20 }}>
        <span>展示按钮：</span>
        <ButtonSetting showButton={showButton} setShowButton={setShowButton} />
      </div>
      <div style={{ marginTop: 20 }}>
        <span>主题：</span>
        <ThemePicker theme={theme} setTheme={setTheme} />
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
      <div style={{ marginTop: 20 }}>
        <span>正则校验：</span>
        <RegularVerification regular={regular} setRegular={setRegular} />
      </div>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TestDemoPage />
  </StrictMode>,
)
