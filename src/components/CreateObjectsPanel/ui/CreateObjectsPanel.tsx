import React from "react"
import classes from "./CreateObjectsPanel.module.css"
import { ImageImportBlock } from "../ImageImportBlock/ui/ImageImportBlock"
import { CreateTextBlock } from "../CreateTextBlock/ui/CreateTextBlock"
import { CreateArtObjectBlock } from "../CreateArtObjectBlock/ui/CreateArtObjectBlock"

const CreateObjectsPanel = () => {
    return (
        <div className={classes.container}>
            <ImageImportBlock />
            <CreateTextBlock />
            <CreateArtObjectBlock />
        </div>
    )
}

export { CreateObjectsPanel }
