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
        // 修改键盘模式时初始化
        setInputValue('')
    }, [mode])
    const onInput = (e) => {
        if (e === 'backspace') {
            const newValue = inputValue.slice(0, inputValue.length - 1)
            setInputValue(newValue)
        } else if (e === 'capitalization') {
            setIsCapitalized(!isCapitalized)
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
                const { length, autocommit } = verificationCodeConfig
                if (autocommit && inputValue.length === length - 1) {
                    // 自动提交
                    onSubmit && onSubmit(`${inputValue}${e}`)
                }
                if (inputValue.length >= length) {
                    // 超出位数则舍弃
                    return
                }
            }
            const newValue = `${inputValue}${e}`
            setInputValue(newValue)
        }
    }
    const renderKeyboard = (keyboardMode) => {
        if (mode === 'number') {
            return (
                <NumberKeyboard onInput={onInput} />
            )
        }
        if (mode === 'alphabet') {
            return (
                <AlphabetKeyboard isCapitalized={isCapitalized} onInput={onInput} />
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
            {renderKeyboard(mode)}
        </div>
    )
}

export default SoftKeyboard