import React, { useEffect, useState } from "react"
import { BoundingBoxType, ObjectType, SizeType } from "../types/types"
import { ResizeDirectionType } from "../components/Objects/ResizeControls/model/ResizeDirectionType"

const topResize = (
    oldHeight: number,
    deltaY: number,
    oldPosY: number,
    minHeight: number,
): [number, number] => {
    return oldHeight - deltaY < minHeight
        ? [minHeight, oldPosY + oldHeight - minHeight]
        : [oldHeight - deltaY, oldPosY + deltaY]
}
const bottomResize = (
    oldHeight: number,
    deltaY: number,
    oldPosY: number,
    minHeight: number,
): [number, number] => {
    return oldHeight + deltaY < minHeight
        ? [minHeight, oldPosY]
        : [oldHeight + deltaY, oldPosY]
}

const rightResize = (
    oldWidth: number,
    deltaX: number,
    oldPosX: number,
    minWidth: number,
): [number, number] => {
    return oldWidth + deltaX < minWidth
        ? [minWidth, oldPosX]
        : [oldWidth + deltaX, oldPosX]
}

const leftResize = (
    oldWidth: number,
    deltaX: number,
    oldPosX: number,
    minWidth: number,
): [number, number] => {
    return oldWidth - deltaX < minWidth
        ? [minWidth, oldPosX + oldWidth - minWidth]
        : [oldWidth - deltaX, oldPosX + deltaX]
}

const resize = (
    object: ObjectType,
    minSize: SizeType,
    deltaX: number,
    deltaY: number,
    isResizing: ResizeDirectionType,
): BoundingBoxType => {
    let newWidth = object.width
    let newHeight = object.height
    let newPosX = object.posX
    let newPosY = object.posY

    switch (isResizing) {
        case "top":
            ;[newHeight, newPosY] = topResize(
                object.height,
                deltaY,
                object.posY,
                minSize.height,
            )
            break
        case "bottom":
            ;[newHeight, newPosY] = bottomResize(
                object.height,
                deltaY,
                object.posY,
                minSize.height,
            )
            break
        case "right":
            ;[newWidth, newPosX] = rightResize(
                object.width,
                deltaX,
                object.posX,
                minSize.width,
            )
            break
        case "left":
            ;[newWidth, newPosX] = leftResize(
                object.width,
                deltaX,
                object.posX,
                minSize.width,
            )
            break
        case "top-left":
            ;[newHeight, newPosY] = topResize(
                object.height,
                deltaY,
                object.posY,
                minSize.height,
            )
            ;[newWidth, newPosX] = leftResize(
                object.width,
                deltaX,
                object.posX,
                minSize.width,
            )
            break
        case "top-right":
            ;[newHeight, newPosY] = topResize(
                object.height,
                deltaY,
                object.posY,
                minSize.height,
            )
            ;[newWidth, newPosX] = rightResize(
                object.width,
                deltaX,
                object.posX,
                minSize.width,
            )
            break
        case "bottom-left":
            ;[newHeight, newPosY] = bottomResize(
                object.height,
                deltaY,
                object.posY,
                minSize.height,
            )
            ;[newWidth, newPosX] = leftResize(
                object.width,
                deltaX,
                object.posX,
                minSize.width,
            )
            break
        case "bottom-right":
            ;[newHeight, newPosY] = bottomResize(
                object.height,
                deltaY,
                object.posY,
                minSize.height,
            )
            ;[newWidth, newPosX] = rightResize(
                object.width,
                deltaX,
                object.posX,
                minSize.width,
            )
            break
    }

    return {
        posX: newPosX,
        posY: newPosY,
        width: newWidth,
        height: newHeight,
    }
}

interface ObjectInteractionProps {
    currentObject: ObjectType
    otherObjects: ObjectType[]
    changeObject: (newObject: ObjectType) => void
    minSize: SizeType
}

const useObjectInteraction = ({
    currentObject,
    otherObjects,
    changeObject,
    minSize,
}: ObjectInteractionProps) => {
    const [isDragging, setIsDragging] = useState(false)

    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
    const [dragStartObject, setDragStartObject] = useState({
        x: currentObject.posX,
        y: currentObject.posY,
    })
    const [resizeDirection, setResizeDirection] =
        useState<ResizeDirectionType | null>(null)

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement>,
        resizeDirection?: ResizeDirectionType,
    ) => {
        if (resizeDirection) {
            setResizeDirection(resizeDirection)
        } else {
            setIsDragging(true)
            setDragStart({ x: event.clientX, y: event.clientY })
            setDragStartObject({ x: currentObject.posX, y: currentObject.posY })
        }
    }

    const handleMouseMove = (event: MouseEvent) => {
        const deltaX = event.clientX - dragStart.x
        const deltaY = event.clientY - dragStart.y

        if (isDragging) {
            const posX = dragStartObject.x + deltaX
            const posY = dragStartObject.y + deltaY

            changeObject({
                ...currentObject,
                posX: posX,
                posY: posY,
            })

            if (!resizeDirection) {
                otherObjects.forEach((obj) => {
                    const posX = obj.posX + deltaX
                    const posY = obj.posY + deltaY
                    changeObject({
                        ...obj,
                        posX: posX,
                        posY: posY,
                    })
                })
            }

            setDragStartObject({ x: posX, y: posY })
            setDragStart({ x: event.clientX, y: event.clientY })
        }
        if (resizeDirection) {
            const deltaX = event.clientX - dragStart.x
            const deltaY = event.clientY - dragStart.y

            changeObject({
                ...currentObject,
                ...resize(
                    currentObject,
                    minSize,
                    deltaX,
                    deltaY,
                    resizeDirection,
                ),
            })
        }
    }

    useEffect(() => {
        const handleGlobalMouseMove = (event: MouseEvent) => {
            handleMouseMove(event)
        }

        const handleGlobalMouseUp = () => {
            setIsDragging(false)
            setResizeDirection(null)
        }

        window.addEventListener("mousemove", handleGlobalMouseMove)
        window.addEventListener("mouseup", handleGlobalMouseUp)

        return () => {
            window.removeEventListener("mousemove", handleGlobalMouseMove)
            window.removeEventListener("mouseup", handleGlobalMouseUp)
        }
    }, [isDragging, resizeDirection, handleMouseMove])

    return handleMouseDown
}

export { useObjectInteraction }
