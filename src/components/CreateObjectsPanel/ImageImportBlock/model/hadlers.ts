import React from "react"
import { CanvasType, ImageType } from "../../../../types/types"

const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    canvasSize: CanvasType,
    addImage: (imageObject: ImageType) => void,
) => {
    const file = e.target.files?.[0]

    if (!file) {
        return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
        const base64Data = event.target?.result as string

        const image = new Image()
        image.src = base64Data

        image.onload = () => {
            const width = image.width
            const height = image.height

            const proportions = Math.max(
                width / canvasSize.width,
                height / canvasSize.height,
            )

            const imageObject: ImageType = {
                id: Date.now().toString(),
                imageSrc: base64Data,
                isSelected: true,
                posX: 0,
                posY: 0,
                width: proportions > 1 ? width / proportions : width,
                height: proportions > 1 ? height / proportions : height,
            }

            addImage(imageObject)
        }
    }
    reader.readAsDataURL(file)
}

export { handleImageUpload }
