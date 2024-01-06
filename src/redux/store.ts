import { combineReducers, createStore } from "redux"
import { cardEditorReducer } from "../model/cardEditorSlice"
import { notificationReducer } from "../components/NotificationBlock/model/notificationSlice"

const rootReducer = combineReducers({
    cardEditor: cardEditorReducer,
    notification: notificationReducer,
})

const store = createStore(rootReducer)

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export { store }
export type { RootState, AppDispatch }
