import React from "react";
import styles from "./ErrorPage.module.css";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className={styles.error}>
      <h1 className={styles.heading}>Error 404</h1>
      <h2 className={styles.heading}>Page not found</h2>
      <Link className={styles.link} to="/">Go Home</Link>
    </div>
  );
};

export default ErrorPage;
