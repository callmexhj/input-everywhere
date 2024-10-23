import { StrictMode, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import InputEverywhere from './App.jsx'
import { Radio, Col, InputNumber, Row, Slider, Checkbox, Switch, Select } from 'antd'
import './index.css'
const TestDemoPage = () => {
  const [keyboardMode, setKeyboardMode] = useState('number')
  const [isShowHide, setIsShowHide] = useState(true)
  const [size, setSize] = useState('big')
  const [disOrder, setDisOrder] = useState(false)
  const [licenseType, setLicenseType] = useState('default')
  const [showClear, setShowClear] = useState(true)
  const [disabled, setDisabled] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
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
  const [regular, setRegular] = useState(0)
  const regularList = [/tf/, /^.{6,}$/, /^\d{6,}$/]
  const testRef = useRef(null)
  const [showButton, setShowButton] = useState(true)
  const [theme, setTheme] = useState('#1677FF')
  const [checkModeTo, setCheckModeTo] = useState('symbolNum')
  const [regularPlaceArr, setRegularPlaceArr] = useState(['blur', 'submit'])
  const [isHideAfterSubmit, setIsHideAfterSubmit] = useState(true)
  const keyboardTypeOptions = [
    {
      label: '纯数字',
      value: 'number',
    },
    {
      label: '金额(数字加小数点)',
      value: 'money'
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
    },
    {
      label: '数字符号',
      value: 'symbolNum'
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

  const regularOptions = [
    {
      label: '是否包含tf（/tf/）',
      value: 0,
    },
    {
      label: '长度是否大于5（/^.{6,}$/）',
      value: 1,
    },
    {
      label: '是否长度大于5且仅包含数字（/^\d{6,}$/）',
      value: 2,
    },
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

  const onRegular = (e) => {
    if (e) {
      console.log('校验成功')
    } else {
      console.log('校验失败')
    }
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
      <Radio.Group buttonStyle="solid" options={licenseTypeOptions} optionType="button" value={licenseType} onChange={onLicenseTypeChanged} />
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

  const DisOrderSetting = ({ disOrder, setDisOrder }) => {
    const onDisOrderChanged = (e) => {
      setDisOrder(e)
    }
    return (
      <Switch checked={disOrder} onChange={onDisOrderChanged} />
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
      <Select
        style={{ width: 240 }}
        options={[...regularOptions]}
        value={regular}
        onChange={(e) => setRegular(e)}
      />
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
        labelRender={({ value }) => {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 20, height: 20, background: value, marginRight: 10 }}></div>
              {value}
            </div>
          )
        }}
        optionRender={(option) => {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 20, height: 20, background: option.data.value, marginRight: 10 }}></div>
              {option.data.value}
            </div>
          )
        }}
      />
    )
  }
  const checkModeOptions = [
    {
      label: '纯数字',
      value: 'number',
    },
    {
      label: '数字+符号',
      value: 'symbolNum',
    }
  ]
  const CheckModelTo = ({ checkModeTo, setCheckModeTo }) => {
    const onModeChanged = ({ target: { value } }) => {
      setCheckModeTo(value)
    }
    return (
      <Radio.Group options={checkModeOptions} onChange={onModeChanged} value={checkModeTo} />
    )
  }
  const ClearSetting = ({ showClear, setShowClear }) => {

    const onClearChanged = (e) => {
      setShowClear(e)
    }
    return (
      <Switch checked={showClear} onChange={onClearChanged} />
    )
  }
  const regularPlaceOption = [
    {
      value: 'blur',
      label: 'blur'
    },
    {
      value: 'submit',
      label: 'submit'
    }
  ]
  const RegularPlace = ({ regularPlaceArr, setRegularPlaceArr }) => {
    const onPlaceChanged = (e) => {
      setRegularPlaceArr(e)
    }
    return (
      <Checkbox.Group options={regularPlaceOption} onChange={onPlaceChanged} value={regularPlaceArr} />
    )
  }
  const DisableSetting = ({ disabled, setDisabled }) => {
    return (
      <Switch checked={disabled} onChange={setDisabled} />
    )
  }
  const HideAfterSubmit = ({ isHideAfterSubmit, setIsHideAfterSubmit }) => {
    return (
      <Switch checked={isHideAfterSubmit} onChange={setIsHideAfterSubmit} />
    )
  }
  const PasswordModeSetting = ({ passwordMode, setPasswordMode }) => {
    return (
      <Switch checked={passwordMode} onChange={setPasswordMode} />
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
        regular={regularList[regular]}
        showButton={showButton}
        onRegular={onRegular}
        buttonText={'确认'}
        theme={theme}
        disOrder={disOrder}
        keyBoardTitle={'传化安全键盘'}
        checkModeTo={checkModeTo}
        showClear={showClear}
        regularPlace={regularPlaceArr}
        disabled={disabled}
        hideAfterSubmit={isHideAfterSubmit}
        password={isPassword}
        // foucs={true}
        // defaultValue={'xxxxxxxxxx'}
      />
      <div style={{ marginTop: 20 }}>
        <span>输入类型：</span>
        <OptionPicker keyboardMode={keyboardMode} setKeyboardMode={setKeyboardMode} />
      </div>
      <div style={{ marginTop: 20 }}>
        <span>是否显示完成按钮：</span>
        <HidePicker isShowHide={isShowHide} setIsShowHide={setIsShowHide} />
      </div>
      <div style={{ marginTop: 20 }}>
        <span>主题：</span>
        <ThemePicker theme={theme} setTheme={setTheme} />
      </div>
      <div style={{ marginTop: 20 }}>
        <span>正则校验：</span>
        <RegularVerification regular={regular} setRegular={setRegular} />
      </div>
      <div style={{ marginTop: 20 }}>
        <span>正则校验时机：</span>
        <RegularPlace regularPlaceArr={regularPlaceArr} setRegularPlaceArr={setRegularPlaceArr} />
      </div>
      <div style={{ marginTop: 20 }}>
        <span>是否禁用键盘：</span>
        <DisableSetting disabled={disabled} setDisabled={setDisabled} />
      </div>
      {
        keyboardMode === 'number' && (
          <div style={{ marginTop: 20 }}>
            <span>是否乱序（仅纯数字键盘）：</span>
            <DisOrderSetting disOrder={disOrder} setDisOrder={setDisOrder} />
          </div>
        )
      }
      {
        (
          keyboardMode === 'number'
          || keyboardMode === 'alphabet'
          || keyboardMode === 'numAlphabet'
          || keyboardMode === 'symbolNum'
        ) &&
        (
          <>
            <div style={{ marginTop: 20 }}>
              <span>切换键盘按钮指向：</span>
              <CheckModelTo checkModeTo={checkModeTo} setCheckModeTo={setCheckModeTo} />
            </div>
            <div style={{ marginTop: 20 }}>
              <span>submit后是否隐藏键盘：</span>
              <HideAfterSubmit isHideAfterSubmit={isHideAfterSubmit} setIsHideAfterSubmit={setIsHideAfterSubmit} />
            </div>
            <div style={{ marginTop: 20 }}>
              <span>是否展示清除按钮：</span>
              <ClearSetting showClear={showClear} setShowClear={setShowClear} />
            </div>
            <div style={{ marginTop: 20 }}>
              <span>输入框Size：</span>
              <SizePicker size={size} setSize={setSize} />
            </div>
            <div style={{ marginTop: 20 }}>
              <span>密码模式：</span>
              <PasswordModeSetting passwordMode={isPassword} setPasswordMode={setIsPassword} />
            </div>
            <div style={{ marginTop: 20 }}>
              <span>展示提交按钮：</span>
              <ButtonSetting showButton={showButton} setShowButton={setShowButton} />
            </div>
            <div style={{ marginTop: 20 }}>
              <span>光标配置：</span>
              <CursorConfig cursorConfig={cursorConfig} setCursorConfig={setCursorConfig} />
            </div>
          </>
        )
      }
      {
        keyboardMode === 'licensePlate' && (<div style={{ marginTop: 20 }}>
          <span>车牌类型：</span>
          <LicenseTypePicker licenseType={licenseType} setLicenseType={setLicenseType} />
        </div>)
      }
      {
        keyboardMode === 'verificationCode' &&
        (
          <div style={{ marginTop: 20 }}>
            <span>验证码配置：</span>
            <VerificationCodePicker verificationCodeConfig={verificationCodeConfig} setVerificationCodeConfig={setVerificationCodeConfig} />
          </div>
        )
      }
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TestDemoPage />
  </StrictMode>,
)
