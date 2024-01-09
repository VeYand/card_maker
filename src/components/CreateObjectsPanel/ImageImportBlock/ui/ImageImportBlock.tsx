import React from "react"
import { ImageType } from "../../../../types/types"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"
import { addObjects } from "../../../../model/cardEditorSlice"
import classes from "./ImageImportBlock.module.css"
import { Button } from "../../../../common/Button/Button"
import { handleImageUpload } from "../model/hadlers"

const ImageImportBlock = () => {
    const canvasSize = useAppSelector((state) => state.cardEditor.canvas)
    const dispatch = useAppDispatch()
    const addImage = (imageObject: ImageType) => {
        dispatch(addObjects([imageObject]))
    }

    return (
        <div className={classes.block}>
            <h3 className={classes.title}>Upload an image</h3>
            <input
                id="input-image-from-pc"
                type="file"
                accept=".jpeg, .jpg, .png"
                onChange={(e) => handleImageUpload(e, canvasSize, addImage)}
                className={classes.inputBlock}
            />
            <div className={classes.buttonBlock}>
                <Button>
                    <label htmlFor="input-image-from-pc">Select a file</label>
                </Button>
            </div>
        </div>
    )
}

export { ImageImportBlock }
