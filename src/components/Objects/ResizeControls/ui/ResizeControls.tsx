import React from "react"
import classes from "./ResizeControls.module.css"
import { ResizeDirectionType } from "../model/ResizeDirectionType"

interface IResizeControls {
    resizeHandler: (
        e: React.MouseEvent<HTMLDivElement>,
        resizeDirection: ResizeDirectionType,
    ) => void
}

const ResizeControls = ({ resizeHandler }: IResizeControls) => {
    return (
        <>
            <div
                className={classes.topControlLine}
                onMouseDown={(e) => {
                    resizeHandler(e, "top")
                }}
            />
            <div
                className={classes.bottomControlLine}
                onMouseDown={(e) => {
                    resizeHandler(e, "bottom")
                }}
            />
            <div
                className={classes.leftControlLine}
                onMouseDown={(e) => {
                    resizeHandler(e, "left")
                }}
            />
            <div
                className={classes.rightControlLine}
                onMouseDown={(e) => {
                    resizeHandler(e, "right")
                }}
            />
            <div
                className={classes.topLeftControlLine}
                onMouseDown={(e) => {
                    resizeHandler(e, "top-left")
                }}
            />
            <div
                className={classes.topRightControlLine}
                onMouseDown={(e) => {
                    resizeHandler(e, "top-right")
                }}
            />
            <div
                className={classes.bottomLeftControlLine}
                onMouseDown={(e) => {
                    resizeHandler(e, "bottom-left")
                }}
            />
            <div
                className={classes.bottomRightControlLine}
                onMouseDown={(e) => {
                    resizeHandler(e, "bottom-right")
                }}
            />
        </>
    )
}

export { ResizeControls }
