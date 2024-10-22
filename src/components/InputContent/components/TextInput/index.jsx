import { useEffect, useState } from 'react'
import { CloseCircleOutlined } from '@ant-design/icons'
import styles from './index.module.less'
const TextInput = ({
  onFocus,
  inputRef,
  size,
  inputValue,
  cursorConfig,
  cursorPosition,
  isFocus,
  onClear,
  showClear,
  setCursorPosition
}) => {
  const [touchStartX, setTouchStartX] = useState(null)
  const [swipeDirection, setSwipeDirection] = useState(null)
  const [inputValueArray, setInputValueArray] = useState([])
  const [touchStartTime, setTouchStartTime] = useState(null);


  const contentHeigh = size === 'small' ? 28 : size === 'big' ? 44 : 36
  const cursorRender = () => {
    const { show, blink } = cursorConfig
    if (show) {
      return (
        inputValueArray.map((item, index) => {
          if (index === cursorPosition) {
            return (
              <div key={index} className={styles.cursorContainer}>
                <div style={{ display: isFocus ? 'block' : 'none' }} className={`${styles.cursor} ${blink ? styles.cursorBlink : ''}`}></div>
                <span key={index}>{item}</span>
              </div>
            )
          } else {
            return <span key={index}>{item}</span>
          }
        })
      )
    } else {
      return (
        inputValueArray.map((item, index) => {
          return <span key={index}>{item}</span>
        })
      )
    }
  }
  const handleOnFocus = () => {
    onFocus()
  }

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX)
    setTouchStartTime(Date.now())
  }

  const handleTouchMove = (e) => {
    if (!touchStartX) return
    const diffX = e.touches[0].clientX - touchStartX
    if (Math.abs(diffX) > 100) {
      diffX > 0 ? handleCursorMove('right') : handleCursorMove('left')
      setTouchStartX(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = () => {
    setTouchStartX(null)
    setTouchStartTime(null)
  }

  const handleCursorMove = (swipeDirection) => {
    if (swipeDirection === 'left') setCursorPosition(cursorPosition - 1 < 0 ? 0 : cursorPosition - 1)
    else if (swipeDirection === 'right') setCursorPosition(cursorPosition + 1 > inputValueArray.length - 1 ? inputValueArray.length - 1 : cursorPosition + 1)
    setSwipeDirection(null)
  }

  useEffect(() => {
    handleCursorMove(swipeDirection)
  }, [swipeDirection])

  useEffect(() => {
    setInputValueArray([...inputValue.split(''), ''])
  }, [inputValue])

  return (
    <div
      className={styles.InputContent}
      style={{ height: `${contentHeigh}px` }}
      onClick={handleOnFocus}
      ref={inputRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.inputValue}>
        {cursorRender()}
      </div>
      {
        showClear && (
          <CloseCircleOutlined className={styles.closeIco} onClick={() => onClear()}/>
        )
      }
    </div>
  )
}

export default TextInput