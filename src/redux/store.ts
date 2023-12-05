import { configureStore } from "@reduxjs/toolkit";
import { objectsSlice } from "../components/Objects/model/objectsSlice";
import { canvasSlice } from "../components/Canvas/model/canvasSlice";
import { filterSlice } from "../components/RightPanel/FilterBlock/model/filterSlice";
import { notificationSlice } from "../components/TopPanel/model/notificationSlice";

const store = configureStore({
  reducer: {
    objectsSlice: objectsSlice.reducer,
    canvasSlice: canvasSlice.reducer,
    filterSlice: filterSlice.reducer,
    notificationSlice: notificationSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { RootState, AppDispatch };
