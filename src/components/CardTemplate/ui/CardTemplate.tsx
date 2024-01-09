import React from "react"
import { CardTemplateType } from "../../../types/types"
import classes from "./CardTemplate.module.css"

interface ICardTemplate {
    cardTemplate: CardTemplateType
}

const CardTemplate = ({ cardTemplate }: ICardTemplate) => {
    return (
        <div className={classes.container}>
            <div className={classes.image}>
                {cardTemplate.previewImageSrc ? (
                    <img
                        src={cardTemplate.previewImageSrc}
                        className={classes.image}
                    />
                ) : null}
            </div>

            <div className={classes.cardTitle}>{cardTemplate.title}</div>
        </div>
    )
}

export { CardTemplate }
