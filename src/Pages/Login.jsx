import React, { useContext, useState } from "react";
import NavBar from "../Components/NavBar";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { AppContext } from "../Context/AppContext";

const Login = () => {
  const { authState, dispatch } = useContext(AuthContext);
  const {appState:{allUsers}} = useContext(AppContext)
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
  
      const {foundUser, encodedToken} = await response.json();
      
      localStorage.setItem("token", encodedToken);
      dispatch({ type: "SET_LOGGEDIN_USER", payload: foundUser });

  };

  return (
    <>
      <NavBar />
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
        <Link className={styles["login-forget"]} to="#">
          Forget Password?
        </Link>
      </div>
    </>
  );
};

export default Login;
