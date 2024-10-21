import styles from './index.module.less'
import backspacePNG from '../../../assets/backspace.png'

const LicensePlateAlphabetNumKeyBoard = ({ onInput, theme }) => {
  const keys = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P', 'A', 'S', 'D'],
    ['F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B'],
    ['N', 'M', '使', '领', '警', '学', '港', '澳', '挂', 'backspace']
  ]
  const handleOnKeyDown = (key) => {
    onInput && onInput(key)
  }
  const keyRender = (keyList) => {
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
    <div className={styles.licensePlateAlphabetNumKeyBoard}>
      {keyRender(keys[0])}
      {keyRender(keys[1])}
      {keyRender(keys[2])}
      {keyRender(keys[3])}
    </div>
  )
}

export default LicensePlateAlphabetNumKeyBoard