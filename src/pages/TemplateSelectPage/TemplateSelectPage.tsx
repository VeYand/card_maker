import React from "react"
import { CardTemplate } from "../../components/CardTemplate/ui/CardTemplate"
import classes from "./TemplateSelectPage.module.css"
import { CardTemplateType } from "../../types/types"
import { cardTemplates } from "../../data/cardTemplates"

interface ITemplateSelectPage {
    setSelectedTemplate: (selectedTemplate: CardTemplateType | null) => void
}

const TemplateSelectPage = ({ setSelectedTemplate }: ITemplateSelectPage) => {
    const emptyCardTemplate: CardTemplateType = {
        title: "Empty",
    }

    return (
        <div className={classes.pageContainer}>
            <div className={classes.title}>Select a card template</div>
            <div className={classes.cardTemplateContainer}>
                <div onClick={() => setSelectedTemplate(emptyCardTemplate)}>
                    <CardTemplate cardTemplate={emptyCardTemplate} />
                </div>
                {cardTemplates.map((card) => (
                    <div
                        key={card.title}
                        onClick={() => setSelectedTemplate(card)}
                    >
                        <CardTemplate cardTemplate={card} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export { TemplateSelectPage }
