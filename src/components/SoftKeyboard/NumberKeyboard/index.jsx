import styles from './index.module.less'
import { SwapLeftOutlined } from '@ant-design/icons'

const NumberKeyboard = ({ onInput }) => {

    const keyList = [9, 8, 7, 6, 5, 4, 3, 2, 1]
    const handleOnKeyDown = (e) => {
        onInput && onInput(e)
    }
    const renderNormalKeys = () => {
        return keyList.map(item => {
            return <div className={styles.keyItem} key={item} onClick={() => handleOnKeyDown(item)}>{item}</div>
        })
    }
    return (
        <div className={styles.NumberKeyboard}>
            {renderNormalKeys()}
            <div className={styles.keyItem}></div>
            <div className={styles.keyItem} onClick={() => handleOnKeyDown(0)} >0</div>
            <div className={styles.keyItem} onClick={() => handleOnKeyDown('backspace')} ><SwapLeftOutlined style={{ fontSize: '18px' }} /></div>
        </div>
    )
}

export default NumberKeyboard