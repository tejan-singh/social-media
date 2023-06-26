import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";

const Post = ({
  _id,
  id,
  content,
  likes,
  username,
  createdAt,
  updatedAt,
  fromHomePage,
}) => {
  const {
    appState: { allPosts, loggedinUser, bookmarks },
    dispatch,
  } = useContext(AppContext);

  const [editId, setEditId] = useState(null);
  const [updatedContent, setUpdatedContent] = useState({ content: "" });

  const likePost = async (_id) => {
    try {
      const response = await fetch(`/api/posts/like/${_id}`, {
        headers: {
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
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      dispatch({ type: "EDIT_POST", payload: data });
      setEditId(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const bookmarkPost = async (_id) => {
    try {
      const response = await fetch(`/api/users/bookmark/${_id}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
      });

      const { bookmarks } = await response.json();
      dispatch({
        type: "BOOKMARK_POST",
        payload: { data: bookmarks, id: _id },
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const removeBookmark = async (_id) => {
    try {
      const response = await fetch(`/api/users/remove-bookmark/${_id}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
      });

      const { bookmarks } = await response.json();
      dispatch({
        type: "REMOVE_BOOKMARK_POST",
        payload: { data: bookmarks, id: _id },
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  //on liking a post, it stores data of user who liked the post in likedBy array, you check whether the loggedin username is stored in the liked user array to toggle like button

  // liked is not getting passed for bookmarks, so we use optional chaining to check if likes not present then return undefined
  const isLiked = likes?.likedBy.find(
    (person) => person.username === loggedinUser.username
  );

  const isBookmark =
    bookmarks.length > 0 && bookmarks.some((post) => post._id === _id);

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
          <Link to={`/profile/${username}`}>{username}</Link>
          <p>{content}</p>
          {fromHomePage && (
            <>
              <p>{likes.likeCount}</p>
              <button
                onClick={() => {
                  isLiked ? dislikePost(_id) : likePost(_id);
                }}
              >
                {isLiked ? "unlike" : "Like"}
              </button>
            </>
          )}

          {/*show delete button only for user logged in created posts*/}
          {loggedinUser.username === username && (
            <button onClick={() => deletePost(_id)}>Delete</button>
          )}
          {loggedinUser.username === username && (
            <button onClick={() => handleEditPost(_id)}>Edit</button>
          )}
          {loggedinUser.username !== username && (
            <button
              onClick={() => {
                isBookmark ? removeBookmark(_id) : bookmarkPost(_id);
              }}
            >
              {isBookmark ? "remove bookmark" : "bookmark"}
            </button>
          )}
          {fromHomePage && (
            <>
              <p>Liked by:</p>
              {likes.likedBy.map((person, index) => (
                <span key={index}>{person.username}</span>
              ))}
            </>
          )}

          <p>{createdAt}</p>
          <p>{updatedAt}</p>
        </>
      )}
    </article>
  );
};

export default Post;
