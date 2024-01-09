import React from "react"
import classes from "./CreateTextBlock.module.css"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"
import { addObjects } from "../../../../model/cardEditorSlice"
import { TextType } from "../../../../types/types"
import { Button } from "../../../../common/Button/Button"

const CreateTextBlock = () => {
    const dispatch = useAppDispatch()
    const canvasSize = useAppSelector((state) => state.cardEditor.canvas)

    const createTextBlock = () => {
        const textObject: TextType = {
            id: Date.now().toString(),
            isSelected: false,
            posX: 0,
            posY: 0,
            width: canvasSize.width * 0.2,
            height: canvasSize.height * 0.2,
            content: "",
            fontColor: "black",
            fontSize: 20,
            fontFamily: "Arial",
            decorations: [],
        }

        dispatch(addObjects([textObject]))
    }

    return (
        <div className={classes.container}>
            <h3 className={classes.title}>Text</h3>
            <div className={classes.buttonContainer}>
                <Button onClick={createTextBlock}>Create a text block</Button>
            </div>
        </div>
    )
}

export { CreateTextBlock }
