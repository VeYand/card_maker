import React from "react"
import { TextType } from "../../../../types/types"
import classes from "./TextObject.module.css"
import { useAppDispatch } from "../../../../redux/hooks"
import { changeObject } from "../../../../model/cardEditorSlice"

interface ITextObject {
    textObject: TextType
}

const TextObject = ({ textObject }: ITextObject) => {
    const dispatch = useAppDispatch()

    const handleTextChange = (value: string) => {
        if (!textObject.isSelected) {
            return
        }

        dispatch(
            changeObject({
                ...textObject,
                content: value,
            }),
        )
    }

    return (
        <textarea
            value={textObject.content}
            className={classes.text}
            style={{
                fontSize: `${textObject.fontSize}px`,
                color: textObject.fontColor,
                fontFamily: textObject.fontFamily,
                fontStyle: textObject.decorations.includes("italic")
                    ? "italic"
                    : "normal",
                fontWeight: textObject.decorations.includes("bold")
                    ? "bold"
                    : "normal",
                textDecoration: textObject.decorations.includes("underline")
                    ? "underline"
                    : "none",
            }}
            placeholder={
                textObject.content === "" ? "Введите текст" : undefined
            }
            onChange={(e) => handleTextChange(e.target.value)}
        />
    )
}

export { TextObject }
