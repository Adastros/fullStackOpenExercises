import { useNotificationState } from "../notificationContext";

const Notification = () => {
  const notification = useNotificationState();

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  // if (true) return null;

  return <div style={style}>{notification}</div>;
};

export default Notification;
