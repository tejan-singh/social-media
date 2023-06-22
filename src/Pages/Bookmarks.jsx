import React, { useContext } from "react";
import NavBar from "../Components/NavBar";
import { AppContext } from "../Context/AppContext";
import Post from "../Components/Post";

const Bookmarks = () => {
  const {
    appState: { allBookmarks, loading, errorMsg },
  } = useContext(AppContext);

  if (loading) return <p>Loading...</p>;
  if (errorMsg) return <p>{errorMsg}</p>
  
  return (
    <div>
      <NavBar />
      {allBookmarks.length === 0 && <p>No bookmarked posts</p>}
      {allBookmarks.map( (post) => <Post {...post} key={post._id}/>)}

    </div>
  );
};

export default Bookmarks;
