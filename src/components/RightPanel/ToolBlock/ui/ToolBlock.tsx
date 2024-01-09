import React from "react"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"
import {
    changeObject,
    moveBackground,
    moveForeground,
    removeObjects,
} from "../../../../model/cardEditorSlice"
import {
    isArtType,
    isImageType,
    isTextType,
    ObjectType,
    TextDecoration,
    TextType,
} from "../../../../types/types"
import classes from "./ToolBlock.module.css"
import { CustomSelect } from "../../../../common/CustomSelect/CustomSelect"
import {
    fontColors,
    FontColorType,
    fontFamilies,
    FontFamilyType,
    fontSizes,
    FontSizeType,
} from "../model/fontData"
import { Button } from "../../../../common/Button/Button"

const ToolBlock = () => {
    const objects = useAppSelector((state) => state.cardEditor.objects)
    const dispatch = useAppDispatch()
    const selectedObjects = objects.filter((object: ObjectType) => {
        return object.isSelected
    })
    const isMultiplySelect = selectedObjects.length > 1

    if (selectedObjects.length < 1) {
        return <></>
    }

    const selectedObject = selectedObjects[0]
    let selectedObjectType: string
    if (isTextType(selectedObject)) {
        selectedObjectType = "text"
    } else if (isImageType(selectedObject)) {
        selectedObjectType = "image"
    } else if (isArtType(selectedObject)) {
        selectedObjectType = "art object"
    } else {
        selectedObjectType = "object"
    }

    const removeSelectedObjects = () => {
        dispatch(removeObjects(selectedObjects))
    }

    const changeTextColor = (newColor: FontColorType) => {
        dispatch(
            changeObject({
                ...selectedObject,
                fontColor: newColor,
            }),
        )
    }

    const changeTextSize = (newSize: FontSizeType) => {
        dispatch(
            changeObject({
                ...selectedObject,
                fontSize: Number(newSize),
            }),
        )
    }

    const changeTextFontFamily = (newFontFamily: FontFamilyType) => {
        dispatch(
            changeObject({
                ...selectedObject,
                fontFamily: newFontFamily,
            }),
        )
    }

    const addTextDecoration = (newTextDecoration: TextDecoration) => {
        const oldDecorations = (selectedObject as TextType).decorations
        if (!oldDecorations.includes(newTextDecoration)) {
            dispatch(
                changeObject({
                    ...selectedObject,
                    decorations: [...oldDecorations, newTextDecoration],
                }),
            )
        }
    }

    const removeTextDecoration = (decoration: TextDecoration) => {
        const oldDecorations = (selectedObject as TextType).decorations
        dispatch(
            changeObject({
                ...selectedObject,
                decorations: oldDecorations.filter((dec) => dec !== decoration),
            }),
        )
    }

    const moveForegroundClickHandler = () => {
        dispatch(moveForeground(selectedObjects))
    }

    const moveBackgroundClickHandler = () => {
        dispatch(moveBackground(selectedObjects))
    }

    return (
        <div className={classes.container}>
            <h3 className={classes.containerTitle}>
                {!isMultiplySelect
                    ? "Selected object: " + selectedObjectType
                    : "Multiple selection"}
            </h3>
            {isTextType(selectedObject) && !isMultiplySelect ? (
                <div className={classes.textPropsChangeContainer}>
                    <CustomSelect
                        options={fontColors}
                        defaultValue={"Choose a color"}
                        value={(selectedObject as TextType).fontColor}
                        onChange={changeTextColor}
                    />
                    <CustomSelect
                        options={fontSizes}
                        defaultValue={"Choose a font size"}
                        value={(selectedObject as TextType).fontSize.toString()}
                        onChange={changeTextSize}
                    />
                    <CustomSelect
                        options={fontFamilies}
                        defaultValue={"Choose a font family"}
                        value={(selectedObject as TextType).fontFamily}
                        onChange={changeTextFontFamily}
                    />
                    <label className={classes.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={(
                                selectedObject as TextType
                            ).decorations.includes("italic")}
                            onChange={(e) => {
                                e.target.checked
                                    ? addTextDecoration("italic")
                                    : removeTextDecoration("italic")
                            }}
                        />
                        <span>Курсив</span>
                    </label>
                    <label className={classes.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={(
                                selectedObject as TextType
                            ).decorations.includes("bold")}
                            onChange={(e) => {
                                e.target.checked
                                    ? addTextDecoration("bold")
                                    : removeTextDecoration("bold")
                            }}
                        />
                        <span>Жирный</span>
                    </label>
                    <label className={classes.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={(
                                selectedObject as TextType
                            ).decorations.includes("underline")}
                            onChange={(e) => {
                                e.target.checked
                                    ? addTextDecoration("underline")
                                    : removeTextDecoration("underline")
                            }}
                        />
                        <span>Подчёркнутый</span>
                    </label>
                </div>
            ) : null}
            <div className={classes.buttonBlock}>
                <div className={classes.buttonsInline}>
                    <Button onClick={removeSelectedObjects}>
                        {isMultiplySelect
                            ? "Delete selected objects"
                            : "Delete the selected object"}
                    </Button>
                </div>
                <div className={classes.buttonsInline}>
                    <Button onClick={moveForegroundClickHandler}>
                        Move to the foreground
                    </Button>
                    <Button onClick={moveBackgroundClickHandler}>
                        Move to the background
                    </Button>
                </div>
            </div>
        </div>
    )
}

export { ToolBlock }
