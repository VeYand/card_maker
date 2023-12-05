import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterType } from "../../../../types/types";

const initialState: FilterType = {
  r: 0,
  g: 0,
  b: 0,
  a: 0,
};

const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.r = action.payload.r;
      state.g = action.payload.g;
      state.b = action.payload.b;
      state.a = action.payload.a;
    },
  },
});

export { filterSlice };
