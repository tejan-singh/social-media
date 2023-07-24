import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import styles from "./CreatePost.module.css";

const CreatePost = () => {
  const {
    appState: { loggedinUser },
    createPost
  } = useContext(AppContext);
  const [userInput, setUserInput] = useState("");

  const handleChange = (e) => {
    setUserInput(() => e.target.value);
  };

  return (
    <div className={styles["input-form-main"]}>
      <div>
        <img
          className={styles.profilePic}
          src={loggedinUser.profilePic}
          alt="user-profile-pic"
        />
      </div>
      <div className={styles["input-form"]}>
        <textarea
          type="text"
          onChange={handleChange}
          className={styles["input-field"]}
          value={userInput}
          placeholder="write something interesting..."
        />
        <div className={styles["btn-container"]}>
          <button
            onClick={() => createPost(userInput, setUserInput)}
            className={
              //trim will check if user has entered any empty space without content
              !userInput.trim()
                ? `${styles["input-btn"]} ${styles["blur"]}`
                : styles["input-btn"]
            }
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
