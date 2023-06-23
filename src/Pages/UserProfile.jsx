import React, { useContext, useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const UserProfile = () => {
  const { profileName } = useParams();

  const {
    appState: {
      allUsers,
      userProfile: { _id, username, firstName, lastName, followers, following },
      loggedInUserProfile,
      loading,
    },
    dispatch,
  } = useContext(AppContext);

  const getUser = async () => {
    try {
      const { _id } = allUsers.find((user) => user.username === profileName);
      const response = await fetch(`/api/users/${_id}`, { method: "GET" });
      const { user } = await response.json();
      //this will set data in userProfile state which you will get from context and use in jsx
      dispatch({ type: "SET_USER", payload: user });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: "HIDE_LOADING" });
    }
  };

  const handleFollowUser = async () => {
    try {
      const response = await fetch(`/api/users/follow/${_id}`, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
      });
      const { followUser, user } = await response.json();
      dispatch({ type: "SET_USER", payload: followUser });
      dispatch({ type: "UPDATE_LOGGEDIN_USER_DETAILS", payload: user });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnFollowUser = async () => {
    try {
      const response = await fetch(`/api/users/unfollow/${_id}`, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
      });
      const { followUser, user } = await response.json();
      dispatch({ type: "SET_USER", payload: followUser });
      dispatch({ type: "UPDATE_LOGGEDIN_USER_DETAILS", payload: user });
    } catch (error) {
      console.error(error);
    }
  };

  // to check whether uses is present in following array
  // some method will return true/false
  const isFollowing =
    loggedInUserProfile.following &&
    loggedInUserProfile.following.some((user) => user._id === _id);

  console.log(isFollowing);
  useEffect(() => {
    getUser();
  }, [allUsers]);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
      <NavBar />
      <p>{`${firstName} ${lastName}`}</p>
      <p>@{username}</p>
      <p>Followers: {followers?.length}</p>
      <p>Following: {following?.length}</p>
      <button onClick={isFollowing ? handleUnFollowUser : handleFollowUser}>
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default UserProfile;
