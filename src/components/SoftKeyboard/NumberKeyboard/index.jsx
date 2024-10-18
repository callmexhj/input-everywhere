import styles from './index.module.less'
import backspacePNG from '../../../assets/backspace-black.png'

const NumberKeyboard = ({
    onInput,
    showButton,
    buttonText,
    lastModeMemory,
    mode,
    theme
}) => {

    const keyList = [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
    const handleOnKeyDown = (e) => {
        onInput && onInput(e)
    }
    const renderNormalKeys = (list) => {
        return list.map((item, index) => {
            return (
                <div className={styles.key} key={index} onClick={() => handleOnKeyDown(item)}>
                    {item}
                </div>
            )
        })
    }
    return (
        <div className={styles.NumberKeyboard}>
            <div className={styles.leftWrap}>
                <div className={styles.leftTopWrap}>
                    <div className={styles.normalKeyCol}>{renderNormalKeys(keyList[0])}</div>
                    <div className={styles.normalKeyCol}>{renderNormalKeys(keyList[1])}</div>
                    <div className={styles.normalKeyCol}>{renderNormalKeys(keyList[2])}</div>
                </div>
                <div className={styles.leftBottomWrap}>
                    {
                        mode === 'verificationCode' ? (
                            <div className={`${styles.key} ${styles.grayKey}`}></div>
                        ) : (
                            <div
                                className={`${styles.key} ${styles.grayKey}`}
                                onClick={() => handleOnKeyDown(`change-${lastModeMemory === 'number' ?  'alphabet' : lastModeMemory}`)}
                            >
                                abc
                            </div>
                        )
                    }
                    <div className={styles.key} onClick={() => handleOnKeyDown(0)}>0</div>
                    <div className={`${styles.key} ${styles.grayKey}`} onClick={() =>!showButton && handleOnKeyDown('backspace')}>
                        {
                            !showButton && (
                                <img className={styles.icoImg} src={backspacePNG} />
                            )
                        }
                    </div>
                </div>
            </div>
            {
                showButton && (
                    <div className={styles.rightWrap}>
                        <div className={styles.key} onClick={() => handleOnKeyDown('backspace')}>
                            <img className={styles.icoImg} src={backspacePNG} />
                        </div>
                        <div
                            className={`${styles.key} ${styles.submitKey}`}
                            style={{ background: theme || '#1677FF' }}
                            onClick={() => handleOnKeyDown('submit')}
                        >
                            {buttonText}
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default NumberKeyboard