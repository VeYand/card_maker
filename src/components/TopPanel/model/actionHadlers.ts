import { CardDataType, ObjectType } from "../../../types/types";
import React from "react";

const saveAsJson = (
  cardData: CardDataType,
  showMessage: (message: string) => void,
) => {
  const jsonString = JSON.stringify(cardData);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "YourCard.json";
  a.click();
  URL.revokeObjectURL(url);
  showMessage("Saved successfully");
};

// eslint-disable-next-line
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
          // eslint-disable-next-line
          (decoration: any) => typeof decoration === "string",
        )))
  );
};

// eslint-disable-next-line
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
    // eslint-disable-next-line
    data?.objects?.every((obj: any) => validateObject(obj))
  );
};

const handleJSONLoad = (
  event: React.ChangeEvent<HTMLInputElement>,
  loadCard: (cardData: CardDataType | null, errorMessage?: string) => void,
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
          loadCard(jsonData as CardDataType);
        } else {
          loadCard(null, "Error loading JSON: Invalid format");
        }
      } catch (error) {
        loadCard(null, "Error loading JSON");
      }
    };

    reader.readAsText(file);
  }
};

export { saveAsJson, handleJSONLoad };
