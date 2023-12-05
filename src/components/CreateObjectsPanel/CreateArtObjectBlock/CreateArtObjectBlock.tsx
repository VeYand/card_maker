import React from "react";
import classes from "./CreateArtObjectBlock.module.css";
import { artObjectList } from "./data/ArtObjectList";
import { useAppDispatch } from "../../../redux/hooks";
import { objectsSlice } from "../../Objects/model/objectsSlice";
import { addObject } from "../../Objects/model/objectsSlice";

const CreateArtObjectBlock = () => {
  const dispatch = useAppDispatch();

  const createArtObject = (src: string) => {
    dispatch(
      addObject({
        id: Date.now().toString(),
        objectSrc: src,
        isSelected: false,
        posX: 0,
        posY: 0,
        scaleX: 0.2,
        scaleY: 0.2,
      }),
    );
  };

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>Арт Объекты</h3>
      <div className={classes.previewImagesBlock}>
        {artObjectList.map((src: string) => {
          return (
            <div key={src} onClick={() => createArtObject(src)}>
              <HandySvg src={src} className={classes.previewImage} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { CreateArtObjectBlock };
