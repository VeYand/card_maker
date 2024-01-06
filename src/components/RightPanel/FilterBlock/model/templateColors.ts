type Color = {
    r: number
    g: number
    b: number
    a: number
}

const colorList: { colorName: string; colorRGBA: Color }[] = [
    { colorName: "red", colorRGBA: { r: 255, g: 0, b: 0, a: 0.5 } },
    { colorName: "purple", colorRGBA: { r: 160, g: 32, b: 240, a: 0.5 } },
    { colorName: "lime", colorRGBA: { r: 0, g: 255, b: 0, a: 0.5 } },
    { colorName: "gray", colorRGBA: { r: 128, g: 128, b: 128, a: 0.5 } },
]

export type { Color }
export { colorList }
