import {useEffect, useState} from "react";


export const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true)
    const [isMinLengthWrong, setMinLengthWrong] = useState(true)
    const [isEmailWrong, setEmailWrong] = useState(true)
    const [inputValid, setInputValid] = useState(false)
    const [isMaxLength, setMaxLength] = useState(false)

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case 'isMinLengthWrong':
                    value.length < validations[validation] ? setMinLengthWrong(true) : setMinLengthWrong(false)
                    break
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break
                case 'isEmailWrong':
                    const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                    re.test(String(value).toLowerCase()) ? setEmailWrong(false) : setEmailWrong(true)
                    break
                case 'isMaxLength':
                    value.length > validations[validation] ? setMaxLength(true) : setMaxLength(false)
                    break

            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty || isMinLengthWrong || isEmailWrong || isMaxLength) {
            console.log(isEmpty, isMinLengthWrong, isEmailWrong, isMaxLength)
            setInputValid(false)
        } else setInputValid(true)
    }, [isEmpty, isMinLengthWrong, isEmailWrong, isMaxLength])

    return {
        isEmpty,
        isMinLengthWrong,
        isEmailWrong,
        isMaxLength,
        inputValid
    }
}
