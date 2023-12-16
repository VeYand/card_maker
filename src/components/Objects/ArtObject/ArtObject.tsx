import React from "react";
import { ArtType } from "../../../types/types";
import classes from "./ArtObject.module.css";
import { useAppSelector } from "../../../redux/hooks";
import { ResizeDirection } from "../ResizeControls/ResizeDirection";
import ResizeControls from "../ResizeControls/ResizeControls";

interface ArtObjectProps {
  artObject: ArtType;
  onInteraction: (
    e: React.MouseEvent<HTMLDivElement>,
    resizeDirection: ResizeDirection,
  ) => void;
}

const ArtObject = ({ artObject, onInteraction }: ArtObjectProps) => {
  const canvasSize = useAppSelector((state) => state.canvas);

  return (
    <div
      className={classes.artObjectContainer}
      style={{
        width: `${artObject.scaleX * canvasSize.width}px`,
        height: `${artObject.scaleY * canvasSize.height}px`,
        position: "absolute",
        left: `${artObject.posX * canvasSize.width}px`,
        top: `${artObject.posY * canvasSize.height}px`,
        outline: artObject.isSelected ? "2px solid blue" : "",
      }}
    >
      <img src={artObject.objectSrc} className={classes.artObject} />
      {artObject.isSelected ? (
        <ResizeControls resizeHandler={onInteraction} />
      ) : null}
    </div>
  );
};

export { ArtObject };
