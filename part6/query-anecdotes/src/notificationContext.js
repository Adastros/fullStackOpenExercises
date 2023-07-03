import { createContext, useReducer, useContext } from "react";

const INITIAL_STATE = "";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "MESSAGE":
      return action.payload;
    case "RESET":
      return INITIAL_STATE;
    default:
      return state;
  }
};

const NotificationContext = createContext();

// used to wrap and provide context to child components in <App/>
// uses React's useReducer to manage notification state
export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    INITIAL_STATE
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

// helper functions to separate value and dispatch from context so that
// if only one of them is needed, both aren't called when using useContext()
export const useNotificationState = () => {
  const stateAndDispatch = useContext(NotificationContext);
  return stateAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const stateAndDispatch = useContext(NotificationContext);
  return stateAndDispatch[1];
};

export default NotificationContext;
