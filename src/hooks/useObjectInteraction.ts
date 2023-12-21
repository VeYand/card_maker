import React, { useEffect, useState } from "react";
import { BoundingBoxType, ObjectType } from "../types/types";
import { ResizeDirection } from "../components/Objects/ResizeControls/ResizeDirection";

const topResize = (
  oldScaleY: number,
  deltaY: number,
  oldPosY: number,
): [number, number] => {
  let newScaleY: number = oldScaleY;
  let newPosY: number = oldPosY;
  const scaleY = oldScaleY - deltaY;
  if (
    scaleY > 0.05 &&
    scaleY < 1 &&
    oldPosY + deltaY > 0 &&
    oldPosY + deltaY < 1
  ) {
    newScaleY = scaleY;
    newPosY = oldPosY + deltaY;
  }
  return [newScaleY, newPosY];
};
const bottomResize = (
  oldScaleY: number,
  deltaY: number,
  oldPosY: number,
): [number, number] => {
  let newScaleY: number = oldScaleY;
  const scaleY = oldScaleY + deltaY;
  if (
    scaleY > 0.05 &&
    scaleY < 1 &&
    oldPosY + scaleY > 0 &&
    oldPosY + scaleY < 1
  ) {
    newScaleY = scaleY;
  }
  return [newScaleY, oldPosY];
};

const rightResize = (
  oldScaleX: number,
  deltaX: number,
  oldPosX: number,
): [number, number] => {
  let newScaleX: number = oldScaleX;
  const scaleX = oldScaleX + deltaX;
  if (
    scaleX > 0.05 &&
    scaleX < 1 &&
    oldPosX + scaleX > 0 &&
    oldPosX + scaleX < 1
  ) {
    newScaleX = scaleX;
  }
  return [newScaleX, oldPosX];
};

const leftResize = (
  oldScaleX: number,
  deltaX: number,
  oldPosX: number,
): [number, number] => {
  let newScaleX: number = oldScaleX;
  let newPosX: number = oldPosX;
  const scaleX = oldScaleX - deltaX;
  if (
    scaleX > 0.05 &&
    scaleX < 1 &&
    oldPosX + deltaX > 0 &&
    oldPosX + deltaX < 1
  ) {
    newScaleX = scaleX;
    newPosX = oldPosX + deltaX;
  }
  return [newScaleX, newPosX];
};

const resize = (
  object: ObjectType,
  deltaX: number,
  deltaY: number,
  isResizing: ResizeDirection,
): BoundingBoxType => {
  let newScaleX = object.scaleX;
  let newScaleY = object.scaleY;
  let newPosX = object.posX;
  let newPosY = object.posY;

  switch (isResizing) {
    case "top":
      [newScaleY, newPosY] = topResize(object.scaleY, deltaY, object.posY);
      break;
    case "bottom":
      [newScaleY, newPosY] = bottomResize(object.scaleY, deltaY, object.posY);
      break;
    case "right":
      [newScaleX, newPosX] = rightResize(object.scaleX, deltaX, object.posX);
      break;
    case "left":
      [newScaleX, newPosX] = leftResize(object.scaleX, deltaX, object.posX);
      break;
    case "top-left":
      [newScaleY, newPosY] = topResize(object.scaleY, deltaY, object.posY);
      [newScaleX, newPosX] = leftResize(object.scaleX, deltaX, object.posX);
      break;
    case "top-right":
      [newScaleY, newPosY] = topResize(object.scaleY, deltaY, object.posY);
      [newScaleX, newPosX] = rightResize(object.scaleX, deltaX, object.posX);
      break;
    case "bottom-left":
      [newScaleY, newPosY] = bottomResize(object.scaleY, deltaY, object.posY);
      [newScaleX, newPosX] = leftResize(object.scaleX, deltaX, object.posX);
      break;
    case "bottom-right":
      [newScaleY, newPosY] = bottomResize(object.scaleY, deltaY, object.posY);
      [newScaleX, newPosX] = rightResize(object.scaleX, deltaX, object.posX);
      break;
  }
  return {
    posX: newPosX,
    posY: newPosY,
    scaleX: newScaleX,
    scaleY: newScaleY,
  };
};

interface ObjectInteractionProps {
  currentObject: ObjectType;
  otherObjects: ObjectType[];
  canvasSize: { width: number; height: number };
  changeObject: (newObject: ObjectType) => void;
}

const useObjectInteraction = ({
  currentObject,
  otherObjects,
  canvasSize,
  changeObject,
}: ObjectInteractionProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragStartObject, setDragStartObject] = useState({
    x: currentObject.posX,
    y: currentObject.posY,
  });
  const [isResizing, setIsResizing] = useState<ResizeDirection | null>(null);

  const clamp = (value: number, min: number, max: number, sideSize: number) => {
    if (sideSize + value > 1) {
      return 1 - sideSize;
    }
    return Math.min(Math.max(value, min), max);
  };

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement>,
    resizeDirection?: ResizeDirection,
  ) => {
    if (resizeDirection) {
      setIsResizing(resizeDirection);
    } else {
      setIsDragging(true);
      setDragStart({ x: event.clientX, y: event.clientY });
      setDragStartObject({ x: currentObject.posX, y: currentObject.posY });
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      const deltaX = (event.clientX - dragStart.x) / canvasSize.width;
      const deltaY = (event.clientY - dragStart.y) / canvasSize.height;

      const posX = dragStartObject.x + deltaX;
      const posY = dragStartObject.y + deltaY;

      const boundingBox: BoundingBoxType = {
        posX: clamp(posX, 0, 1, currentObject.scaleX),
        posY: clamp(posY, 0, 1, currentObject.scaleY),
        scaleX: currentObject.scaleX,
        scaleY: currentObject.scaleY,
      };

      changeObject({
        ...currentObject,
        ...boundingBox,
      });
      if (!isResizing) {
        otherObjects.forEach((obj) => {
          const posX = obj.posX + deltaX;
          const posY = obj.posY + deltaY;
          changeObject({
            ...obj,
            posX: clamp(posX, 0, 1, obj.scaleX),
            posY: clamp(posY, 0, 1, obj.scaleY),
            scaleX: obj.scaleX,
            scaleY: obj.scaleY,
          });
        });
      }

      setDragStartObject({ x: boundingBox.posX, y: boundingBox.posY });
      setDragStart({ x: event.clientX, y: event.clientY });
    }
    if (isResizing) {
      const deltaX = (event.clientX - dragStart.x) / canvasSize.width;
      const deltaY = (event.clientY - dragStart.y) / canvasSize.height;

      changeObject({
        ...currentObject,
        ...resize(currentObject, deltaX, deltaY, isResizing),
      });
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (event: MouseEvent) => {
      handleMouseMove(event);
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setIsResizing(null);
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, isResizing, handleMouseMove]);

  return handleMouseDown;
};

export { useObjectInteraction };
