import styles from './index.module.less'
import backspacePNG from '@/assets/backspace.png'
const LicensePlateKeyBoard = ({ onInput, theme }) => {
    const firstLicensePlateKey = [
        '京',
        '津',
        '渝',
        '沪',
        '冀',
        '晋',
        '辽',
        '吉',
        '黑',
        '苏',
        '浙',
        '皖',
        '闽',
        '赣',
        '鲁',
        '豫',
        '鄂',
        '湘',
        '粤',
        '琼',
        '川',
        '贵',
        '云',
        '陕',
        '甘',
        '青',
        '蒙',
        '桂',
        '宁',
        '新',
        '藏',
        'backspace'
    ]
    const specialLicensePlateKey = [
        '使',
        '领',
        '学',
        '警'
    ]

    const handleOnKeyDown = (key) => {
        onInput && onInput(key)
    }
    const renderLicensePlateKey = (keyList) => {
        return (
            <div className={styles.licensePlateKeyRow}>
                {
                    keyList.map((item, index) => {
                        if (item === 'backspace') {
                            return (
                                <div key={index} style={{ background: theme || '#1677FF' }} className={`${styles.licensePlateKey} ${styles.backspace}`} onClick={() => handleOnKeyDown(item)}>
                                    <img className={styles.icoImg} src={backspacePNG} />
                                </div>
                            )
                        } else {
                            return (
                                <div key={index} className={styles.licensePlateKey} onClick={() => handleOnKeyDown(item)}>
                                    {item}
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }
    return (
        <div className={styles.licensePlateKeyBoard}>
            {renderLicensePlateKey(firstLicensePlateKey.slice(0, 8))}
            {renderLicensePlateKey(firstLicensePlateKey.slice(8, 16))}
            {renderLicensePlateKey(firstLicensePlateKey.slice(16, 24))}
            {renderLicensePlateKey(firstLicensePlateKey.slice(24, 32))}
        </div>
    )
}

export default LicensePlateKeyBoard