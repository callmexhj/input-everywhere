import { useEffect, useState } from 'react'
import styles from './index.module.less'
import backspacePNG from '../../../assets/backspace.png'
import capitalizationPNG from '../../../assets/capitalization.png'

const NumAlphabetKeyboard = ({
    onInput,
    mode,
    isCapitalized,
    showButton,
    buttonText,
    theme
}) => {
    const numberKey = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    const firstLineKeysCapitalized = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const seconendLineKeysCapitalized = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const thirdLineKeysCapitalized = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    const firstLineKeysLowercase = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']
    const seconendLineKeysLowercase = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']
    const thirdLineKeysLowercase = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
    const [normalKeys, setNormalKeys] = useState([[], [], [], []])
    useEffect(() => {
        setNormalKeys(isCapitalized || mode === 'licensePlate'
            ? [numberKey, firstLineKeysCapitalized, seconendLineKeysCapitalized, thirdLineKeysCapitalized]
            : [numberKey, firstLineKeysLowercase, seconendLineKeysLowercase, thirdLineKeysLowercase])
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
    const renderToolbar = () => {
        if (mode === 'licensePlate') {
            // 废弃
            return (
                <div className={`${styles.key} ${styles.controlKey}`} onClick={() => handleOnKeyDown('挂')}>
                    挂
                </div>
            )
        } else {
            return (
                <div className={`${styles.key} ${styles.controlKey}`} style={{ background: theme || '#1677FF' }} onClick={() => handleOnKeyDown('capitalization')}>
                    <img className={styles.icoImg} src={capitalizationPNG} />
                </div>
            )
        }
    }
    const renderSpaceKey = () => {
        if (mode !== 'licensePlate' && mode !== 'verificationCode') {
            return (

                <div className={styles.fourthLineKeys}>
                    {
                        showButton && (
                            <div className={styles.toolKey} style={{ background: theme || '#1677FF' }} onClick={() => handleOnKeyDown('change-number')}>123</div>
                        )
                    }
                    <div className={`${styles.key} ${styles.spaceKey} ${showButton ? '' : styles.widerSpaceKey}`} onClick={() => handleOnKeyDown('\u0020')}>
                        space
                    </div>
                    {
                        showButton && (
                            <div className={styles.toolKey} style={{ background: theme || '#1677FF' }} onClick={() => handleOnKeyDown('submit')}>{buttonText}</div>
                        )
                    }
                </div>
            )
        }
    }
    return (
        <div className={styles.numAlphabetKeyboard}>
            <div className={styles.firstLine}>
                {renderNormalKeys(normalKeys[0])}
            </div>
            <div className={styles.firstLine}>
                {renderNormalKeys(normalKeys[1])}
            </div>
            <div className={styles.seconendLine}>
                {renderNormalKeys(normalKeys[2])}
            </div>
            <div className={styles.thirdLineKeys}>
                {renderToolbar()}
                {renderNormalKeys(normalKeys[3])}
                <div className={`${styles.key} ${styles.controlKey}`} style={{ background: theme || '#1677FF' }} onClick={() => handleOnKeyDown('backspace')}>
                    <img className={styles.icoImg} src={backspacePNG} />
                </div>
            </div>
            {renderSpaceKey()}
        </div>
    )
}

export default NumAlphabetKeyboard
