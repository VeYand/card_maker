import React from "react";
import classes from "./CreateTextBlock.module.css";
import { useAppDispatch } from "../../../redux/hooks";
import { objectsSlice } from "../../Objects/model/objectsSlice";
import { TextType } from "../../../types/types";

const CreateTextBlock = () => {
  const dispatch = useAppDispatch();
  const createTextBlock = () => {
    const textObject: TextType = {
      id: Date.now().toString(),
      isSelected: false,
      posX: 0,
      posY: 0,
      scaleX: 0.2,
      scaleY: 0.2,
      content: "Ваш текст",
      fontColor: "black",
      fontSize: 20,
      fontFamily: "Arial",
      decorations: [],
    };

    dispatch(objectsSlice.actions.addObject(textObject));
  };

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>Текст</h3>
      <div className={classes.buttonsContainer}>
        <div className={classes.button} onClick={createTextBlock}>
          Создать текстовый блок
        </div>
      </div>
    </div>
  );
};

export { CreateTextBlock };
