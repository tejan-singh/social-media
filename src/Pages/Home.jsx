import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";

const Home = () => {
  const {
    appState: { allPosts, loading, errorMsg },
  } = useContext(AppContext);

  if (loading) return <p>Loading...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;

  return (
    <div>
      <h1>Social Media</h1>
      

      {allPosts.map(
        ({
          _id,
          id,
          content,
          likes: { likeCount, likedBy, dislikedBy },
          username,
          createdAt,
          updatedAt,
        }) => {
          return <article key={_id}>
            <p>{username}</p>
            <p>{content}</p>
            <p>{likeCount}</p>
            {likedBy.map((person) => (
              <p>{person}</p>
            ))}
            {dislikedBy.map((person) => (
              <p>{person}</p>
            ))}
            <p>{createdAt}</p>
            <p>{updatedAt}</p>
          </article>;
        }
      )}
    </div>
  );
};

export default Home;
