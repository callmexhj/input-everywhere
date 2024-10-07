import { memo } from 'react'
import InputContent from './components/InputContent'
function InputEverywhere({ size }) {
  const inputContentProps = {
    size
  }
  return (
    <>
      <InputContent { ...inputContentProps } />
    </>
  )
}

export default memo(InputEverywhere)
