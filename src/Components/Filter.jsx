import React from "react";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import styles from "./Filter.module.css";

const Filter = () => {
  const { dispatch } = useContext(AppContext);

  const handleLatestPost = () => {
    dispatch({ type: "SORT_BY_LATEST" });
  };

  const handleTrendingPost = () => {
    dispatch({ type: "SORT_BY_TRENDING" });
  };

  return (
    <div className={styles["filter-container"]}>
      <p onClick={handleLatestPost} className={styles.filter}>
        Latest
      </p>
      <p onClick={handleTrendingPost} className={styles.filter}>
        Trending
      </p>
    </div>
  );
};

export default Filter;
