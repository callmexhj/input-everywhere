import { useEffect, useState } from 'react'
import styles from './index.module.less'

const VerificationCode = ({
    inputRef,
    length = 6,
    inputValue,
    onFocus,
    setInputValue,
    isFocus,
    password
}) => {
    const [verificationCodeArray, setVerificationCodeArray] = useState([])

    useEffect(() => {
        // 长度配置改变时初始化
        initVerificationCodeArray()
    }, [length])
    useEffect(() => {
        const dig = length < 2 ? 2 : length > 8 ? 8 : length;
        if (typeof inputValue === 'string') {
            // 处理inputValue不为空的情况
            const tempArray = inputValue
                .substring(0, dig) // 截取前length个字符
                .split('') // 将字符串转为字符数组
                .concat(new Array((dig - inputValue.length) > 0 ? dig - inputValue.length : 0).fill('')); // 如果inputValue不足length，则补充空字符串
            setVerificationCodeArray([...tempArray]);
        }
    }, [inputValue])

    const initVerificationCodeArray = () => {
        const dig = length < 2 ? 2 : length > 8 ? 8 : length;
        const tempArray = new Array(dig).fill('');
        setVerificationCodeArray([...tempArray]);
        setInputValue('')
    }

    const handleOnFocus = () => {
        onFocus()
    }
    const renderVerificationCodeItem = () => {
        return verificationCodeArray.map((item, index) => {
            return (
                <div
                    className={`${styles.verificationCodeItem} ${index === inputValue?.length ? ( isFocus ? styles.actItem : null ) : ''}`}
                    key={index}
                >
                    {password ? item === '' ? '' : '*' : item}
                </div>
            )
        })
    }

    return (
        <div className={styles.verificationCode} ref={inputRef} onClick={handleOnFocus}>
            {renderVerificationCodeItem()}
        </div>
    )
}

export default VerificationCode