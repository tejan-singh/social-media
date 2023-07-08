import React, { useContext, useState } from "react";
import NavBar from "../Components/NavBar";
import styles from "./Login.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { AppContext } from "../Context/AppContext";

const Login = () => {
  const {
    authState: { isLoggedIn },
    authDispatch,
  } = useContext(AuthContext);

  const { dispatch } = useContext(AppContext);

  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

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
      localStorage.setItem("loggedInUserDetails", JSON.stringify(foundUser));
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
      localStorage.setItem("loggedInUserDetails", JSON.stringify(foundUser));
      authDispatch({ type: "USER_LOGIN", payload: foundUser });
      dispatch({ type: "SET_LOGGEDIN_USERPROFILE", payload: foundUser });

      // if no previous path then state is null then redirect to home else redirect to previous path
      if (!location?.state) {
        navigate("/");
      } else {
        navigate(location?.state?.from?.pathname)
      }
    } else {
      console.error("invalid user");
    }
  };

  return (
    <section className={styles.main}>
      <h1 className={styles.heading}>
        Welcome to <span>Circle!</span>
      </h1>
      <NavBar />
      {isLoggedIn && <p>You are logged in</p>}
      {!isLoggedIn && (
        <div className={styles.login}>
          <h3>Login</h3>
          <label htmlFor="email" className={styles["login-label"]}>
            Username:
          </label>
          <input
            className={styles["login-input"]}
            type="text"
            name="username"
            id=""
            onChange={handleChange}
            value={userCredentials.username}
            placeholder="Enter your username"
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
            placeholder="Enter your password"
          />

          <button
            className={`${styles["link-primary"]} ${styles["login-button"]}`}
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            className={`${styles["link-primary"]} ${styles["login-button"]}`}
            onClick={handleGuestLogin}
          >
            Login as guest
          </button>
          <Link className={styles["message"]} to="/signup">
            Don't have an account ? Sign up!
          </Link>
        </div>
      )}
    </section>
  );
};

export default Login;
