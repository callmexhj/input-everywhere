import { useEffect, useRef, useState } from 'react'
import LicensePlate from './components/LicensePlate'
import VerificationCode from './components/VerificationCode'
import TextInput from './components/TextInput'

const InputContent = ({
    size,
    onFocus,
    onBlur,
    softKeyboardRef,
    inputValue,
    mode,
    licenseType,
    verificationCodeConfig,
    setInputValue,
    cursorConfig,
    cursorPosition,
    setCursorPosition,
}) => {
    const [isFocus, setFocus] = useState(false)
    const inputRef = useRef(null)
    const handleFocus = () => {
        setFocus(true)
        onFocus && onFocus()
    }
    useEffect(() => {
        // 模拟Blur事件
        const handleClickOutside = (event) => {
            if (inputRef.current && (!inputRef.current?.contains(event.target) && !softKeyboardRef.current?.contains(event.target))) {
                // 软键盘隐藏逻辑
                setFocus(false)
                onBlur()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const renderInputContent = () => {
        if (mode === 'licensePlate') {
            return <LicensePlate
                inputRef={inputRef}
                inputValue={inputValue}
                licenseType={licenseType}
                onFocus={handleFocus} 
            />
        } else if (mode === 'number' || mode === 'alphabet' || mode === 'numAlphabet') {
            return (
                <TextInput
                    onFocus={handleFocus}
                    inputRef={inputRef}
                    size={size}
                    inputValue={inputValue}
                    cursorConfig={cursorConfig}
                    cursorPosition={cursorPosition}
                    setCursorPosition={setCursorPosition}
                />
            )
        } else if (mode === 'verificationCode') {
            const { length } = verificationCodeConfig
            return <VerificationCode
                    length={length}
                    inputRef={inputRef}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    onFocus={handleFocus}
                />
        }
    }

    return (
        <>
            {renderInputContent()}
        </>
    )
}

export default InputContent