import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import CreatePost from "../Components/CreatePost";
import { useState } from "react";

const Home = () => {
  const {
    appState: { allPosts, loading, errorMsg, loggedinUser },
    dispatch,
  } = useContext(AppContext);

  const [editId, setEditId] = useState(null);
  const [updatedContent, setUpdatedContent] = useState({ content: "" });

  if (loading) return <p>Loading...</p>;
  if (errorMsg) return <p>{errorMsg}</p>;

  const likePost = async (_id) => {
    try {
      const response = await fetch(`/api/posts/like/${_id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("encodedToken"),
        },
        method: "POST",
      });

      const data = await response.json();
      dispatch({ type: "LIKE_POST", payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  const dislikePost = async (_id) => {
    try {
      const response = await fetch(`/api/posts/dislike/${_id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("encodedToken"),
        },
        method: "POST",
      });

      const data = await response.json();
      dispatch({ type: "DISLIKE_POST", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (_id) => {
    try {
      const response = await fetch(`/api/posts/${_id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("encodedToken"),
        },
        method: "DELETE",
      });

      const data = await response.json();
      dispatch({ type: "DELETE_POST", payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditPost = (_id) => {
    const { content } = allPosts.find((post) => post._id === _id);
    setUpdatedContent((prev) => ({ ...prev, content: content }));
    setEditId(_id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setEditId(null);
  };

  const editPost = async () => {
    try {
      const requestBody = { postData: updatedContent };
      const response = await fetch(`/api/posts/edit/${editId}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      dispatch({ type: "EDIT_POST", payload: data });
      setEditId(null);
    } catch (error) {
      console.log(error.message);
    }
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
          /* on liking a post, it stores data of user who liked the post in likedBy array,
            you check whether the loggedin username is stored in the liked user array to toggle like button
          */
          const isLiked = likedBy.find(
            (person) => person.username === loggedinUser
          );
          return (
            <article key={id}>
              {_id === editId ? (
                <>
                  <p>{username}</p>
                  <input
                    type="text"
                    value={updatedContent.content}
                    onChange={handleChange}
                    name="content"
                  />
                  <button onClick={editPost}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
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
                    <button onClick={() => deletePost(_id)}>Delete</button>
                  )}
                  {loggedinUser === username && (
                    <button onClick={() => handleEditPost(_id)}>Edit</button>
                  )}
                  <p>Liked by:</p>
                  {likedBy.map((person, index) => (
                    <span key={index}>{person.username}</span>
                  ))}

                  <p>{createdAt}</p>
                  <p>{updatedAt}</p>
                </>
              )}
            </article>
          );
        }
      )}
    </div>
  );
};

export default Home;
