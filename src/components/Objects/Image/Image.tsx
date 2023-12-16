import React from "react";
import classes from "./Image.module.css";
import { ImageType } from "../../../types/types";
import { useAppSelector } from "../../../redux/hooks";
import ResizeControls from "../ResizeControls/ResizeControls";
import { ResizeDirection } from "../ResizeControls/ResizeDirection";

interface ImageProps {
  imageObject: ImageType;
  onResize: (
    e: React.MouseEvent<HTMLDivElement>,
    resizeDirection: ResizeDirection,
  ) => void;
}

const Image = ({ imageObject, onResize }: ImageProps) => {
  const canvasSize = useAppSelector((state) => state.canvas);

  return (
    <div
      className={classes.imageContainer}
      style={{
        width: `${imageObject.scaleX * canvasSize.width}px`,
        height: `${imageObject.scaleY * canvasSize.height}px`,
        left: `${imageObject.posX * canvasSize.width}px`,
        top: `${imageObject.posY * canvasSize.height}px`,
        outline: imageObject.isSelected ? "2px solid blue" : "",
      }}
    >
      <img src={imageObject.imageSrc} className={classes.image} alt={"image"} />
      {imageObject.isSelected ? (
        <ResizeControls resizeHandler={onResize} />
      ) : null}
    </div>
  );
};

export { Image };
