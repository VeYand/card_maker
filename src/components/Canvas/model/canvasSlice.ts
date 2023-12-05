import { CanvasType } from "../../../types/types";

const SET_CANVAS_SIZE = "SET_CANVAS_SIZE";

type SetCanvasSizeAction = {
  type: typeof SET_CANVAS_SIZE;
  payload: CanvasType;
};

const setCanvasSize = (payload: CanvasType): SetCanvasSizeAction => ({
  type: SET_CANVAS_SIZE,
  payload,
});

const initialState: CanvasType = {
  width: 800,
  height: 600,
};

const canvasReducer = (state = initialState, action: SetCanvasSizeAction) => {
  switch (action.type) {
    case SET_CANVAS_SIZE:
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
      };
    default:
      return state;
  }
};

export { canvasReducer, setCanvasSize };
