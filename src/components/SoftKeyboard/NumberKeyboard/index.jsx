import styles from './index.module.less'
import backspacePNG from '../../../assets/backspace-black.png'
import { useEffect, useState } from 'react'

const NumberKeyboard = ({
    onInput,
    showButton,
    buttonText,
    lastModeMemory,
    mode,
    theme,
    disOrder
}) => {
    const prueNums = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    const [keyList, setKeylist] = useState([[1, 4, 7], [2, 5, 8], [3, 6, 9]])

    useEffect(() => {
        if (disOrder) {
            const randomArray = shuffleArray(prueNums)
            const keyListTemp = splitInto33(randomArray)
            setKeylist(keyListTemp)
        }
    }, [disOrder])
    // const keyList = [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
    const shuffleArray = (array) => {
        const arrayTemp = array.map((item) => {
            return {
                value: item,
                slot: Math.random()
            }
        })
        arrayTemp.sort((a, b) => a.slot - b.slot)
        const finalArray = arrayTemp.map((item) => item.value)
        return finalArray
    }
    const splitInto33 = (array) => {
        const result = [];
        for (let i = 0; i < array.length; i += 3) {
            result.push(array.slice(i, i + 3));
        }
        return result;
    }
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
    const leftBottomKeyRender = () => {
        switch (mode) {
            case 'verificationCode': {
                return (
                    <div className={`${styles.key} ${styles.grayKey}`}></div>
                )
            }
            case 'money': {
                return (
                    <div className={`${styles.key} ${styles.grayKey}`} onClick={() => handleOnKeyDown('.')}>.</div>
                )
            }
            default:
                return (
                    <div
                        className={`${styles.key} ${styles.grayKey}`}
                        onClick={() => handleOnKeyDown(`change-${lastModeMemory === 'number' ? 'alphabet' : lastModeMemory}`)}
                    >
                        abc
                    </div>
                )
        }
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
                        leftBottomKeyRender()
                    }
                    <div className={styles.key} onClick={() => handleOnKeyDown(0)}>0</div>
                    <div className={`${styles.key} ${styles.grayKey}`} onClick={() => !showButton && handleOnKeyDown('backspace')}>
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