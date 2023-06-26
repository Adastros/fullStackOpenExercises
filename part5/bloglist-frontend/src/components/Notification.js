const Notification = ({ message }) => {
  if (!message) {
    return null;
  }

  const notificationStyle = {
    backgroundColor: "rgb(211 ,211, 211)",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div id="notification" style={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification;
