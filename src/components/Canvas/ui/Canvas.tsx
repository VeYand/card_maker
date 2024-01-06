import React, { ReactNode } from "react"
import styles from "./Canvas.module.css"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { resetAllSelections } from "../../../model/cardEditorSlice"

interface CanvasProps {
    children?: ReactNode
}

const Canvas = (props: CanvasProps) => {
    const canvasSize = useAppSelector((state) => state.cardEditor.canvas)
    const filter = useAppSelector((state) => state.cardEditor.filter)
    const dispatch = useAppDispatch()
    return (
        <div className={styles.canvasWrapper}>
            <div
                id="canvas"
                className={styles.canvas}
                style={{ width: canvasSize.width, height: canvasSize.height }}
                onMouseDown={() => {
                    dispatch(resetAllSelections())
                }}
            >
                {props.children}
                <div
                    className={styles.filter}
                    style={{
                        backgroundColor: `rgba(${filter.r}, ${filter.g}, ${filter.b}, ${filter.a})`,
                    }}
                />
            </div>
        </div>
    )
}

export { Canvas }
