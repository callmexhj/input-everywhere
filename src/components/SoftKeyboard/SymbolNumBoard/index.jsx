import styles from './index.module.less'
import backspacePNG from '../../../assets/backspace.png'

const SymbolNumBoard = ({
  onInput,
  theme,
  lastModeMemory,
  buttonText,
  showButton
}) => {
  const normalKeyList = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['-', '/', ':', '(', ')', '$', '&', '@', '"'],
    ['.', ',', '?', '!', '+']
  ]
  const normalKeyRender = (keyList) => {
    return keyList.map((item, index) => {
      return (
        <div
          key={index}
          className={styles.normalKey}
          onClick={() => onInput(item)}
        >
          {item}
        </div>
      )
    })
  }
  const handleOnKeyDown = (e) => {
    onInput && onInput(e)
  }
  return (
    <div className={styles.symbolNumBoard}>
      <div className={styles.normalLine}>
        {normalKeyRender(normalKeyList[0])}
      </div>
      <div className={styles.normalLine} style={{ padding: '0 18px' }}>
        {normalKeyRender(normalKeyList[1])}
      </div>
      <div className={styles.normalLine}>
        <div className={`${styles.toolKey} ${styles.normalKey} ${styles.emptyKey}`}></div>
        {normalKeyRender(normalKeyList[2])}
        <div style={{ background: theme || '#1677FF' }} className={`${styles.toolKey} ${styles.normalKey}`} onClick={() => handleOnKeyDown('backspace')}>
          <img className={styles.icoImg} src={backspacePNG} />
        </div>
      </div>
      <div className={styles.normalLine}>
        {
          showButton && (
            <div
              style={{ background: theme || '#1677FF' }}
              className={`${styles.normalKey} ${styles.submitKey}`}
              onClick={() => handleOnKeyDown(`change-${lastModeMemory === 'symbolNum' ? 'alphabet' : lastModeMemory}`)}
            >
              abc
            </div>
          )
        }
        <div className={`${styles.normalKey} ${styles.spacekey}`}>
          space
        </div>
        {
          showButton && (
            <div className={`${styles.normalKey} ${styles.submitKey}`} style={{ background: theme || '#1677FF' }} onClick={() => handleOnKeyDown('submit')}>{buttonText}</div>
          )
        }
      </div>
    </div>
  )
}

export default SymbolNumBoard