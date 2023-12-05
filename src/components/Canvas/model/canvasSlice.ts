import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CanvasType } from "../../../types/types";

const initialState: CanvasType = {
  width: 800,
  height: 600,
};

const canvasSlice = createSlice({
  name: "canvasSlice",
  initialState,
  reducers: {
    setCanvasSize: (state, action: PayloadAction<CanvasType>) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
  },
});

export { canvasSlice };
