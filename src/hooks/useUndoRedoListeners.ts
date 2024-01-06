import { useAppDispatch } from "../redux/hooks"
import { useEffect } from "react"
import { redo, undo } from "../model/cardEditorSlice"

const useUndoRedoListeners = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        const handleKeydownEvent = (event: KeyboardEvent) => {
            if (event.ctrlKey) {
                if (event.code === "KeyZ") {
                    dispatch(undo())
                }
                if (event.code === "KeyY") {
                    dispatch(redo())
                }
            }
        }

        window.addEventListener("keydown", handleKeydownEvent)

        return () => window.removeEventListener("keydown", handleKeydownEvent)
    }, [dispatch])
}

export { useUndoRedoListeners }
