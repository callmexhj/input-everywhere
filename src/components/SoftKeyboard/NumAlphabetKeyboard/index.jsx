import styles from './index.module.less'
import { SwapLeftOutlined } from '@ant-design/icons'

const NumAlphabetKeyboard = ({ onInput }) => {
    const numberKey = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    const firstLineKeysCapitalized = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const seconendLineKeysCapitalized = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const thirdLineKeysCapitalized = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
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
        <div className={styles.numAlphabetKeyboard}>
            <div className={styles.firstLine}>
                {renderNormalKeys(numberKey)}
            </div>
            <div className={styles.firstLine}>
                {renderNormalKeys(firstLineKeysCapitalized)}
            </div>
            <div className={styles.seconendLine}>
                {renderNormalKeys(seconendLineKeysCapitalized)}
            </div>
            <div className={styles.thirdLineKeys}>
                <div className={`${styles.key} ${styles.controlKey}`} onClick={() => handleOnKeyDown('挂')}>
                    挂
                </div>
                {renderNormalKeys(thirdLineKeysCapitalized)}
                <div className={`${styles.key} ${styles.controlKey}`}>
                    <SwapLeftOutlined style={{ fontSize: '18px' }} onClick={() => handleOnKeyDown('backspace')} />
                </div>
            </div>
        </div>
    )
}

export default NumAlphabetKeyboard
