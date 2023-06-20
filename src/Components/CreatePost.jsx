import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";

const CreatePost = () => {
  const {dispatch} = useContext(AppContext)
  const [userInput, setUserInput] = useState("");

  const handleChange = (e) => {
    setUserInput(() => e.target.value);
  };

  const createPost = async () => {
    const requestBody = { postData: { content: userInput } };

    const response = await fetch("/api/posts", {
      headers:{
        "Content-Type": "application/json",
        authorization: localStorage.getItem("encodedToken")
      },
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    dispatch({type: 'CREATE_POST', payload: data})
  };

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <button onClick={createPost}>Post</button>
    </div>
  );
};

export default CreatePost;
