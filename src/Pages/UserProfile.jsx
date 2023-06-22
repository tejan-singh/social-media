import React, { useContext, useEffect } from "react";
import NavBar from "../Components/NavBar";
import { useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const UserProfile = () => {
  const { profileName } = useParams();
  const {
    appState: { allUsers, userProfile },
    dispatch,
  } = useContext(AppContext);

  const getUserId = async () => {
    try {
      const { _id } = allUsers.find((user) => user.username === profileName);
      const response = await fetch(`/api/users/${_id}`, { method: "GET" });
      const { user } = await response.json();
      dispatch({ type: "SET_USER", payload: user });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: "HIDE_LOADING" });
    }
  };

  useEffect(() => {
    getUserId();
  }, [allUsers]);

  return (
    <div>
      <NavBar />
      {userProfile.username}
    </div>
  );
};

export default UserProfile;
