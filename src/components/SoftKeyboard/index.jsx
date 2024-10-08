import styles from './index.module.less'

const SoftKeyboard = ({ show, softKeyboardRef }) => {
    return show && (
        <div className={styles.softKeyboard} ref={softKeyboardRef} >

        </div>
    )
}

export default SoftKeyboard