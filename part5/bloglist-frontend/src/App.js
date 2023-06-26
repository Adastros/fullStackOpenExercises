import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import UserPage from "./components/UserPage";

const App = () => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
      const userInfo = JSON.parse(loggedInUser);

      setUser(userInfo);
      blogService.setToken(userInfo.token);
    }
  }, []);

  const clearNotification = () => {
    setTimeout(() => setMessage(""), 5000);
  };

  return (
    <div>
      <Notification message={message} />
      {!user && (
        <LoginForm
          setUser={setUser}
          setMessage={setMessage}
          clearNotification={clearNotification}
        />
      )}

      {user && (
        <UserPage
          setUser={setUser}
          setMessage={setMessage}
          clearNotification={clearNotification}
          user={user}
        />
      )}
    </div>
  );
};

export default App;
