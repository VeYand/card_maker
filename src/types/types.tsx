type PositionType = {
    posX: number
    posY: number
}

type SizeType = {
    width: number
    height: number
}

type BoundingBoxType = PositionType & SizeType

type BaseElementType = BoundingBoxType & {
    id: string
    isSelected: boolean
}

type ArtType = BaseElementType & {
    objectSrc: string
}

type ImageType = BaseElementType & {
    imageSrc: string
}

type TextDecoration = "bold" | "italic" | "underline"

type TextType = BaseElementType & {
    content: string
    fontSize: number
    fontColor: string
    fontFamily: string
    decorations: TextDecoration[]
}

type ObjectType = ArtType | ImageType | TextType

type ObjectListType = ObjectType[]

const isArtType = (object: ObjectType): boolean => {
    return "objectSrc" in object
}

const isImageType = (object: ObjectType): boolean => {
    return "imageSrc" in object
}

const isTextType = (object: ObjectType): boolean => {
    return (
        "content" in object &&
        "fontSize" in object &&
        "fontColor" in object &&
        "fontFamily" in object
    )
}

type CanvasType = {
    width: number
    height: number
}

type FilterType = {
    r: number
    g: number
    b: number
    a: number
}

type CardDataType = {
    canvas: CanvasType
    filter: FilterType
    objects: ObjectListType
}

type CardTemplateType = {
    title: string
    previewImageSrc?: string
    data?: CardDataType
}

export type {
    SizeType,
    ArtType,
    ImageType,
    TextType,
    ObjectType,
    ObjectListType,
    BoundingBoxType,
    TextDecoration,
    CanvasType,
    FilterType,
    CardDataType,
    CardTemplateType,
}

export { isArtType, isImageType, isTextType }
