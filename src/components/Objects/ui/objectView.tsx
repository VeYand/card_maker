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
import {
  changeObjectIsSelected,
  resetAllSelections,
} from "../model/objectsSlice";
import { useObjectInteraction } from "../../../hooks/useObjectInteraction";

interface ObjectProps {
  object: ObjectType;
  multiplySelect: boolean;
}

const ObjectView = ({
  object,
  multiplySelect,
}: ObjectProps): React.ReactElement => {
  const dispatch = useAppDispatch();
  const canvasSize = useAppSelector((state) => state.canvas);

  const handleInteraction = useObjectInteraction({
    object,
    canvasSize,
    multiplySelect,
    dispatch,
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (object.isSelected) {
      handleInteraction.handleMouseDown(e);
      return;
    }

    if (!multiplySelect) {
      dispatch(resetAllSelections());
    }

    dispatch(
      changeObjectIsSelected({
        objectId: object.id,
        isSelected: true,
      }),
    );
  };

  let element: React.ReactElement = <></>;
  if (isTextType(object)) {
    element = (
      <Text
        textObject={object as TextType}
        onResize={handleInteraction.handleMouseDown}
      />
    );
  } else if (isImageType(object)) {
    element = (
      <Image
        imageObject={object as ImageType}
        onResize={handleInteraction.handleMouseDown}
      />
    );
  } else if (isArtType(object)) {
    element = (
      <ArtObject
        artObject={object as ArtType}
        onResize={handleInteraction.handleMouseDown}
      />
    );
  }

  return (
    <div>
      <div onMouseDown={handleMouseDown}>{element}</div>
    </div>
  );
};

export { ObjectView };
