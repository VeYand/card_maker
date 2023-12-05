import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface INotificationState {
  message: string;
  isVisible: boolean;
}

const initialState: INotificationState = {
  message: "string",
  isVisible: false,
};

const notificationSlice = createSlice({
  name: "notificationSlice",
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.isVisible = true;
    },
    hideNotification: (state) => {
      state.isVisible = false;
    },
  },
});

export { notificationSlice };
