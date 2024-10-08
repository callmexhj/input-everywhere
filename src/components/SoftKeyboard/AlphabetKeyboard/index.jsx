import styles from './index.module.less'

const AlphabetKeyboard = () => {
    const firstLineKeys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const seconendLineKeys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const thirdLineKeys = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    const renderFirstLineKeys = () => {
        return firstLineKeys.map(key => {
            return (
                <div className={styles.key} key={key}>
                    {key}
                </div>
            )
        })
    }
    const renderSeconendLineKeys = () => {
        return seconendLineKeys.map(key => {
            return (
                <div className={styles.key} key={key}>
                    {key}
                </div>
            )
        })
    }
    return (
        <div className={styles.AlphabetKeyboard}>
            <div className={styles.firstLine}>
                {renderFirstLineKeys()}
            </div>
            <div className={styles.seconendLine}>
                {renderSeconendLineKeys()}
            </div>
        </div>
    )
}

export default AlphabetKeyboard;