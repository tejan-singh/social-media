import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { AppContext } from "../Context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const showAlert = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(userCredentials),
      });

      const { foundUser, encodedToken } = await response.json();
      if (foundUser) {
        localStorage.setItem("encodedToken", encodedToken);
        localStorage.setItem("loggedInUserDetails", JSON.stringify(foundUser));
        authDispatch({
          type: "USER_LOGIN",
          payload: { user: foundUser, token: encodedToken },
        });
        dispatch({ type: "SET_LOGGEDIN_USERPROFILE", payload: foundUser });
        if (!location?.state) {
          navigate("/");
        } else {
          navigate(location?.state?.from?.pathname);
        }
      } else {
        showAlert("invalid username or password");
      }
      setLoading(false);
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
        <form className={styles.login} onSubmit={!loading && handleLogin}>
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
            required
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
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <button
            className={`${styles["link-primary"]} ${styles["login-button"]}`}
            type="submit"
          >
            {loading ? "Logging in " : "Login"}
          </button>
          <button
            className={`${styles["link-primary"]} ${styles["login-button"]}`}
            type="submit"
            onClick={() =>
              setUserCredentials(() => ({
                username: "tejansingh",
                password: "tejansingh123",
              }))
            }
          >
            Login as guest
          </button>
          <Link className={styles["message"]} to="/signup">
            Don't have an account ? Sign up!
          </Link>
        </form>
      )}
      <ToastContainer />
    </section>
  );
};

export default Login;
