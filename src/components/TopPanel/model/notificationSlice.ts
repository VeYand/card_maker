const SHOW_NOTIFICATION = "SHOW_NOTIFICATION";
const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

interface ShowNotificationAction {
  type: typeof SHOW_NOTIFICATION;
  payload: string;
}

interface HideNotificationAction {
  type: typeof HIDE_NOTIFICATION;
}

const showNotification = (message: string): ShowNotificationAction => ({
  type: SHOW_NOTIFICATION,
  payload: message,
});

const hideNotification = (): HideNotificationAction => ({
  type: HIDE_NOTIFICATION,
});

interface NotificationState {
  message: string;
  isVisible: boolean;
}

const initialState: NotificationState = {
  message: "string",
  isVisible: false,
};

type NotificationAction = ShowNotificationAction | HideNotificationAction;

const notificationReducer = (
  state = initialState,
  action: NotificationAction,
): NotificationState => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        message: action.payload,
        isVisible: true,
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        isVisible: false,
      };
    default:
      return state;
  }
};

export { notificationReducer, showNotification, hideNotification };
