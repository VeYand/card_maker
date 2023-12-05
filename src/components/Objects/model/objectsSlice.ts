import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BoundingBoxType,
  ObjectListType,
  ObjectType,
  TextType,
} from "../../../types/types";

interface IObjectList {
  objects: ObjectListType;
}

const initialState: IObjectList = {
  objects: [],
};

const objectsSlice = createSlice({
  name: "objectsSlice",
  initialState,
  reducers: {
    setObjects: (state, action: PayloadAction<ObjectListType>) => {
      state.objects = action.payload;
    },
    addObject: (state, action: PayloadAction<ObjectType>) => {
      state.objects = [...state.objects, action.payload];
    },
    changeBoundingBox: (
      state,
      action: PayloadAction<{ objectId: string; boundingBox: BoundingBoxType }>,
    ) => {
      state.objects = state.objects.map((object: ObjectType): ObjectType => {
        if (object.id === action.payload.objectId) {
          object.posX = action.payload.boundingBox.posX;
          object.posY = action.payload.boundingBox.posY;
          object.scaleX = action.payload.boundingBox.scaleX;
          object.scaleY = action.payload.boundingBox.scaleY;
          return object;
        }
        return object;
      });
    },
    changeObjectIsSelected: (
      state,
      action: PayloadAction<{ objectId: string; isSelected: boolean }>,
    ) => {
      state.objects = state.objects.map((object: ObjectType): ObjectType => {
        if (object.id === action.payload.objectId) {
          object.isSelected = action.payload.isSelected;
          return object;
        }
        return object;
      });
    },
    resetAllSelections: (state) => {
      state.objects = state.objects.map((object: ObjectType): ObjectType => {
        object.isSelected = false;
        return object;
      });
    },
    changeTextObject: (state, action: PayloadAction<TextType>) => {
      state.objects = state.objects.map((object: ObjectType): ObjectType => {
        if (object.id === action.payload.id) {
          return action.payload;
        }
        return object;
      });
    },
    removeObjects: (state, action: PayloadAction<ObjectListType>) => {
      const objectsToRemove = new Set(action.payload.map((obj) => obj.id));
      state.objects = state.objects.filter(
        (object) => !objectsToRemove.has(object.id),
      );
    },
    moveBackground: (state, action: PayloadAction<ObjectListType>) => {
      const objectsToMove = action.payload;

      const indicesToMove = objectsToMove.map((obj) =>
        state.objects.findIndex((o) => o.id === obj.id),
      );

      const newObjects = [...state.objects];

      indicesToMove.forEach((index) => {
        if (index > 0) {
          [newObjects[index - 1], newObjects[index]] = [
            newObjects[index],
            newObjects[index - 1],
          ];
        }
      });

      state.objects = newObjects;
    },
    moveForeground: (state, action: PayloadAction<ObjectListType>) => {
      const objectsToMove = action.payload;

      const indicesToMove = objectsToMove.map((obj) =>
        state.objects.findIndex((o) => o.id === obj.id),
      );

      const newObjects = [...state.objects];

      indicesToMove.reverse();

      indicesToMove.forEach((index) => {
        if (index < newObjects.length - 1) {
          [newObjects[index], newObjects[index + 1]] = [
            newObjects[index + 1],
            newObjects[index],
          ];
        }
      });

      state.objects = newObjects;
    },
  },
});

export { objectsSlice };
