import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import CreatePost from "../Components/CreatePost";
import NavBar from "../Components/NavBar";
import Post from "../Components/Post";
import Filter from "../Components/Filter";
import { AuthContext } from "../Context/AuthContext";
import Landing from "./Landing";

const Home = () => {
  const {
    appState: { homeFeed, loading, errorMsg },
  } = useContext(AppContext);

  const {authState:{isLoggedIn}} = useContext(AuthContext)

  if (loading) return <p>Loading...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;
  if (!isLoggedIn) return <Landing/>
  return (
    <div>
      <NavBar />
      <CreatePost />
      <Filter/>
      {homeFeed.map((post) => (
        <Post {...post} key={post._id} fromHomePage />
      ))}
    </div>
  );
};

export default Home;
