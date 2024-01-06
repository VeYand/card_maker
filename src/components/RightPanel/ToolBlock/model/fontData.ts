type FontColorType = string
type FontSizeType = string
type FontFamilyType = string

const fontColors: FontColorType[] = [
    "red",
    "blue",
    "green",
    "purple",
    "orange",
    "brown",
    "cyan",
    "magenta",
    "pink",
    "teal",
    "navy",
    "gray",
    "black",
    "white",
]

const fontSizes: FontSizeType[] = [
    "3",
    "4",
    "5",
    "6",
    "9",
    "12",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
]

const fontFamilies: FontFamilyType[] = [
    "Arial",
    "Helvetica",
    "Verdana",
    "Trebuchet MS",
    "Gill Sans",
    "Noto Sans",
    "Times New Roman",
    "Courier New",
    "Georgia",
]

export type { FontColorType, FontSizeType, FontFamilyType }

export { fontColors, fontSizes, fontFamilies }
