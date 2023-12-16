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
  const allObjects = useAppSelector((state) => state.objects);
  const onInteraction = useObjectInteraction({
    currentObject: object,
    otherObjects: allObjects.filter((curObject) => {
      return curObject.isSelected && object.id !== curObject.id;
    }),
    canvasSize: useAppSelector((state) => state.canvas),
    dispatch,
  });
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (object.isSelected) {
      onInteraction(e);
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
      <Text textObject={object as TextType} onInteraction={onInteraction} />
    );
  } else if (isImageType(object)) {
    element = (
      <Image imageObject={object as ImageType} onInteraction={onInteraction} />
    );
  } else if (isArtType(object)) {
    element = (
      <ArtObject artObject={object as ArtType} onInteraction={onInteraction} />
    );
  }

  return (
    <div>
      <div onMouseDown={handleMouseDown}>{element}</div>
    </div>
  );
};

export { ObjectView };
