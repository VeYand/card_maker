import { ArtType, ImageType, ObjectListType, TextType } from "../types/types";
import genetic from "../arts/genetic.svg";

const text: TextType = {
  id: "text1",
  content: "esgwergwe",
  fontSize: 25,
  fontColor: "red",
  fontFamily: "Arial",
  isSelected: false,
  scaleX: 0.2,
  scaleY: 0.3,
  posX: 0.2,
  posY: 0.5,
  decorations: ["italic"],
};

const image: ImageType = {
  id: "image2",
  imageSrc:
    "https://w.forfun.com/fetch/0d/0d325a7b06397ad7ebbb3988b1cef9d2.jpeg",
  isSelected: false,
  scaleX: 0.2,
  scaleY: 0.1,
  posX: 0.1,
  posY: 0.1,
};

const artObject: ArtType = {
  id: "art",
  objectSrc: genetic,
  isSelected: false,
  scaleX: 0.4,
  scaleY: 0.4,
  posX: 0.3,
  posY: 0.5,
};

const objectList: ObjectListType = [text, image, artObject];

export { objectList };
