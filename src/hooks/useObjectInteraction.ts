import React, { useEffect, useState } from "react";
import { BoundingBoxType, ObjectType } from "../types/types";
import { useAppDispatch } from "../redux/hooks";
import { ResizeDirection } from "../components/Objects/ResizeControls/ResizeDirection";
import { objectsSlice } from "../components/Objects/model/objectsSlice";

interface ObjectInteractionProps {
  object: ObjectType;
  canvasSize: { width: number; height: number };
  dispatch: ReturnType<typeof useAppDispatch>;
}

const useObjectInteraction = ({
  object,
  canvasSize,
  dispatch,
}: ObjectInteractionProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragStartObject, setDragStartObject] = useState({
    x: object.posX,
    y: object.posY,
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
      //setResizeStart({ x: event.clientX, y: event.clientY });
    } else {
      setIsDragging(true);
      setDragStart({ x: event.clientX, y: event.clientY });
      setDragStartObject({ x: object.posX, y: object.posY });
    }
  };

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

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      const deltaX = (event.clientX - dragStart.x) / canvasSize.width;
      const deltaY = (event.clientY - dragStart.y) / canvasSize.height;

      const posX = dragStartObject.x + deltaX;
      const posY = dragStartObject.y + deltaY;

      const boundingBox: BoundingBoxType = {
        posX: clamp(posX, 0, 1, object.scaleX),
        posY: clamp(posY, 0, 1, object.scaleY),
        scaleX: object.scaleX,
        scaleY: object.scaleY,
      };

      dispatch(
        objectsSlice.actions.changeBoundingBox({
          objectId: object.id,
          boundingBox: boundingBox,
        }),
      );
      setDragStartObject({ x: boundingBox.posX, y: boundingBox.posY });
      setDragStart({ x: event.clientX, y: event.clientY });
    }
    if (isResizing) {
      const deltaX = (event.clientX - dragStart.x) / canvasSize.width;
      const deltaY = (event.clientY - dragStart.y) / canvasSize.height;

      let newScaleX = object.scaleX;
      let newScaleY = object.scaleY;
      let newPosX = object.posX;
      let newPosY = object.posY;

      switch (isResizing) {
        case "top":
          [newScaleY, newPosY] = topResize(object.scaleY, deltaY, object.posY);
          break;
        case "bottom":
          [newScaleY, newPosY] = bottomResize(
            object.scaleY,
            deltaY,
            object.posY,
          );
          break;
        case "right":
          [newScaleX, newPosX] = rightResize(
            object.scaleX,
            deltaX,
            object.posX,
          );
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
          [newScaleX, newPosX] = rightResize(
            object.scaleX,
            deltaX,
            object.posX,
          );
          break;
        case "bottom-left":
          [newScaleY, newPosY] = bottomResize(
            object.scaleY,
            deltaY,
            object.posY,
          );
          [newScaleX, newPosX] = leftResize(object.scaleX, deltaX, object.posX);
          break;
        case "bottom-right":
          [newScaleY, newPosY] = bottomResize(
            object.scaleY,
            deltaY,
            object.posY,
          );
          [newScaleX, newPosX] = rightResize(
            object.scaleX,
            deltaX,
            object.posX,
          );
          break;
      }

      const boundingBox: BoundingBoxType = {
        posX: newPosX,
        posY: newPosY,
        scaleX: newScaleX,
        scaleY: newScaleY,
      };

      dispatch(
        objectsSlice.actions.changeBoundingBox({
          objectId: object.id,
          boundingBox: boundingBox,
        }),
      );
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

  return { handleMouseDown, handleMouseMove };
};

export { useObjectInteraction };
