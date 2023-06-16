import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";

const CreatePost = () => {
  const { dispatch } = useContext(AppContext);
  const [userInput, setUserInput] = useState("");

  const handleChange = (e) => {
    setUserInput(() => e.target.value);
  };

  const handleUserInput = () => {
    dispatch({ type: "CREATE_POST", payload: userInput });

    
  };

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <button onClick={handleUserInput}>Post</button>
    </div>
  );
};

export default CreatePost;
