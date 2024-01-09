import React, { useRef } from "react"
import classes from "./TopPanel.module.css"
import DropDownButtons from "../../../common/DropDownButtons/DropDownButtons"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { handleJSONLoad, saveAsImage, saveAsJson } from "../model/hadlers"
import { Button } from "../../../common/Button/Button"
import { CardDataType } from "../../../types/types"
import { redo, setCardState, undo } from "../../../model/cardEditorSlice"
import {
    hideNotification,
    showNotification,
} from "../../NotificationBlock/model/notificationSlice"

type CanvasActionType = "Current Window" | "New Window"
type SaveActionType = "JPEG" | "PNG" | "JSON"
const canvasActions: CanvasActionType[] = ["Current Window", "New Window"]
const saveActions: SaveActionType[] = ["JPEG", "PNG", "JSON"]

const TopPanel = () => {
    const cardEditorState = useAppSelector((state) => state.cardEditor)
    const jsonInputRef = useRef<HTMLInputElement | null>(null)
    const dispatch = useAppDispatch()

    const showMessage = (message: string, time = 3000) => {
        dispatch(showNotification(message))
        setTimeout(() => {
            dispatch(hideNotification())
        }, time)
    }

    const handleCanvasAction = (action: CanvasActionType) => {
        switch (action) {
            case "Current Window":
                window.location.reload()
                break
            case "New Window":
                window.open("/", "_blank")
                break
            default:
                break
        }
    }

    const handleSaveAction = (action: SaveActionType) => {
        switch (action) {
            case "JPEG":
                saveAsImage(action, showMessage)
                break
            case "PNG":
                saveAsImage(action, showMessage)
                break
            case "JSON":
                saveAsJson(cardEditorState, showMessage)
                break
            default:
                break
        }
    }
    const handleLoadAction = () => {
        if (jsonInputRef.current?.value) {
            jsonInputRef.current.value = ""
        }
        jsonInputRef.current?.click()
    }

    const loadCard = (cardData: CardDataType | null, errorMessage?: string) => {
        if (cardData) {
            dispatch(setCardState(cardData))
            showMessage("Loaded successfully")
        } else {
            showMessage(`${errorMessage}`)
        }
    }

    const handleUndo = () => {
        dispatch(undo())
    }

    const handleRedo = () => {
        dispatch(redo())
    }

    return (
        <div className={classes.topPanel}>
            <DropDownButtons
                parentButtonName={"New canvas"}
                childButtonNames={canvasActions}
                onSelect={handleCanvasAction}
            />
            <DropDownButtons
                parentButtonName={"Save as"}
                childButtonNames={saveActions}
                onSelect={handleSaveAction}
            />
            <input
                type="file"
                accept=".json"
                ref={jsonInputRef}
                onChange={(event) => handleJSONLoad(event, loadCard)}
                style={{ display: "none" }}
            />
            <Button onClick={handleLoadAction}>Load json</Button>
            <Button onClick={handleUndo}>Undo</Button>
            <Button onClick={handleRedo}>Redo</Button>
        </div>
    )
}

export { TopPanel }
