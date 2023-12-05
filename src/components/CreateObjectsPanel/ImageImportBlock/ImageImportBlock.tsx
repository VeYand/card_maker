import React from "react";
import { ImageType } from "../../../types/types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { addObject } from "../../Objects/model/objectsSlice";
import classes from "./ImageImportBlock.module.css";

const ImageImportBlock = () => {
  const canvasSize = useAppSelector((state) => state.canvas);
  const dispatch = useAppDispatch();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result as string;

      const image = new Image();
      image.src = base64Data;

      image.onload = () => {
        const width = image.width;
        const height = image.height;

        const proportions = Math.max(
          width / canvasSize.width,
          height / canvasSize.height,
        );

        const imageObject: ImageType = {
          id: Date.now().toString(),
          imageSrc: base64Data,
          isSelected: true,
          posX: 0,
          posY: 0,
          scaleX:
            proportions > 1
              ? Math.min(width / proportions / canvasSize.width, 0.9)
              : width / canvasSize.width,
          scaleY:
            proportions > 1
              ? Math.min(width / proportions / canvasSize.height, 0.9)
              : width / canvasSize.height,
        };

        dispatch(addObject(imageObject));
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={classes.block}>
      <h3 className={classes.title}>Загрузить изображение</h3>
      <input
        id="input-image-from-pc"
        type="file"
        accept=".jpeg, .jpg, .png"
        onChange={handleImageUpload}
        className={classes.inputBlock}
      />
      <div className={classes.buttonBlock}>
        <label htmlFor="input-image-from-pc" className={classes.labelPC}>
          Выбрать файл
        </label>
      </div>
    </div>
  );
};

export { ImageImportBlock };
