import { useEffect, useState } from 'react'
import styles from './index.module.less'
import { SwapLeftOutlined, CaretUpOutlined } from '@ant-design/icons'

const AlphabetKeyboard = ({
    isCapitalized,
    onInput,
    showButton,
    buttonText,
    theme
}) => {
    const firstLineKeysCapitalized = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const seconendLineKeysCapitalized = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const thirdLineKeysCapitalized = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    const firstLineKeysLowercase = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
    const seconendLineKeysLowercase = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
    const thirdLineKeysLowercase = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    const [normalKeys, setNormalKeys] = useState([[], [], []])
    useEffect(() => {
        setNormalKeys(isCapitalized
            ? [firstLineKeysCapitalized, seconendLineKeysCapitalized, thirdLineKeysCapitalized]
            : [firstLineKeysLowercase, seconendLineKeysLowercase, thirdLineKeysLowercase])
    }, [isCapitalized])
    const handleOnKeyDown = (e) => {
        onInput && onInput(e)
    }
    const renderNormalKeys = (keyList) => {
        return keyList.map(key => {
            return (
                <div className={styles.key} key={key} onClick={() => handleOnKeyDown(key)}>
                    {key}
                </div>
            )
        })
    }
    return (
        <div className={styles.AlphabetKeyboard}>
            <div className={styles.firstLine}>
                {renderNormalKeys(normalKeys[0])}
            </div>
            <div className={styles.seconendLine}>
                {renderNormalKeys(normalKeys[1])}
            </div>
            <div className={styles.thirdLineKeys}>
                <div className={`${styles.key} ${styles.controlKey}`} onClick={() => handleOnKeyDown('capitalization')}>
                    <CaretUpOutlined style={{ fontSize: '18px' }} />
                </div>
                {renderNormalKeys(normalKeys[2])}
                <div className={`${styles.key} ${styles.controlKey}`} onClick={() => handleOnKeyDown('backspace')}>
                    <SwapLeftOutlined style={{ fontSize: '18px' }} />
                </div>
            </div>
            <div className={styles.fourthLineKeys}>
                {
                    showButton && (
                        <div className={styles.toolKey} style={{ background: theme || '#1677FF' }} onClick={() => handleOnKeyDown('change-alphabet')}>123</div>
                    )
                }
                <div className={`${styles.key} ${styles.spaceKey}`} onClick={() => handleOnKeyDown('\u0020')}>
                    空格
                </div>
                {
                    showButton && (
                        <div className={styles.toolKey} style={{ background: theme || '#1677FF' }} onClick={() => handleOnKeyDown('submit')}>{buttonText}</div>
                    )
                }
            </div>
        </div>
    )
}

export default AlphabetKeyboard;