import React, { useContext } from "react";
import NavBar from "../Components/NavBar";
import { AppContext } from "../Context/AppContext";
import Post from "../Components/Post";
import styles from "./Explore.module.css";
import Header from "../Components/Header";
import Aside from "../Components/Aside";
import Loader from "../Components/Loader";

const Explore = () => {
  const {
    appState: { allPosts, loading },
  } = useContext(AppContext);

  if (loading) return <Loader />;
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.navigation}>
        <NavBar />
      </div>
      <div className={styles.main}>
        <h2>Expore</h2>
        {allPosts.map((post) => (
          <Post {...post} key={post._id} fromHomePage />
        ))}
      </div>
      <div className={styles.aside}>
        <Aside />
      </div>
    </div>
  );
};

export default Explore;
