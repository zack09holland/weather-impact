import { useState } from 'react'

export default function useFormState(initialVal) {
    const [value,setValue] = useState(initialVal)

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const reset = () => {
        setValue('')
    }

    return [value,onChange,reset]
}
