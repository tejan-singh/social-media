import React, { useContext } from "react";
import NavBar from "../Components/NavBar";
import { AppContext } from "../Context/AppContext";
import CreatePost from "../Components/CreatePost";
import Post from "../Components/Post";

const Explore = () => {
  const {
    appState: { allPosts, loading, errorMsg },
  } = useContext(AppContext)

  if (loading) return <p>Loading...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;
  return (
    <div>
      <NavBar />
      <CreatePost />
      {allPosts.map((post) => (
        <Post {...post} key={post._id} fromHomePage />
      ))}
    </div>
  );
};

export default Explore;
