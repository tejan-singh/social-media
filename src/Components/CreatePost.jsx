import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import styles from "./CreatePost.module.css";

const CreatePost = () => {
  const { dispatch } = useContext(AppContext);
  const [userInput, setUserInput] = useState("");

  const handleChange = (e) => {
    setUserInput(() => e.target.value);
  };

  const createPost = async () => {
    try {
      const requestBody = { postData: { content: userInput } };
      const response = await fetch("/api/posts", {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("encodedToken"),
        },
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      dispatch({ type: "CREATE_POST", payload: data });
      setUserInput(() => "")
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={styles["input-form"]}>
      <textarea
        type="text"
        onChange={handleChange}
        className={styles["input-field"]}
        value={userInput}
        placeholder="write something interesting..."
      />
      <button onClick={createPost} className={styles["input-btn"]}>
        Post
      </button>
    </div>
  );
};

export default CreatePost;
