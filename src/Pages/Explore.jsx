import React, { useContext } from "react";
import NavBar from "../Components/NavBar";
import { AppContext } from "../Context/AppContext";
import CreatePost from "../Components/CreatePost";
import Post from "../Components/Post";
import styles from "./Explore.module.css";
import Header from "../Components/Header";
import Aside from "../Components/Aside";

const Explore = () => {
  const {
    appState: { allPosts, loading, errorMsg },
  } = useContext(AppContext);

  if (loading) return <p>Loading...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.navigation}>
        <NavBar />
      </div>
      <div className={styles.main}>
        {allPosts.map((post) => (
          <Post {...post} key={post._id} fromHomePage />
        ))}
      </div>
      <div className={styles.aside}>
        <Aside/>
      </div>
    </div>
  );
};

export default Explore;
