import { useEffect, useState } from 'react'
import styles from './index.module.less'
import backspacePNG from '../../../assets/backspace.png'
import capitalizationPNG from '../../../assets/capitalization.png'
import capitalizationSolidPNG from '../../../assets/capitalization-solid.png'

const AlphabetKeyboard = ({
    isCapitalized,
    onInput,
    showButton,
    buttonText,
    checkModeTo,
    lastModeMemory,
    mode,
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
    const renderSpaceKey = () => {
        if (mode !== 'licensePlate' && mode !== 'verificationCode') {
            return (

                <div className={styles.fourthLineKeys}>
                    {
                        showButton && (
                            <div className={styles.toolKey} style={{ background: theme || '#1677FF' }} onClick={() => handleOnKeyDown(`change-${checkModeTo === 'number' && lastModeMemory !== 'symbolNum' ? 'number' : 'symbolNum'}`)}>123</div>
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
        <div className={styles.AlphabetKeyboard}>
            <div className={styles.firstLine}>
                {renderNormalKeys(normalKeys[0])}
            </div>
            <div className={styles.seconendLine}>
                {renderNormalKeys(normalKeys[1])}
            </div>
            <div className={styles.thirdLineKeys}>
                <div style={{ background: theme || '#1677FF' }} className={`${styles.key} ${styles.controlKey}`} onClick={() => handleOnKeyDown('capitalization')}>
                    {
                        isCapitalized
                            ? <img className={styles.icoImg} src={capitalizationPNG} />
                            : <img className={styles.icoImg} src={capitalizationSolidPNG} />
                    }
                </div>
                {renderNormalKeys(normalKeys[2])}
                <div style={{ background: theme || '#1677FF' }} className={`${styles.key} ${styles.controlKey}`} onClick={() => handleOnKeyDown('backspace')}>
                    <img className={styles.icoImg} src={backspacePNG} />
                </div>
            </div>
            {renderSpaceKey()}
        </div>
    )
}

export default AlphabetKeyboard;