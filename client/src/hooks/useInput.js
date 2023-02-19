import {useState} from "react";
import {useValidation} from "./useValidation";

export const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isError, setError] = useState(false)

    const valid = useValidation(value, validations)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = (e) => {
        setError(true)
        console.log(isError)
    }

    return {
        value,
        onChange,
        onBlur,
        isError,
        ...valid
    }
}
