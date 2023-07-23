import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import styles from "./Post.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faTrash,
  faFilePen,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
const Post = ({
  _id,
  id,
  content,
  likes,
  username,
  createdAt,
  updatedAt,
  fromHomePage,
  firstName,
  lastName,
  profilePic,
}) => {
  const {
    appState: { allPosts, loggedinUser, bookmarks },
    dispatch,
  } = useContext(AppContext);

  const [editId, setEditId] = useState(null);
  const [updatedContent, setUpdatedContent] = useState({ content: "" });
  const [isRequested, setIsRequested] = useState(true);

  const likePost = async (_id) => {
    try {
      setIsRequested((prev) => !prev);
      const response = await fetch(`/api/posts/like/${_id}`, {
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
        method: "POST",
      });
      const data = await response.json();
      dispatch({ type: "LIKE_POST", payload: data });
      setIsRequested((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const dislikePost = async (_id) => {
    try {
      setIsRequested((prev) => !prev);

      const response = await fetch(`/api/posts/dislike/${_id}`, {
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
        method: "POST",
      });

      const data = await response.json();
      dispatch({ type: "DISLIKE_POST", payload: data });
      setIsRequested((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (_id) => {
    try {
      setIsRequested((prev) => !prev);

      const response = await fetch(`/api/posts/${_id}`, {
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
        method: "DELETE",
      });

      const data = await response.json();
      dispatch({ type: "DELETE_POST", payload: data });
      setIsRequested((prev) => !prev);
    } catch (error) {
      console.error(error);
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
      setIsRequested((prev) => !prev);

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
      setIsRequested((prev) => !prev);
    } catch (error) {
      console.log(error.message);
    }
  };

  const bookmarkPost = async (_id) => {
    try {
      setIsRequested((prev) => !prev);

      const response = await fetch(`/api/users/bookmark/${_id}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
      });

      const { bookmarks } = await response.json();
      dispatch({
        type: "BOOKMARK_POST",
        payload: { data: bookmarks, id: _id },
      });
      setIsRequested((prev) => !prev);
    } catch (error) {
      console.error(error.message);
    }
  };

  const removeBookmark = async (_id) => {
    try {
      setIsRequested((prev) => !prev);

      const response = await fetch(`/api/users/remove-bookmark/${_id}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
      });

      const { bookmarks } = await response.json();
      dispatch({
        type: "REMOVE_BOOKMARK_POST",
        payload: { data: bookmarks, id: _id },
      });
      setIsRequested((prev) => !prev);
    } catch (error) {
      console.error(error.message);
    }
  };

  //on liking a post, it stores data of user who liked the post in likedBy array, you check whether the loggedin username is stored in the liked user array to toggle like button

  // liked is not getting passed for bookmarks, so we use optional chaining to check if likes not present then return undefined
  const isLiked = likes?.likedBy.find(
    (person) => person.username === loggedinUser.username
  );

  const getFormattedDate = () => {
    const dateString = updatedAt;
    const date = new Date(dateString);
    const result = format(date, "dd-MMM-yyyy");
    return result;
  };

  const isBookmark =
    bookmarks.length > 0 && bookmarks.some((post) => post._id === _id);

  return (
    <article key={id} className={styles["post-container"]}>
      {_id === editId ? (
        <div className={styles["popup-box"]}>
          <div className={styles.box}>
            <p>Edit your post</p>
            <textarea
              type="text"
              value={updatedContent.content}
              onChange={handleChange}
              name="content"
            />
            <button onClick={editPost}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <Link to={`/profile/${username}`} className={styles["user-details"]}>
            <img className={styles.profilePic} src={profilePic} alt="" />
            <div>
              <p
                className={styles["full-name"]}
              >{`${firstName} ${lastName}`}</p>
              <p className={styles.username}>{`@${username}`}</p>
            </div>
            {/** to get date in proper format call and render the function */}
            <p>{getFormattedDate()}</p>
          </Link>

          <p className={styles.content}>{content}</p>

          <div className={styles["buttons-container"]}>
            {fromHomePage && (
              <>
                <i
                  onClick={() => {
                    // isRequested is a loading state set to prevent multiple request sent
                    isRequested && (isLiked ? dislikePost(_id) : likePost(_id));
                  }}
                >
                  {isLiked ? (
                    <FontAwesomeIcon
                      icon={faHeart}
                      className={styles.highlight}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faHeart} />
                  )}

                  <span className={styles.likes}>
                    {likes.likeCount > 0 && likes.likeCount}
                  </span>
                </i>
              </>
            )}

            {/*show delete button only for user logged in created posts*/}
            {loggedinUser.username === username && (
              <i onClick={() => isRequested && deletePost(_id)}>
                <FontAwesomeIcon icon={faTrash} />
              </i>
            )}
            {loggedinUser.username === username && (
              <i onClick={() => isRequested && handleEditPost(_id)}>
                <FontAwesomeIcon icon={faFilePen} />
              </i>
            )}
            {loggedinUser.username !== username && (
              <i
                onClick={() => {
                  isRequested &&
                    (isBookmark ? removeBookmark(_id) : bookmarkPost(_id));
                }}
              >
                {isBookmark ? (
                  <FontAwesomeIcon
                    icon={faBookmark}
                    className={styles.highlight}
                  />
                ) : (
                  <FontAwesomeIcon icon={faBookmark} />
                )}
              </i>
            )}
          </div>
        </>
      )}
    </article>
  );
};

export default Post;
