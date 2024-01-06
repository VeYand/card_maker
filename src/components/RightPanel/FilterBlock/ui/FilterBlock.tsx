import React from "react"
import classes from "./FilterBlock.module.css"
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks"
import { saveState, setFilter } from "../../../../model/cardEditorSlice"
import { Color, colorList } from "../model/templateColors"

const FilterBlock = () => {
    const filter = useAppSelector((state) => state.cardEditor.filter)
    const dispatch = useAppDispatch()

    const changeColor = (color: "r" | "g" | "b" | "a", value: number) => {
        dispatch(
            setFilter({
                r: color === "r" ? value : filter.r,
                g: color === "g" ? value : filter.g,
                b: color === "b" ? value : filter.b,
                a: color === "a" ? value : filter.a,
            }),
        )
    }

    const changeColorTemplate = (color: Color) => {
        dispatch(setFilter(color))
        dispatch(saveState())
    }

    return (
        <div className={classes.container}>
            <h2 className={classes.containerTitle}>Filter</h2>
            <div className={classes.rangeInline}>
                <label htmlFor="red-color">R</label>
                <input
                    type="range"
                    id="red-color"
                    min="1"
                    max="255"
                    value={filter.r}
                    onChange={(e) => changeColor("r", Number(e.target.value))}
                    onMouseUp={() => dispatch(saveState())}
                />
            </div>
            <div className={classes.rangeInline}>
                <label htmlFor="green-color">G</label>
                <input
                    type="range"
                    id="green-color"
                    min="1"
                    max="255"
                    value={filter.g}
                    onChange={(e) => changeColor("g", Number(e.target.value))}
                    onMouseUp={() => dispatch(saveState())}
                />
            </div>
            <div className={classes.rangeInline}>
                <label htmlFor="blue-color">B</label>
                <input
                    type="range"
                    id="blue-color"
                    min="1"
                    max="255"
                    value={filter.b}
                    onChange={(e) => changeColor("b", Number(e.target.value))}
                    onMouseUp={() => dispatch(saveState())}
                />
            </div>
            <div className={classes.rangeInline}>
                <label htmlFor="alpha-channel">A</label>
                <input
                    type="range"
                    id="alpha-channel"
                    min="0"
                    max="100"
                    value={filter.a * 100}
                    onChange={(e) =>
                        changeColor("a", Number(e.target.value) / 100)
                    }
                    onMouseUp={() => dispatch(saveState())}
                />
            </div>

            <div className={classes.colorPicketBlock}>
                {colorList.map((color) => {
                    return (
                        <div
                            key={color.colorName}
                            className={classes.colorTemplate}
                            style={{
                                backgroundColor: `rgb(${color.colorRGBA.r}, ${color.colorRGBA.g}, ${color.colorRGBA.b})`,
                            }}
                            onClick={() => changeColorTemplate(color.colorRGBA)}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export { FilterBlock }
