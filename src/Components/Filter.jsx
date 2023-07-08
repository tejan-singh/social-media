import React from "react";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const Filter = () => {
  const { dispatch } = useContext(AppContext);

  const handleLatestPost = () => {
    dispatch({ type: "SORT_BY_LATEST" });
  };

  const handleTrendingPost = () => {
    dispatch({ type: "SORT_BY_TRENDING" });
  };

  return (
    <div>
      <button onClick={handleLatestPost}>Latest</button>
      <button onClick={handleTrendingPost}>Trending</button>
    </div>
  );
};

export default Filter;
