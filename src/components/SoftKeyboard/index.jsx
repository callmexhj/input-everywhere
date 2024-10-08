import styles from './index.module.less'
import NumberKeyboard from './NumberKeyboard'
import AlphabetKeyboard from './AlphabetKeyboard'

const SoftKeyboard = ({ show, softKeyboardRef, mode, inputValue, setInputValue }) => {
    const onInput = (e) => {
        if (e === 'backspace') {
            const newValue = inputValue.slice(0, inputValue.length - 1)
            setInputValue(newValue)
        } else {
            const newValue = `${inputValue}${e}`
            setInputValue(newValue)
        }
    }
    const renderKeyboard = (mode) => {
        if (mode === 'number') {
            return (
                <NumberKeyboard onInput={onInput} />
            )
        }
        if (mode === 'alphabet') {
            return (
                <AlphabetKeyboard />
            )
        }
    }
    return show && (
        <div className={styles.softKeyboard} ref={softKeyboardRef} >
            {renderKeyboard(mode)}
        </div>
    )
}

export default SoftKeyboard