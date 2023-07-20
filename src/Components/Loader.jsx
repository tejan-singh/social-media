import React from "react";
import styles from "./Loader.module.css";
import spinner from "../assets/1494.gif";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <img src={spinner} alt="spinner" />
    </div>
  );
};

export default Loader;
