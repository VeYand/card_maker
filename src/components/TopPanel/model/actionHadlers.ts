import { CardDataType, ObjectType } from "../../../types/types";
import React from "react";
import { AppDispatch } from "../../../redux/store";
import { filterSlice } from "../../RightPanel/FilterBlock/model/filterSlice";
import { canvasSlice } from "../../Canvas/model/canvasSlice";
import { objectsSlice } from "../../Objects/model/objectsSlice";
import { notificationSlice } from "./notificationSlice";

const saveAsJson = (cardData: CardDataType, dispatch: AppDispatch) => {
  const jsonString = JSON.stringify(cardData);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "YourCard.json";
  a.click();
  URL.revokeObjectURL(url);
  dispatch(notificationSlice.actions.showNotification("Saved successfully"));
  setTimeout(() => {
    dispatch(notificationSlice.actions.hideNotification());
  }, 3000);
};

const validateObject = (obj: any): obj is ObjectType => {
  return (
    typeof obj.id === "string" &&
    typeof obj.isSelected === "boolean" &&
    typeof obj.scaleX === "number" &&
    typeof obj.scaleY === "number" &&
    typeof obj.posX === "number" &&
    typeof obj.posY === "number" &&
    (typeof obj.objectSrc === "string" ||
      typeof obj.imageSrc === "string" ||
      (typeof obj.content === "string" &&
        typeof obj.fontSize === "number" &&
        typeof obj.fontColor === "string" &&
        typeof obj.fontFamily === "string" &&
        Array.isArray(obj.decorations) &&
        obj?.decorations?.every(
          (decoration: any) => typeof decoration === "string",
        )))
  );
};

const validateCardData = (data: any): data is CardDataType => {
  return (
    typeof data.canvas === "object" &&
    typeof data.canvas.width === "number" &&
    typeof data.canvas.height === "number" &&
    typeof data.filter === "object" &&
    typeof data.filter.r === "number" &&
    typeof data.filter.g === "number" &&
    typeof data.filter.b === "number" &&
    typeof data.filter.a === "number" &&
    Array.isArray(data.objects) &&
    data?.objects?.every((obj: any) => validateObject(obj))
  );
};

const handleJSONLoad = (
  event: React.ChangeEvent<HTMLInputElement>,
  dispatch: AppDispatch,
) => {
  const fileInput = event.target;
  const file = fileInput.files?.[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonString = e.target?.result as string;
        const jsonData = JSON.parse(jsonString);
        if (validateCardData(jsonData)) {
          const cardData = jsonData as CardDataType;
          dispatch(filterSlice.actions.setFilter(cardData.filter));
          dispatch(canvasSlice.actions.setCanvasSize(cardData.canvas));
          dispatch(objectsSlice.actions.setObjects(cardData.objects));
          dispatch(
            notificationSlice.actions.showNotification("Loaded successfully"),
          );
          setTimeout(() => {
            dispatch(notificationSlice.actions.hideNotification());
          }, 3000);
        } else {
          dispatch(
            notificationSlice.actions.showNotification(
              "Error loading JSON: Invalid format",
            ),
          );
          setTimeout(() => {
            dispatch(notificationSlice.actions.hideNotification());
          }, 3000);
        }
      } catch (error) {
        dispatch(
          notificationSlice.actions.showNotification("Error loading JSON"),
        );
        setTimeout(() => {
          dispatch(notificationSlice.actions.hideNotification());
        }, 3000);
      }
    };

    reader.readAsText(file);
  }
};

export { saveAsJson, handleJSONLoad };
