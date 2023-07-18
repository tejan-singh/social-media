import React from "react";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import styles from "./Filter.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";

const Filter = () => {
  const { dispatch } = useContext(AppContext);
  const [activeStyle, setActiveStyle] = useState({
    latest: true,
    trending: false,
  });

  const handleLatestPost = () => {
    setActiveStyle(() => ({ latest: true, trending: false }));
    dispatch({ type: "SORT_BY_LATEST" });
  };

  const handleTrendingPost = () => {
    setActiveStyle(() => ({ trending: true, latest: false }));
    dispatch({ type: "SORT_BY_TRENDING" });
  };

  return (
    <div className={styles["filter-container"]}>
      <p
        onClick={handleLatestPost}
        className={
          activeStyle.latest
            ? `${styles.filter} ${styles.active}`
            : styles.filter
        }
      >
        <i>
          <FontAwesomeIcon icon={faNewspaper} />
        </i>
        Latest
      </p>
      <p
        onClick={handleTrendingPost}
        className={
          activeStyle.trending
            ? `${styles.filter} ${styles.active}`
            : styles.filter
        }
      >
        <i>
          <FontAwesomeIcon icon={faFire} />
        </i>
        Trending
      </p>
    </div>
  );
};

export default Filter;
