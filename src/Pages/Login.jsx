import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { AppContext } from "../Context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";

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

  const [errMsg, setErrMsg] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    try {
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
        if (!location?.state) {
          navigate("/");
        } else {
          navigate(location?.state?.from?.pathname);
        }
      } else {
        setErrMsg(() => true);
        setTimeout(() => {
          setErrMsg(() => false);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGuestLogin = async () => {
    try {
      const guestUserCredentials = {
        username: "tejansingh",
        password: "tejansingh123",
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
          navigate(location?.state?.from?.pathname);
        }
      } else {
        console.error("invalid user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.main}>
      <h1 className={styles.heading}>
        Welcome to <span>Circle!</span>
      </h1>
      {isLoggedIn && <p>You are logged in</p>}
      {!isLoggedIn && (
        <div className={styles.login}>
          <h3>Login</h3>
          <div className={styles.errorMsg}>
            {errMsg && <p>Sorry, we could not find your account.</p>}
          </div>
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
          <div className={styles["login-input"]}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              value={userCredentials.password}
              placeholder="Enter your password"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <Link
            className={`${styles["link-primary"]} ${styles["login-button"]}`}
            onClick={handleLogin}
          >
            Login
          </Link>
          <Link
            className={`${styles["link-primary"]} ${styles["login-button"]}`}
            onClick={handleGuestLogin}
          >
            Login as guest
          </Link>
          <Link className={styles["message"]} to="/signup">
            Don't have an account ? Sign up!
          </Link>
        </div>
      )}
    </section>
  );
};

export default Login;
