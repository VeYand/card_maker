import { CardTemplateType } from "../types/types"

const cardTemplates: CardTemplateType[] = [
    {
        title: "Christmas",
        previewImageSrc: "images/cardTemplates/christmas.png",
        data: {
            canvas: { width: 800, height: 600 },
            filter: { r: 0, g: 0, b: 0, a: 0 },
            objects: [
                {
                    height: 618,
                    id: "1704573406786",
                    imageSrc: "images/imageObjects/christmasBackground.jpg",
                    isSelected: false,
                    posX: -72,
                    posY: -9,
                    width: 933,
                },
                {
                    id: "1704573421309",
                    isSelected: false,
                    posX: 39,
                    posY: 59,
                    width: 429,
                    height: 312,
                    content:
                        "Пускай Господь оберегает\nВас каждый день и каждый час,\nВо всех делах пусть помогает\nИ пусть всегда хранит он Вас!\n\nЧтоб в доме был уют, покой,\nА близкие ― здоровы,\nВас поздравляю всей душой\nЯ с Рождеством Христовым!\n\n",
                    fontColor: "white",
                    fontSize: 25,
                    fontFamily: "Verdana",
                    decorations: [],
                },
            ],
        },
    },
    {
        title: "Birthday",
        previewImageSrc: "images/cardTemplates/birthday.png",
        data: {
            canvas: { width: 800, height: 600 },
            filter: { r: 0, g: 0, b: 0, a: 0 },
            objects: [
                {
                    height: 618,
                    id: "1704765786",
                    imageSrc: "images/imageObjects/birthdayBackground.jpg",
                    isSelected: false,
                    posX: -72,
                    posY: -9,
                    width: 933,
                },
                {
                    id: "1703453421309",
                    isSelected: false,
                    posX: 39,
                    posY: 59,
                    width: 429,
                    height: 420,
                    content:
                        "Поздравляю с днем рождения! Желаю здоровья, душевного благополучия и денежного изобилия. Пусть твои желания будут исполнены, цели достигнуты, а проблемы решены! С днем рождения!",
                    fontColor: "white",
                    fontSize: 35,
                    fontFamily: "Verdana",
                    decorations: [],
                },
            ],
        },
    },
]

export { cardTemplates }
