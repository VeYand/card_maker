import { useEffect, useState } from "react"

const useIsMultiplySelect = () => {
    const [isMultiplySelect, setIsMultiplySelect] = useState(false)

    const handleKeyDown = (event: KeyboardEvent) => {
        setIsMultiplySelect(event.ctrlKey)
    }

    const handleKeyUp = () => {
        setIsMultiplySelect(false)
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [])

    return isMultiplySelect
}

export { useIsMultiplySelect }
