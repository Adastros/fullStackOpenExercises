import { useState } from "react";
import PropTypes from "prop-types";
import loginService from "../services/login";
import blogService from "../services/blogs";

const LoginForm = ({ setUser, setMessage, clearNotification }) => {
  LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    clearNotification: PropTypes.func.isRequired,
  };

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("logging in with", username, password);
      const user = await loginService.login({
        username,
        password,
      });

      localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUserName("");
      setPassword("");
      setMessage(`${user.name} successfully logged in`);
      clearNotification();
    } catch (exception) {
      setMessage(`The username or password is wrong`);
      clearNotification();
    }
  };

  const onUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <p>Username:</p>
          <input
            type="text"
            value={username}
            name="username"
            onChange={onUserNameChange}
            required
          ></input>
        </div>
        <div>
          <p>Password:</p>
          <input
            type="text"
            value={password}
            name="password"
            onChange={onPasswordChange}
            required
          ></input>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
