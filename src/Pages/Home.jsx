import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import CreatePost from "../Components/CreatePost";
import NavBar from "../Components/NavBar";
import Post from "../Components/Post";

const Home = () => {
  const {
    appState: { homeFeed, loading, errorMsg },
  } = useContext(AppContext);

  if (loading) return <p>Loading...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;

  return (
    <div>
      <NavBar />
      <CreatePost />
      {homeFeed.map((post) => (
        <Post {...post} key={post._id} fromHomePage />
      ))}
    </div>
  );
};

export default Home;
