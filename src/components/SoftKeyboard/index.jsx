import styles from './index.module.less'
import NumberKeyboard from './NumberKeyboard'
import AlphabetKeyboard from './AlphabetKeyboard'
import LicensePlateKeyBoard from './LicensePlateKeyBoard'
import NumAlphabetKeyboard from './NumAlphabetKeyboard'
import LicensePlateAlphabetNumKeyBoard from './LicensePlateAlphabetNumKeyBoard'
import SymbolNumBoard from './SymbolNumBoard'
import { useEffect } from 'react'
import SafeicoPNG from '../../assets/safeico.png'

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
    theme,
    lastModeMemory,
    setCursorPosition,
    setShowSoftKeyboard,
    setKeyboardModeInner,
    licenseType,
    keyBoardTitle,
    checkModeTo,
    disOrder
}) => {

    useEffect(() => {
        let licensePlateDig = 7
        if (licenseType === 'green') {
            licensePlateDig = 8
        }
        if (inputValue.length > licensePlateDig) {
            // 绿牌切换时，若位数超出，则删除最后一位
            onInput('backspace')
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
            onSubmit && onSubmit(`${inputValue}`)
        } else if (e === 'change-number' || e === 'change-alphabet' || e === 'change-numAlphabet' || e === 'change-symbolNum') {
            // 提交
            switch (e) {
                case 'change-number': {
                    setKeyboardModeInner('number')
                    break
                }
                case 'change-alphabet': {
                    setKeyboardModeInner('alphabet')
                    break
                }
                case 'change-numAlphabet': {
                    setKeyboardModeInner('numAlphabet')
                    break
                }
                case 'change-symbolNum': {
                    setKeyboardModeInner('symbolNum')
                    break
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
                <NumberKeyboard
                    mode={mode}
                    lastModeMemory={lastModeMemory}
                    theme={theme}
                    showButton={showButton}
                    buttonText={buttonText}
                    onInput={onInput}
                    disOrder={disOrder}
                />
            )
        }
        if (mode === 'alphabet') {
            return (
                <AlphabetKeyboard
                    theme={theme}
                    checkModeTo={checkModeTo}
                    showButton={showButton}
                    buttonText={buttonText}
                    isCapitalized={isCapitalized}
                    lastModeMemory={lastModeMemory}
                    onInput={onInput}
                />
            )
        }
        if (mode === 'numAlphabet') {
            return (
                <NumAlphabetKeyboard
                    checkModeTo={checkModeTo}
                    theme={theme}
                    showButton={showButton}
                    buttonText={buttonText}
                    onInput={onInput}
                    isCapitalized={isCapitalized}
                    mode={mode}
                />
            )
        }
        if (mode === 'symbolNum') {
            return (
                <SymbolNumBoard
                    onInput={onInput}
                    theme={theme}
                    showButton={showButton}
                    buttonText={buttonText}
                    lastModeMemory={lastModeMemory}
                />
            )
        }
        if (mode === 'licensePlate' && inputValue.length >= 1) {
            return (
                <LicensePlateAlphabetNumKeyBoard
                    onInput={onInput}
                    theme={theme}
                />
            )
        } else if (mode === 'licensePlate') {
            return (
                <LicensePlateKeyBoard
                    onInput={onInput}
                    theme={theme}
                />
            )
        }
        if (mode === 'verificationCode') {
            const { onlyCapitalized } = verificationCodeConfig
            if (verificationCodeConfig.mode.length === 1 && verificationCodeConfig.mode[0] === 'number') {
                return (
                    <NumberKeyboard
                        onInput={onInput}
                        mode={mode}
                        theme={theme}
                        showButton={showButton}
                        buttonText={buttonText}
                    />
                )
            } else if (verificationCodeConfig.mode.length === 1 && verificationCodeConfig.mode[0] === 'alphabet') {
                return (
                    <AlphabetKeyboard
                        isCapitalized={onlyCapitalized ? true : isCapitalized}
                        onInput={onInput}
                    />
                )
            } else {
                return (
                    <NumAlphabetKeyboard
                        onInput={onInput}
                        mode={mode}
                        isCapitalized={onlyCapitalized ? true : isCapitalized}
                    />
                )
            }

        }
    }
    const renderToolbar = () => {
        return showHide && (
            <div className={styles.toolbar}>
                <div className={styles.keyboardTitle} >
                    <img src={SafeicoPNG} />
                    {keyBoardTitle}
                </div>
                <div className={styles.closeBar} style={{ color: theme || '#1677FF' }} onClick={() => onHide()}>完成</div>
            </div>
        )
    }

    return show && (
        <div className={styles.softKeyboard} ref={softKeyboardRef} onClick={(e) => e.stopPropagation()}>
            {renderToolbar()}
            {renderKeyboard()}
        </div>
    )
}

export default SoftKeyboard