import React from "react";
import { TextType } from "../../../types/types";
import classes from "./Text.module.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import ResizeControls from "../ResizeControls/ResizeControls";
import { ResizeDirection } from "../ResizeControls/ResizeDirection";
import { changeTextObject } from "../model/objectsSlice";

interface TextProps {
  textObject: TextType;
  onResize: (
    e: React.MouseEvent<HTMLDivElement>,
    resizeDirection: ResizeDirection,
  ) => void;
}

const Text = ({ textObject, onResize }: TextProps) => {
  const canvasSize = useAppSelector((state) => state.canvas);
  const dispatch = useAppDispatch();

  const handleTextChange = (value: string) => {
    dispatch(
      changeTextObject({
        id: textObject.id,
        posX: textObject.posX,
        posY: textObject.posY,
        scaleX: textObject.scaleX,
        scaleY: textObject.scaleY,
        content: value,
        fontSize: textObject.fontSize,
        fontColor: textObject.fontColor,
        fontFamily: textObject.fontFamily,
        isSelected: textObject.isSelected,
        decorations: textObject.decorations,
      }),
    );
  };

  return (
    <div
      className={classes.textContainer}
      style={{
        width: `${textObject.scaleX * canvasSize.width}px`,
        height: `${textObject.scaleY * canvasSize.height}px`,
        left: `${textObject.posX * canvasSize.width}px`,
        top: `${textObject.posY * canvasSize.height}px`,
        border: textObject.isSelected ? "2px solid blue" : "",
      }}
    >
      <input
        value={textObject.content}
        className={classes.text}
        style={{
          fontSize: `${textObject.fontSize}px`,
          color: textObject.fontColor,
          fontFamily: textObject.fontFamily,
          fontStyle: textObject.decorations.includes("italic")
            ? "italic"
            : "normal",
          fontWeight: textObject.decorations.includes("bold")
            ? "bold"
            : "normal",
          textDecoration: textObject.decorations.includes("underline")
            ? "underline"
            : "none",
        }}
        onChange={(e) => handleTextChange(e.target.value)}
        onBlur={() => {
          console.log("Text edited");
        }}
      />
      {textObject.isSelected ? (
        <ResizeControls resizeHandler={onResize} />
      ) : null}
    </div>
  );
};

export { Text };
