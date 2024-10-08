import styles from './index.module.less'
import { SwapLeftOutlined } from '@ant-design/icons'
const LicensePlateKeyBoard = ({ onInput }) => {
    const firstLicensePlateKey = [
        '京',   // 北京
        '津',   // 天津
        '沪',   // 上海
        '渝',   // 重庆
        '冀',   // 河北
        '晋',   // 山西
        '蒙',   // 内蒙古
        '辽',   // 辽宁
        '吉',   // 吉林
        '黑',   // 黑龙江
        '苏',   // 江苏
        '浙',   // 浙江
        '皖',   // 安徽
        '闽',   // 福建
        '赣',   // 江西
        '鲁',   // 山东
        '豫',   // 河南
        '鄂',   // 湖北
        '湘',   // 湖南
        '粤',   // 广东
        '桂',   // 广西
        '琼',   // 海南
        '川',   // 四川
        '贵',   // 贵州
        '云',   // 云南
        '藏',   // 西藏
        '陕',   // 陕西
        '甘',   // 甘肃
        '青',   // 青海
        '宁',   // 宁夏
        '新',   // 新疆
        '港',   // 香港
        '澳',   // 澳门
        '台'   // 台湾
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
    const renderFirstLicensePlateKey = () => {
        return (
            <>
                {
                    firstLicensePlateKey.map((item, index) => {
                        return (
                            <div key={index} className={styles.licensePlateKey} onClick={() => handleOnKeyDown(item)}>
                                {item}
                            </div>
                        )
                    })
                }
                <div className={`${styles.licensePlateKey} ${styles.backspaceKey}`}>
                    <SwapLeftOutlined style={{ fontSize: '18px' }} onClick={() => handleOnKeyDown('backspace')} />
                </div>
                {
                    specialLicensePlateKey.map((item, index) => {
                        return (
                            <div key={index} onClick={() => handleOnKeyDown(item)} className={`${styles.licensePlateKey} ${styles.specialLicensePlateKey}`}>
                                {item}
                            </div>
                        )
                    })
                }
            </>
        )
    }
    return (
        <div className={styles.licensePlateKeyBoard}>
            {renderFirstLicensePlateKey()}
        </div>
    )
}

export default LicensePlateKeyBoard