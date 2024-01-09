import React from "react"
import classes from "./CreateArtObjectBlock.module.css"
import { artObjectList } from "../model/ArtObjectList"
import { useAppDispatch } from "../../../../redux/hooks"
import { addObjects } from "../../../../model/cardEditorSlice"

const CreateArtObjectBlock = () => {
    const dispatch = useAppDispatch()

    const createArtObject = (src: string) => {
        dispatch(
            addObjects([
                {
                    id: Date.now().toString(),
                    objectSrc: src,
                    isSelected: false,
                    posX: 0,
                    posY: 0,
                    width: 100,
                    height: 100,
                },
            ]),
        )
    }

    return (
        <div className={classes.container}>
            <h3 className={classes.title}>Art Objects</h3>
            <div className={classes.previewImagesBlock}>
                {artObjectList.map((src: string) => {
                    return (
                        <div key={src} onClick={() => createArtObject(src)}>
                            <img src={src} className={classes.previewImage} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export { CreateArtObjectBlock }
