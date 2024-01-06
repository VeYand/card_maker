import React from "react"
import classes from "./ImageObject.module.css"
import { ImageType } from "../../../../types/types"

interface IImageObject {
    imageObject: ImageType
}

const ImageObject = ({ imageObject }: IImageObject) => {
    return (
        <img
            src={imageObject.imageSrc}
            className={classes.image}
            alt={"image"}
        />
    )
}

export { ImageObject }
