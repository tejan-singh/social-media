import React, { useRef } from "react";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedField, setSelectedField] = useState({
    firstName: false,
    lastName: false,
    email: false,
    username: false,
    password: false,
    confirmPassword: false,
  });

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

  const showSuccess = (message) => {
    toast.success(message, {
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
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    setLoading(() => true);
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();
      if (data.errors === undefined) {
        setUserDetails(() => ({
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        }));

        setSelectedField(() => ({
          firstName: false,
          lastName: false,
          email: false,
          username: false,
          password: false,
          confirmPassword: false,
        }));
        setLoading(() => false);

        showSuccess("Your account has been created");
        return;
      }
      if (data.errors.length > 0) {
        setLoading(() => false);

        return showAlert("username already present");
      }
      setLoading(() => false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.main}>
      <h2 className={styles.heading}>
        Join in <span>Circle</span>
      </h2>
      <form className={styles.login} onSubmit={!loading && handleSignup}>
        <h3>Sign up</h3>

        <div className={styles["input-container"]}>
          <label htmlFor="text" className={styles["login-label"]}>
            First name:
          </label>
          <input
            className={styles["login-input"]}
            type="text"
            name="firstName"
            onChange={handleChange}
            value={userDetails.firstName}
            placeholder="enter you first name"
            pattern="^[a-zA-Z]+(?:(?:|['_\. ])([a-zA-Z]*(\.\s)?[a-zA-Z])+)*$"
            required
            //when you click on this input and the click somewhere else then onBlur event will trigger
            onBlur={() =>
              setSelectedField((prev) => ({ ...prev, firstName: true }))
            }
            // add a new custom attribute and set a string value
            selectedfieldValue={selectedField.firstName.toString()}
          />
          <span className={styles.errorMsg}>
            * First name should not contain and number or special character
          </span>
        </div>

        <div className={styles["input-container"]}>
          <label htmlFor="text" className={styles["login-label"]}>
            Last name:
          </label>
          <input
            className={styles["login-input"]}
            type="text"
            name="lastName"
            onChange={handleChange}
            value={userDetails.lastName}
            placeholder="enter your last name"
            pattern="^[a-zA-Z]+(?:(?:|['_\. ])([a-zA-Z]*(\.\s)?[a-zA-Z])+)*$"
            required
            onBlur={() =>
              setSelectedField((prev) => ({ ...prev, lastName: true }))
            }
            selectedfieldValue={selectedField.lastName.toString()}
          />
          <span className={styles.errorMsg}>
            * Last name should not contain and number or special character
          </span>
        </div>

        <div className={styles["input-container"]}>
          <label htmlFor="email" className={styles["login-label"]}>
            Username:
          </label>
          <input
            className={styles["login-input"]}
            type="text"
            name="username"
            onChange={handleChange}
            value={userDetails.username}
            placeholder="enter your username"
            pattern="^[\w.]+$"
            required
            onBlur={() =>
              setSelectedField((prev) => ({ ...prev, username: true }))
            }
            selectedfieldValue={selectedField.username.toString()}
          />
          <span className={styles.errorMsg}>
            * Username can contain letters, digits, _ and .
          </span>
        </div>

        <div className={styles["input-container"]}>
          <label htmlFor="email" className={styles["login-label"]}>
            Email:
          </label>
          <input
            className={styles["login-input"]}
            type="email"
            name="email"
            onChange={handleChange}
            value={userDetails.email}
            placeholder="enter your email"
            required
            onBlur={() =>
              setSelectedField((prev) => ({ ...prev, email: true }))
            }
            selectedfieldValue={selectedField.email.toString()}
          />
          <span className={styles.errorMsg}>* Please enter valid email</span>
        </div>

        {/* PASSWORD FIELD */}
        <div className={styles["input-container"]}>
          <label className={styles["login-label"]} htmlFor="password">
            Password:
          </label>
          <div className={styles["password-field"]}>
            <input
              className={`${styles["login-input"]} ${styles["password-input"]}`}
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              value={userDetails.password}
              placeholder="enter your password"
              pattern="^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
              required
              onBlur={() =>
                setSelectedField((prev) => ({ ...prev, password: true }))
              }
              selectedfieldValue={selectedField.password.toString()}
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <span className={styles.errorMsg}>
            * Password should contain atleast 8 characters, 1 uppercase, 1
            lowercase, 1 digit and 1 special character
          </span>
        </div>

        {/* CONFIRM PASSWORD FIELD */}
        <div className={styles["input-container"]}>
          <label className={styles["login-label"]} htmlFor="password">
            Confirm Password:
          </label>
          <div className={styles["password-field"]}>
            <input
              className={`${styles["login-input"]} ${styles["password-input"]}`}
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              value={userDetails.confirmPassword}
              placeholder="re-enter your password"
              pattern={userDetails.password}
              required
              onBlur={() =>
                setSelectedField((prev) => ({ ...prev, confirmPassword: true }))
              }
              selectedfieldValue={selectedField.confirmPassword.toString()}
            />
          </div>
          <span className={styles.errorMsg}>* Password don't match</span>
        </div>

        <button className={styles["link-primary"]} type="submit">
          {loading ? "Creating account..." : "Create new account"}
        </button>
        <Link className={styles["message"]} to="/login">
          Already have an account ? Login in!
        </Link>
      </form>
      <ToastContainer />
    </section>
  );
};

export default Signup;
