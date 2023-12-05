import {
  BoundingBoxType,
  ObjectListType,
  ObjectType,
  TextType,
} from "../../../types/types";

const SET_OBJECTS = "SET_OBJECTS";
const ADD_OBJECT = "ADD_OBJECT";
const CHANGE_BOUNDING_BOX = "CHANGE_BOUNDING_BOX";
const CHANGE_OBJECT_IS_SELECTED = "CHANGE_OBJECT_IS_SELECTED";
const RESET_ALL_SELECTIONS = "RESET_ALL_SELECTIONS";
const CHANGE_TEXT_OBJECT = "CHANGE_TEXT_OBJECT";
const REMOVE_OBJECTS = "REMOVE_OBJECTS";
const MOVE_BACKGROUND = "MOVE_BACKGROUND";
const MOVE_FOREGROUND = "MOVE_FOREGROUND";

interface SetObjectsAction {
  type: typeof SET_OBJECTS;
  payload: ObjectListType;
}

interface AddObjectAction {
  type: typeof ADD_OBJECT;
  payload: ObjectType;
}

interface ChangeBoundingBoxAction {
  type: typeof CHANGE_BOUNDING_BOX;
  payload: {
    objectId: string;
    boundingBox: BoundingBoxType;
  };
}

interface ChangeObjectIsSelectedAction {
  type: typeof CHANGE_OBJECT_IS_SELECTED;
  payload: {
    objectId: string;
    isSelected: boolean;
  };
}

interface ResetAllSelectionsAction {
  type: typeof RESET_ALL_SELECTIONS;
}

interface ChangeTextObjectAction {
  type: typeof CHANGE_TEXT_OBJECT;
  payload: TextType;
}

interface RemoveObjectsAction {
  type: typeof REMOVE_OBJECTS;
  payload: ObjectListType;
}

interface MoveBackgroundAction {
  type: typeof MOVE_BACKGROUND;
  payload: ObjectListType;
}

interface MoveForegroundAction {
  type: typeof MOVE_FOREGROUND;
  payload: ObjectListType;
}

type ObjectsAction =
  | SetObjectsAction
  | AddObjectAction
  | ChangeBoundingBoxAction
  | ChangeObjectIsSelectedAction
  | ResetAllSelectionsAction
  | ChangeTextObjectAction
  | RemoveObjectsAction
  | MoveBackgroundAction
  | MoveForegroundAction;

const setObjects = (payload: ObjectListType): SetObjectsAction => ({
  type: SET_OBJECTS,
  payload,
});

const addObject = (payload: ObjectType): AddObjectAction => ({
  type: ADD_OBJECT,
  payload,
});

const changeBoundingBox = (payload: {
  objectId: string;
  boundingBox: BoundingBoxType;
}): ChangeBoundingBoxAction => ({
  type: CHANGE_BOUNDING_BOX,
  payload,
});

const changeObjectIsSelected = (payload: {
  objectId: string;
  isSelected: boolean;
}): ChangeObjectIsSelectedAction => ({
  type: CHANGE_OBJECT_IS_SELECTED,
  payload,
});

const resetAllSelections = (): ResetAllSelectionsAction => ({
  type: RESET_ALL_SELECTIONS,
});

const changeTextObject = (payload: TextType): ChangeTextObjectAction => ({
  type: CHANGE_TEXT_OBJECT,
  payload,
});

const removeObjects = (payload: ObjectListType): RemoveObjectsAction => ({
  type: REMOVE_OBJECTS,
  payload,
});

const moveBackground = (payload: ObjectListType): MoveBackgroundAction => ({
  type: MOVE_BACKGROUND,
  payload,
});

const moveForeground = (payload: ObjectListType): MoveForegroundAction => ({
  type: MOVE_FOREGROUND,
  payload,
});

const moveObjects = (
  objects: ObjectListType,
  objectsToMove: ObjectListType,
  direction: number,
): ObjectListType => {
  const indicesToMove = objectsToMove.map((obj: ObjectType) =>
    objects.findIndex((o: ObjectType) => o.id === obj.id),
  );

  const newObjects = [...objects];

  indicesToMove.forEach((index: number) => {
    const targetIndex = index + direction;
    if (targetIndex >= 0 && targetIndex < newObjects.length) {
      [newObjects[index], newObjects[targetIndex]] = [
        newObjects[targetIndex],
        newObjects[index],
      ];
    }
  });

  return newObjects;
};

const initialState: ObjectListType = [];

const objectsReducer = (
  state = initialState,
  action: ObjectsAction,
): ObjectListType => {
  let objectsToRemove: Set<string>;
  switch (action.type) {
    case SET_OBJECTS:
      return action.payload;
    case ADD_OBJECT:
      return [...state, action.payload];
    case CHANGE_BOUNDING_BOX:
      return state.map((object: ObjectType) =>
        object.id === action.payload.objectId
          ? {
              ...object,
              posX: action.payload.boundingBox.posX,
              posY: action.payload.boundingBox.posY,
              scaleX: action.payload.boundingBox.scaleX,
              scaleY: action.payload.boundingBox.scaleY,
            }
          : object,
      );
    case CHANGE_OBJECT_IS_SELECTED:
      return state.map((object: ObjectType) =>
        object.id === action.payload.objectId
          ? { ...object, isSelected: action.payload.isSelected }
          : object,
      );
    case RESET_ALL_SELECTIONS:
      return state.map((object: ObjectType) => ({
        ...object,
        isSelected: false,
      }));
    case CHANGE_TEXT_OBJECT:
      return state.map((object: ObjectType) =>
        object.id === action.payload.id ? action.payload : object,
      );
    case REMOVE_OBJECTS:
      objectsToRemove = new Set(
        action.payload.map((obj: ObjectType) => obj.id),
      );
      return state.filter(
        (object: ObjectType) => !objectsToRemove.has(object.id),
      );
    case MOVE_BACKGROUND:
      return moveObjects(state, action.payload, -1);
    case MOVE_FOREGROUND:
      return moveObjects(state, action.payload, 1);
    default:
      return state;
  }
};

export {
  objectsReducer,
  setObjects,
  addObject,
  changeBoundingBox,
  changeObjectIsSelected,
  resetAllSelections,
  changeTextObject,
  removeObjects,
  moveBackground,
  moveForeground,
};
