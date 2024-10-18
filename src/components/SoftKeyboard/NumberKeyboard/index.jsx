import { useEffect, useState } from 'react'
import styles from './index.module.less'
import { SwapLeftOutlined } from '@ant-design/icons'

const NumberKeyboard = ({ onInput }) => {
    // const keyList = [{
    //     trueValue: 0,
    //     randomValue: Math.random()
    // }, 8, 7, 6, 5, 4, 3, 2, 1]


    const handleOnKeyDown = (e) => {
        onInput && onInput(e)
    }
   
    //键盘乱序
    const randomKey =()=>{
        const keyList = [9,8,7,6,5,4,3,2,1]
        keyList.sort(function () {
            return Math.random() - 0.5;
        });
        return keyList
    } 
    const [keys,setKeys] = useState([]);

    useEffect(()=>{
        setKeys(randomKey())
    },[]) // 空依赖数组确保只在组件挂载时执行一次

    const renderNormalKeys = () => {
        return keys.map(item => {
            return <div className={styles.keyItem} key={item} onClick={() => handleOnKeyDown(item)}>{item}</div>
        })
    }
    
    return (
        <div className={styles.NumberKeyboard}>
            {renderNormalKeys()}
            <div className={styles.keyItem}></div>
            <div className={styles.keyItem} onClick={() => handleOnKeyDown(0)} >0</div>
            <div className={styles.keyItem} onClick={() => handleOnKeyDown('backspace')} >
                <SwapLeftOutlined style={{ fontSize: '18px' }} />
            </div>
        </div>
    )
}

export default NumberKeyboard