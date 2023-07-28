import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import styles from "./CreatePost.module.css";


const CreatePost = () => {
  const {
    appState: { loggedinUser },
    createPost,
  } = useContext(AppContext);
  const [userInput, setUserInput] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  const handleChange = (e) => {
    setUserInput(() => e.target.value);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "s51lvs9t");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dg1rsn2vy/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const { secure_url } = await response.json();

    console.log(secure_url);
    setSelectedImageUrl(() => secure_url);
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
        {/* <input type="file" onChange={(e) => uploadImage(e.target.files[0])} /> */}
        <div className={styles["btn-container"]}>
          <button
            onClick={() => createPost(userInput, setUserInput, selectedImageUrl)}
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
