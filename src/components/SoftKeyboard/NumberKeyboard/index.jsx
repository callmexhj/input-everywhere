import styles from './index.module.less'
import {useState,useEffect} from 'react'
import backspacePNG from '../../../assets/backspace-black.png'

const NumberKeyboard = ({
    onInput,
    showButton,
    disOrder,
    buttonText,
    lastModeMemory,
    mode,
    theme
}) => {

   
    const handleOnKeyDown = (e) => {
        onInput && onInput(e)
    }
    // const randomKey = ()=>{
    //     const keyList = [1,2,3,4,5,6,7,8,9]
    //    
    //     if(disOrder){keyList.sort(function(){
    //         return Math.random() - 0.5;
    //     })}
    //     return keyList
    // }

    const randomKey = () => {
        const keyList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        if (disOrder) {
            // 使用 Fisher-Yates 洗牌算法进行乱序
            for (let i = keyList.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [keyList[i], keyList[j]] = [keyList[j], keyList[i]];
            }
        }
        return keyList;
    };
    const [keys,setKeys] = useState([]);

    useEffect(()=>{
        setKeys(randomKey())
    },[]);//空依赖数组保证只在组件挂载时执行一次
    
    const renderNormalKeys = () => {
        return keys.map((item, index) => {
            console.log(keys,'乱序')
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
                    <div className={styles.normalKeyCol}>{renderNormalKeys(keys[0])}</div>
                    <div className={styles.normalKeyCol}>{renderNormalKeys(keys[1])}</div>
                    <div className={styles.normalKeyCol}>{renderNormalKeys(keys[2])}</div>
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