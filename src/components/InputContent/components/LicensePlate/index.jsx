import { useEffect, useState } from 'react'
import styles from './index.module.less'

const LicensePlate = ({ licenseType, inputRef, onFocus, inputValue, setInputValue }) => {
    const [licensePlateItemArray, setLicensePlateItemArray] = useState(['', '', '', '', '', '', ''])
    useEffect(() => {
        updateInputContent()
    }, [licenseType, inputValue])

    const updateInputContent = () => {
        
        let tempArray = []
        let licensePlateDig = 7
        const licensePlateItemArrayCache = []

        if (licenseType === 'green') {
            licensePlateDig = 8
        }

        if (!inputValue || inputValue.length === 0) {
            tempArray = new Array(licensePlateDig).fill('')
        } else if (inputValue.length < licensePlateDig) {
            tempArray = inputValue.split('').concat(new Array(licensePlateDig - inputValue.length).fill(''))
        } else {
            tempArray = inputValue.slice(0, licensePlateDig)
        }

        for (let i = 0; i < licensePlateDig; i++) {
            licensePlateItemArrayCache.push(tempArray[i])
        }
        setLicensePlateItemArray([...licensePlateItemArrayCache])
    }

    const renderLicensePlateItem = () => {
        return licensePlateItemArray.map((item, index) => {
            return <div className={styles.licensePlateItem} key={index}>{item}</div>
        })
    }
    const handleOnFocus = () => {
        onFocus()
    }
    return (
        <div className={styles.licensePlate} ref={inputRef} onClick={handleOnFocus}>
            {renderLicensePlateItem()}
        </div>
    )
}

export default LicensePlate