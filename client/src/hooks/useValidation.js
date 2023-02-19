import {useEffect, useState} from "react";

export const useValidation = (value, validations) => {
    const [isEmpty, setEmpty] = useState(true)
    const [isMinLength, setMinLength] = useState(false)
    const [isEmail, setEmail] = useState(false)
    const [inputValid, setInputValid] = useState(false)

    useEffect(() => {
        for (const validation in validations) {
            switch (validations) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLength(false) : setMinLength(true)
                    break
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break
                case 'isEmail':
                    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                    re.test(String(value).toLowerCase()) ? setEmail(true) : setEmail(false)
                    break

            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty || !isMinLength || !isEmail) {
            setInputValid(false)
        } else setInputValid(true)
    }, [isEmpty, isMinLength, isEmail])

    return {
        isEmpty,
        isMinLength,
        isEmail,
        inputValid
    }
}
