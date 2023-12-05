import React from "react";
import {
  ArtType,
  ImageType,
  isArtType,
  isImageType,
  isTextType,
  ObjectType,
  TextType,
} from "../../../types/types";
import { Text } from "../Text/Text";
import { Image } from "../Image/Image";
import { ArtObject } from "../ArtObject/ArtObject";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { objectsSlice } from "../model/objectsSlice";
import { useObjectInteraction } from "../../../hooks/useObjectInteraction";

interface ObjectProps {
  object: ObjectType;
}

const ObjectView = ({ object }: ObjectProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const canvasSize = useAppSelector((state) => state.canvasSlice);

  const { handleMouseDown } = useObjectInteraction({
    object,
    canvasSize,
    dispatch,
  });

  let element: React.ReactElement = <></>;
  if (isTextType(object)) {
    element = (
      <Text textObject={object as TextType} onResize={handleMouseDown} />
    );
  } else if (isImageType(object)) {
    element = (
      <Image imageObject={object as ImageType} onResize={handleMouseDown} />
    );
  } else if (isArtType(object)) {
    element = (
      <ArtObject artObject={object as ArtType} onResize={handleMouseDown} />
    );
  }

  return (
    <div>
      <div
        onMouseDown={object.isSelected ? handleMouseDown : undefined}
        onClick={(e) => {
          e.stopPropagation();
          dispatch(
            objectsSlice.actions.changeObjectIsSelected({
              objectId: object.id,
              isSelected: true,
            }),
          );
        }}
      >
        {element}
      </div>
    </div>
  );
};

export { ObjectView };
