import {useState} from 'react'

function useToggle(initialVal){
    const [state, setState] = useState(initialVal = false)
    
    const toggle = () => {
        setState(!state)
    }
    return [state,toggle];
}
export default useToggle;