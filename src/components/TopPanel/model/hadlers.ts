import { CardDataType, ObjectType } from "../../../types/types"
import React from "react"
import html2canvas from "html2canvas"

const saveAsJson = (
    cardData: CardDataType,
    showMessage: (message: string) => void,
) => {
    const jsonString = JSON.stringify(cardData)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "YourCard.json"
    a.click()
    URL.revokeObjectURL(url)
    showMessage("Saved successfully")
}

// eslint-disable-next-line
const validateObject = (obj: any): obj is ObjectType => {
    return (
        typeof obj.id === "string" &&
        typeof obj.isSelected === "boolean" &&
        typeof obj.width === "number" &&
        typeof obj.height === "number" &&
        typeof obj.posX === "number" &&
        typeof obj.posY === "number" &&
        (typeof obj.objectSrc === "string" ||
            typeof obj.imageSrc === "string" ||
            (typeof obj.content === "string" &&
                typeof obj.fontSize === "number" &&
                typeof obj.fontColor === "string" &&
                typeof obj.fontFamily === "string" &&
                Array.isArray(obj.decorations) &&
                obj?.decorations?.every(
                    // eslint-disable-next-line
                    (decoration: any) => typeof decoration === "string",
                )))
    )
}

// eslint-disable-next-line
const validateCardData = (data: any): data is CardDataType => {
    return (
        typeof data.canvas === "object" &&
        typeof data.canvas.width === "number" &&
        typeof data.canvas.height === "number" &&
        typeof data.filter === "object" &&
        typeof data.filter.r === "number" &&
        typeof data.filter.g === "number" &&
        typeof data.filter.b === "number" &&
        typeof data.filter.a === "number" &&
        Array.isArray(data.objects) &&
        // eslint-disable-next-line
        data?.objects?.every((obj: any) => validateObject(obj))
    )
}

const handleJSONLoad = (
    event: React.ChangeEvent<HTMLInputElement>,
    loadCard: (cardData: CardDataType | null, errorMessage?: string) => void,
) => {
    const fileInput = event.target
    const file = fileInput.files?.[0]
    if (file) {
        const reader = new FileReader()

        reader.onload = (e) => {
            try {
                const jsonString = e.target?.result as string
                const jsonData = JSON.parse(jsonString)
                if (validateCardData(jsonData)) {
                    loadCard(jsonData as CardDataType)
                } else {
                    loadCard(null, "Error loading JSON: Invalid format")
                }
            } catch (error) {
                loadCard(null, "Error loading JSON")
            }
        }

        reader.readAsText(file)
    }
}

const replaceTextareaWithP = (canvas: HTMLCanvasElement | null) => {
    const textAreas = canvas?.querySelectorAll("textarea")
    const replacementData: {
        textarea: HTMLTextAreaElement
        p: HTMLParagraphElement
    }[] = []

    if (textAreas) {
        textAreas.forEach((textarea) => {
            const p = document.createElement("p")
            p.textContent = textarea.value

            const textareaStyles = window.getComputedStyle(textarea)
            for (let i = 0; i < textareaStyles.length; i++) {
                const styleName = textareaStyles[i]
                p.style.setProperty(
                    styleName,
                    textareaStyles.getPropertyValue(styleName),
                )
            }

            replacementData.push({ textarea, p })

            textarea.parentNode?.replaceChild(p, textarea)
        })
    }

    return replacementData
}

const saveAsImage = (
    format: "JPEG" | "PNG",
    showMessage: (message: string) => void,
) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement | null

    if (canvas) {
        const originalTextareaData = replaceTextareaWithP(canvas)

        html2canvas(canvas, {
            useCORS: true,
        })
            .then((canvasSnapshot) => {
                const link = document.createElement("a")
                switch (format) {
                    case "JPEG":
                        link.href = canvasSnapshot.toDataURL("image/jpeg")
                        break
                    case "PNG":
                        link.href = canvasSnapshot.toDataURL("image/png")
                        break
                    default:
                        link.href = canvasSnapshot.toDataURL("image/png")
                        break
                }

                link.download = "canvas_image." + format
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)

                originalTextareaData.forEach(({ textarea, p }) => {
                    p.parentNode?.replaceChild(textarea, p)
                })
                showMessage("Saved successfully")
            })
            .catch(() => {
                originalTextareaData.forEach(({ textarea, p }) => {
                    p.parentNode?.replaceChild(textarea, p)
                })
                showMessage("Failed to save")
            })
    }
}

export { saveAsJson, handleJSONLoad, saveAsImage }
