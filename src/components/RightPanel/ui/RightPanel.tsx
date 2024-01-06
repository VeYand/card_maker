import React from "react"
import classes from "./RightPanel.module.css"

import { FilterBlock } from "../FilterBlock/ui/FilterBlock"
import { ToolBlock } from "../ToolBlock/ui/ToolBlock"

const RightPanel = () => {
    return (
        <div className={classes.container}>
            <FilterBlock />
            <ToolBlock />
        </div>
    )
}

export { RightPanel }
