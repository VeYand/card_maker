import React from "react"
import {
    ArtType,
    ImageType,
    isArtType,
    isImageType,
    isTextType,
    ObjectType,
    TextType,
} from "../../../types/types"
import { TextObject } from "../TextObject/ui/TextObject"
import { ImageObject } from "../ImageObject/ui/ImageObject"
import { ArtObject } from "../ArtObject/ui/ArtObject"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import {
    changeObject,
    resetAllSelections,
    saveState,
} from "../../../model/cardEditorSlice"
import { useObjectInteraction } from "../../../hooks/useObjectInteraction"
import classes from "./ObjectView.module.css"
import { ResizeControls } from "../ResizeControls/ui/ResizeControls"

interface ObjectProps {
    object: ObjectType
    multiplySelect: boolean
}

const ObjectView = ({
    object,
    multiplySelect,
}: ObjectProps): React.ReactElement => {
    const dispatch = useAppDispatch()
    const allObjects = useAppSelector((state) => state.cardEditor.objects)
    const canvasSize = useAppSelector((state) => state.cardEditor.canvas)

    const changeObjectHandler = (newObject: ObjectType) => {
        dispatch(changeObject(newObject))
    }

    const onInteraction = useObjectInteraction({
        currentObject: object,
        otherObjects: allObjects.filter((curObject) => {
            return curObject.isSelected && object.id !== curObject.id
        }),
        changeObject: changeObjectHandler,
        minSize: {
            width: canvasSize.width * 0.05,
            height: canvasSize.height * 0.05,
        },
    })

    const handleMouseUp = () => {
        window.removeEventListener("mouseup", handleMouseUp)
        dispatch(saveState())
    }

    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        e.stopPropagation()
        window.addEventListener("mouseup", handleMouseUp)
        if (object.isSelected) {
            onInteraction(e)
            return
        }

        if (!multiplySelect) {
            dispatch(resetAllSelections())
        }

        dispatch(
            changeObject({
                ...object,
                isSelected: true,
            }),
        )
    }

    let element: React.ReactElement = <></>
    if (isTextType(object)) {
        element = <TextObject textObject={object as TextType} />
    } else if (isImageType(object)) {
        element = <ImageObject imageObject={object as ImageType} />
    } else if (isArtType(object)) {
        element = <ArtObject artObject={object as ArtType} />
    }

    return (
        <div
            onMouseDown={handleMouseDown}
            style={{
                width: `${object.width}px`,
                height: `${object.height}px`,
                left: `${object.posX}px`,
                top: `${object.posY}px`,
                outline: object.isSelected ? "2px dashed #0078D7FF" : undefined,
            }}
            className={classes.objectContainer}
        >
            {element}
            {object.isSelected ? (
                <ResizeControls resizeHandler={onInteraction} />
            ) : null}
        </div>
    )
}

export { ObjectView }
