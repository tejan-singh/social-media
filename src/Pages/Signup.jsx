import React from "react";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-regular-svg-icons";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async () => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();
      console.log(data);
      setUserDetails(() => ({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.main}>
      <h2 className={styles.heading}>
        Join in <span>Circle</span>
      </h2>
      <div className={styles.login}>
        <h3>Sign up</h3>
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
        />

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
        />

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
        />

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
        />

        <label className={styles["login-label"]} htmlFor="password">
          Password:
        </label>
        <div className={styles["login-input"]}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={handleChange}
            value={userDetails.password}
            placeholder="enter your password"
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <Link className={styles["link-primary"]} onClick={handleSignup}>
          Create new account
        </Link>
        <Link className={styles["message"]} to="/login">
          Already have an account ? Login in!
        </Link>
      </div>
    </section>
  );
};

export default Signup;
