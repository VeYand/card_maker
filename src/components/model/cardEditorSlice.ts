import {
  CanvasType,
  FilterType,
  ObjectListType,
  ObjectType,
} from "../../types/types";

const SET_CANVAS_SIZE = "SET_CANVAS_SIZE";
const SET_FILTER = "SET_FILTER";
const SET_OBJECTS = "SET_OBJECTS";
const ADD_OBJECTS = "ADD_OBJECTS";
const CHANGE_OBJECT = "CHANGE_OBJECT";
const REMOVE_OBJECTS = "REMOVE_OBJECTS";
const RESET_ALL_SELECTIONS = "RESET_ALL_SELECTIONS";
const MOVE_BACKGROUND = "MOVE_BACKGROUND";
const MOVE_FOREGROUND = "MOVE_FOREGROUND";

interface ISetCanvasSizeAction {
  type: typeof SET_CANVAS_SIZE;
  payload: CanvasType;
}

interface ISetFilterAction {
  type: typeof SET_FILTER;
  payload: FilterType;
}

interface ISetObjectsAction {
  type: typeof SET_OBJECTS;
  payload: ObjectListType;
}

interface IAddObjectsAction {
  type: typeof ADD_OBJECTS;
  payload: ObjectListType;
}

interface IChangeObjectAction {
  type: typeof CHANGE_OBJECT;
  payload: ObjectType;
}

interface IRemoveObjectsAction {
  type: typeof REMOVE_OBJECTS;
  payload: ObjectListType;
}

interface IResetAllSelectionsAction {
  type: typeof RESET_ALL_SELECTIONS;
}

interface IMoveBackgroundAction {
  type: typeof MOVE_BACKGROUND;
  payload: ObjectListType;
}

interface IMoveForegroundAction {
  type: typeof MOVE_FOREGROUND;
  payload: ObjectListType;
}

interface ICardEditorState {
  canvas: CanvasType;
  objects: ObjectListType;
  filter: FilterType;
}

const setCanvasSize = (
  payload: ISetCanvasSizeAction["payload"],
): ISetCanvasSizeAction => ({
  type: SET_CANVAS_SIZE,
  payload,
});

const setFilter = (payload: ISetFilterAction["payload"]): ISetFilterAction => ({
  type: SET_FILTER,
  payload,
});

const setObjects = (
  payload: ISetObjectsAction["payload"],
): ISetObjectsAction => ({
  type: SET_OBJECTS,
  payload,
});

const addObjects = (
  payload: IAddObjectsAction["payload"],
): IAddObjectsAction => ({
  type: ADD_OBJECTS,
  payload,
});

const resetAllSelections = (): IResetAllSelectionsAction => ({
  type: RESET_ALL_SELECTIONS,
});

const removeObjects = (
  payload: IRemoveObjectsAction["payload"],
): IRemoveObjectsAction => ({
  type: REMOVE_OBJECTS,
  payload,
});

const moveBackground = (
  payload: IMoveBackgroundAction["payload"],
): IMoveBackgroundAction => ({
  type: MOVE_BACKGROUND,
  payload,
});

const moveForeground = (
  payload: IMoveForegroundAction["payload"],
): IMoveForegroundAction => ({
  type: MOVE_FOREGROUND,
  payload,
});

const changeObject = (
  payload: IChangeObjectAction["payload"],
): IChangeObjectAction => ({
  type: CHANGE_OBJECT,
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

const initialState: ICardEditorState = {
  canvas: {
    width: 800,
    height: 600,
  },
  objects: [],
  filter: {
    r: 0,
    g: 0,
    b: 0,
    a: 0,
  },
};

type CardEditorActionType =
  | ISetCanvasSizeAction
  | ISetFilterAction
  | ISetObjectsAction
  | IAddObjectsAction
  | IChangeObjectAction
  | IRemoveObjectsAction
  | IResetAllSelectionsAction
  | IMoveBackgroundAction
  | IMoveForegroundAction;

const cardEditorReducer = (
  state = initialState,
  action: CardEditorActionType,
) => {
  let objectsToRemove: Set<string>;
  switch (action.type) {
    case SET_CANVAS_SIZE:
      return {
        ...state,
        canvas: {
          width: action.payload.width,
          height: action.payload.height,
        },
      };
    case SET_FILTER:
      return {
        ...state,
        filter: {
          r: action.payload.r,
          g: action.payload.g,
          b: action.payload.b,
          a: action.payload.a,
        },
      };
    case SET_OBJECTS:
      return { ...state, objects: action.payload };
    case ADD_OBJECTS:
      return {
        ...state,
        objects: [...state.objects, ...action.payload],
      };
    case RESET_ALL_SELECTIONS:
      return {
        ...state,
        objects: state.objects.map((object: ObjectType) => ({
          ...object,
          isSelected: false,
        })),
      };
    case CHANGE_OBJECT:
      return {
        ...state,
        objects: state.objects.map((object: ObjectType) =>
          object.id === action.payload.id ? action.payload : object,
        ),
      };
    case REMOVE_OBJECTS:
      objectsToRemove = new Set(
        action.payload.map((obj: ObjectType) => obj.id),
      );
      return {
        ...state,
        objects: state.objects.filter(
          (object: ObjectType) => !objectsToRemove.has(object.id),
        ),
      };
    case MOVE_BACKGROUND:
      return {
        ...state,
        objects: moveObjects(state.objects, action.payload, -1),
      };
    case MOVE_FOREGROUND:
      return {
        ...state,
        objects: moveObjects(state.objects, action.payload, 1),
      };
    default:
      return state;
  }
};

export {
  cardEditorReducer,
  resetAllSelections,
  addObjects,
  changeObject,
  setFilter,
  moveBackground,
  moveForeground,
  removeObjects,
  setCanvasSize,
  setObjects,
};
