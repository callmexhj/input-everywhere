import styles from './index.module.less'

const InputContent = ({ size }) => {
    const contentHeigh= size === 'small' ? 28 : size === 'big' ? 44 : 36
    console.log(contentHeigh)
    return (
        <div className={styles.InputContent} style={{ height: `${contentHeigh}px` }}>
            111
        </div>
    )
}

export default InputContent