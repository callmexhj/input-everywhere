import { useEffect, useState } from 'react'
import styles from './index.module.less'
const TextInput = ({
  onFocus,
  inputRef,
  size,
  inputValue,
  cursorConfig,
  cursorPosition,
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
          // console.log(inputValueArray, item, index)
          if (index === cursorPosition) {
            return (
              <div key={index} className={styles.cursorContainer}>
                <div className={`${styles.cursor} ${blink ? styles.cursorBlink : ''}`}></div>
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
    onFocus && onFocus()
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
    console.log(swipeDirection, cursorPosition)
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
      {/* {inputValue} */}
      {cursorRender()}

    </div>
  )
}

export default TextInput