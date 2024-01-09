import "./styles/styles.css"
import { CardEditorPage } from "./pages/CardEditorPage/CardEditorPage"
import { useState } from "react"
import { CardTemplateType } from "./types/types"
import { TemplateSelectPage } from "./pages/TemplateSelectPage/TemplateSelectPage"

const App = () => {
    const [selectedTemplate, setSelectedTemplate] =
        useState<CardTemplateType | null>(null)

    return selectedTemplate !== null ? (
        <CardEditorPage selectedTemplate={selectedTemplate.data} />
    ) : (
        <TemplateSelectPage setSelectedTemplate={setSelectedTemplate} />
    )
}

export { App }
