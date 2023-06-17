import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import CreatePost from "../Components/CreatePost";

const Home = () => {
  const {
    appState: { allPosts, loading, errorMsg, loggedinUser },
    dispatch,
  } = useContext(AppContext);

  if (loading) return <p>Loading...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;

  const likePost = async (_id) => {
    const response = await fetch(`/api/posts/like/${_id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("encodedToken"),
      },
      method: "POST",
    });

    const data = await response.json();
    dispatch({ type: "LIKE_POST", payload: data });
  };

  const dislikePost = async (_id) => {
    const response = await fetch(`/api/posts/dislike/${_id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("encodedToken"),
      },
      method: "POST",
    });

    const data = await response.json();
    dispatch({ type: "DISLIKE_POST", payload: data });
  };

  const deletePost = async (_id, username) => {
    
      const response = await fetch(`/api/posts/${_id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("encodedToken"),
        },
        method: "DELETE",
      });

      const data = await response.json();
      dispatch({ type: "DELETE_POST", payload: data });
    
  };

  return (
    <div>
      <h1>Social Media</h1>
      <CreatePost />
      {allPosts.map(
        ({
          _id,
          id,
          content,
          likes: { likeCount, likedBy },
          username,
          createdAt,
          updatedAt,
        }) => {
          /* on liking a post, it stores data of user who liked the post in likedBy array
            you check whether the loggedin username is stored in the liked user array to toggle button
          */
          const isLiked = likedBy.find(
            (person) => person.username === loggedinUser
          );
          return (
            <article key={id}>
              <p>{username}</p>
              <p>{content}</p>
              <p>{likeCount}</p>
              <button
                onClick={() => {
                  isLiked ? dislikePost(_id) : likePost(_id);
                }}
              >
                {isLiked ? "unlike" : "Like"}
              </button>

              {/*show delete button only for user logged in created posts*/}
              {loggedinUser === username && (
                <button onClick={() => deletePost(_id, username)}>
                  Delete
                </button>
              )}
              <p>Liked by:</p>
              {likedBy.map((person, index) => (
                <span key={index}>{person.username}</span>
              ))}

              <p>{createdAt}</p>
              <p>{updatedAt}</p>
            </article>
          );
        }
      )}
    </div>
  );
};

export default Home;
