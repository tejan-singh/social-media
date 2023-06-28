import React from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handleSignup = async () => {
    
    const response = await fetch("/api/auth/signup",{
        method:'POST',
        body: JSON.stringify(userDetails)
    })

    const data = await response.json()
    console.log(data)
  };

  return (
    <div className={styles.login}>
      <h3>Signup</h3>
      <label htmlFor="text" className={styles["login-label"]}>
        First name:
      </label>
      <input
        className={styles["login-input"]}
        type="text"
        name="firstName"
        onChange={handleChange}
        value={userDetails.firstName}
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
      />

      <label htmlFor="email" className={styles["login-label"]}>
        username:
      </label>
      <input
        className={styles["login-input"]}
        type="text"
        name="username"
        onChange={handleChange}
        value={userDetails.username}
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
      />

      <label className={styles["login-label"]} htmlFor="password">
        Password:
      </label>
      <input
        className={styles["login-input"]}
        type="password"
        name="password"
        onChange={handleChange}
        value={userDetails.password}
      />

      <button className={styles["login-button"]} onClick={handleSignup}>
        Sign up
      </button>
      <Link className={styles["signup-message"]} to="/login">
        Already have an account ? Login in!
      </Link>
    </div>
  );
};

export default Signup;
