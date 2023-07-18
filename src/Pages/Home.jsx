import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import CreatePost from "../Components/CreatePost";
import NavBar from "../Components/NavBar";
import Post from "../Components/Post";
import Filter from "../Components/Filter";
import { AuthContext } from "../Context/AuthContext";
import Landing from "./Landing";
import styles from "./Home.module.css";
import Header from "../Components/Header";
import Aside from "../Components/Aside";

const Home = () => {
  const {
    appState: { latestPosts, trendingPosts, filter, loading, errorMsg },
  } = useContext(AppContext);


  const {
    authState: { isLoggedIn },
  } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;
  if (!isLoggedIn) return <Landing />;
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.navigation}>
        <NavBar />
      </div>
      <div className={styles.main}>
        <CreatePost />
        <Filter />
        {filter.showLatestPosts && latestPosts.map((post) => (
          <Post {...post} key={post._id} fromHomePage />
        ))}
        {filter.showTrendingPosts && trendingPosts.map((post) => (
          <Post {...post} key={post._id} fromHomePage />
        ))}
      </div>
      <div className={styles.aside}>
        <Aside />
      </div>
    </div>
  );
};

export default Home;
