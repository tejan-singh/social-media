import React, { useContext, useState } from "react";
import NavBar from "../Components/NavBar";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { AppContext } from "../Context/AppContext";

const Login = () => {
  const {
    authState: { isLoggedIn },
    authDispatch,
  } = useContext(AuthContext);

  const {
    dispatch,
  } = useContext(AppContext);

  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(userCredentials),
    });

    const { foundUser, encodedToken } = await response.json();
    if (foundUser) {
      localStorage.setItem("encodedToken", encodedToken);
      authDispatch({ type: "USER_LOGIN", payload: foundUser });
      dispatch({ type: "SET_LOGGEDIN_USERPROFILE", payload: foundUser });
    } else {
      console.error("invalid user");
    }
  };

  const handleGuestLogin = async () => {
    const guestUserCredentials = {
      username: "adarshbalika",
      password: "adarshBalika123",
    };
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(guestUserCredentials),
    });

    const { foundUser, encodedToken } = await response.json();
    if (foundUser) {
      localStorage.setItem("encodedToken", encodedToken);
      authDispatch({ type: "USER_LOGIN", payload: foundUser });
    } else {
      console.error("invalid user");
    }
  };

  return (
    <>
      <h1>Welcome to Social Media</h1>
      <NavBar />
      {isLoggedIn && <p>You are logged in</p>}
      {!isLoggedIn && (
        <div className={styles.login}>
          <h3>Login</h3>
          <label htmlFor="email" className={styles["login-label"]}>
            username:
          </label>
          <input
            className={styles["login-input"]}
            type="text"
            name="username"
            id=""
            onChange={handleChange}
            value={userCredentials.username}
          />

          <label className={styles["login-label"]} htmlFor="password">
            Password:
          </label>
          <input
            className={styles["login-input"]}
            type="password"
            name="password"
            onChange={handleChange}
            value={userCredentials.password}
          />

          <button className={styles["login-button"]} onClick={handleLogin}>
            Login
          </button>
          <button className={styles["login-button"]} onClick={handleGuestLogin}>
            Login as guest
          </button>
          <Link className={styles["signup-message"]} to="/signup">
            Don't have an account ? Sign up!
          </Link>
        </div>
      )}
    </>
  );
};

export default Login;
