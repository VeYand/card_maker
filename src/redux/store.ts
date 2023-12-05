import { combineReducers, createStore } from "redux";
import { objectsReducer } from "../components/Objects/model/objectsSlice";
import { canvasReducer } from "../components/Canvas/model/canvasSlice";
import { filterReducer } from "../components/RightPanel/FilterBlock/model/filterSlice";
import { notificationReducer } from "../components/TopPanel/model/notificationSlice";

const rootReducer = combineReducers({
  objects: objectsReducer,
  canvas: canvasReducer,
  filter: filterReducer,
  notification: notificationReducer,
});

const store = createStore(rootReducer);

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { RootState, AppDispatch };
