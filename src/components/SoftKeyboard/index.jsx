import styles from './index.module.less'
import NumberKeyboard from './NumberKeyboard'
import AlphabetKeyboard from './AlphabetKeyboard'
import LicensePlateKeyBoard from './LicensePlateKeyBoard'
import NumAlphabetKeyboard from './NumAlphabetKeyboard'
import { FullscreenExitOutlined } from '@ant-design/icons'
import { useEffect } from 'react'

const SoftKeyboard = ({
    show,
    softKeyboardRef,
    mode,
    inputValue,
    setInputValue,
    isCapitalized,
    setIsCapitalized,
    showHide,
    onHide,
    verificationCodeConfig,
    onSubmit,
    cursorPosition,
    cursorConfig,
    showButton,
    buttonText,
    setCursorPosition,
    setShowSoftKeyboard,
    setKeyboardModeInner,
    licenseType
}) => {

    useEffect(() => {
        let licensePlateDig = 7
        if (licenseType === 'green') {
            licensePlateDig = 8
        }
        if (inputValue.length > licensePlateDig) {
            // 绿牌切换时，若位数超出，则删除最后一位
            const inputTemp = inputValue.slice(0, licensePlateDig)
            setInputValue(inputTemp)
        }
    }, [licenseType])

    useEffect(() => {
        // 修改键盘模式(车牌+验证码)时初始化
        if (['licensePlate', 'verificationCode'].indexOf(mode) !== -1) setInputValue('')
    }, [mode])
    const onInput = (e) => {
        if (e === 'backspace') {
            
            if (cursorConfig?.show) {
                const oldValue = inputValue?.split('')
                const newValue = [...oldValue.slice(0, cursorPosition - 1), ...oldValue.slice(cursorPosition)]
                setCursorPosition(cursorPosition - 1 < 0 ? 0 : cursorPosition - 1)
                setInputValue(newValue.join(''))
            } else {
                const newValue = inputValue.slice(0, inputValue.length - 1)
                setInputValue(newValue)
            }
            
        } else if (e === 'capitalization') {
            setIsCapitalized(!isCapitalized)
        } else if (e === 'submit') {
            // 提交
            onSubmit && onSubmit(`${inputValue}${e}`)
        } else if (e === 'change-alphabet') {
            // 提交
            switch (e) {
                case 'change-alphabet': {
                    setKeyboardModeInner('number')
                }
            }
        } else {
            if (mode === 'licensePlate') {
                let licensePlateDig = 7
                if (licenseType === 'green') {
                    licensePlateDig = 8
                }
                if (inputValue.length >= licensePlateDig) {
                    // 超出位数则舍弃
                    return
                }
            }
            if (mode === 'verificationCode') {
                const { length, autocommit, autoclose } = verificationCodeConfig
                if (autocommit && inputValue.length === length - 1) {
                    // 自动提交
                    onSubmit && onSubmit(`${inputValue}${e}`)
                    autoclose && setShowSoftKeyboard(false)
                }
                if (inputValue.length >= length) {
                    // 超出位数则舍弃
                    return
                }
            }
            if (cursorConfig?.show) {
                if (inputValue.length === 0) {
                    const newValue = `${inputValue}${e}`
                    setInputValue(newValue)
                    setCursorPosition(cursorPosition + 1 > newValue.length - 1 ? newValue.length : cursorPosition + 1)
                    return
                } else {
                    const oldValue = inputValue?.split('')
                    const newValue = [...oldValue.slice(0, cursorPosition), e, ...oldValue.slice(cursorPosition)]
                    setInputValue(newValue.join(''))
                    setCursorPosition(cursorPosition + 1 > newValue.length - 1 ? newValue.length : cursorPosition + 1)
                    return
                }
                
            } else {
                const newValue = `${inputValue}${e}`
                setInputValue(newValue)
            }
        }
    }
    const renderKeyboard = () => {
        if (mode === 'number') {
            return (
                <NumberKeyboard onInput={onInput} />
            )
        }
        if (mode === 'alphabet') {
            return (
                <AlphabetKeyboard showButton={showButton} buttonText={buttonText} isCapitalized={isCapitalized} onInput={onInput} />
            )
        }
        if (mode === 'numAlphabet') {
            return (
                <NumAlphabetKeyboard onInput={onInput} isCapitalized={isCapitalized} mode={mode} />
            )
        }
        if (mode === 'licensePlate' && inputValue.length >= 1) {
            return (
                <NumAlphabetKeyboard onInput={onInput} mode={mode} />
            )
        } else if (mode === 'licensePlate') {
            return (
                <LicensePlateKeyBoard onInput={onInput} />
            )
        }
        if (mode === 'verificationCode') {
            const { onlyCapitalized } = verificationCodeConfig
            if (verificationCodeConfig.mode.length === 1 && verificationCodeConfig.mode[0] === 'number') {
                return (
                    <NumberKeyboard onInput={onInput} />
                )
            } else if (verificationCodeConfig.mode.length === 1 && verificationCodeConfig.mode[0] === 'alphabet') {
                return (
                    <AlphabetKeyboard isCapitalized={onlyCapitalized ? true : isCapitalized} onInput={onInput} />
                )
            } else {
                return (
                    <NumAlphabetKeyboard onInput={onInput} mode={mode} isCapitalized={onlyCapitalized ? true : isCapitalized} />
                )
            }

        }
    }
    const renderToolbar = () => {
        return showHide && (
            <div className={styles.toolbar}>
                <div></div>
                <FullscreenExitOutlined onClick={onHide} style={{ fontSize: '22px' }} />
            </div>
        )
    }
    // const handleTouchMove = (e) => {
    //     e.preventDefault()
    //     e.stopPropagation()
    // }

    return show && (
        <div className={styles.softKeyboard} ref={softKeyboardRef} onClick={(e) => e.stopPropagation()}>
            {renderToolbar()}
            {renderKeyboard()}
        </div>
    )
}

export default SoftKeyboard