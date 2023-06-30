import React, { useContext, useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const UserProfile = () => {
  const { profileName } = useParams();
  console.log(profileName)
  const {
    appState: {
      allUsers,
      userProfile: { _id, username, firstName, lastName, followers, following },
      loggedinUser,
    },
    dispatch,
  } = useContext(AppContext);

  const [profileLoading, setProfileLoading] = useState(true);

  const getUser = async () => {
    try {
      const { _id } = allUsers.find((user) => user.username === profileName);
      const response = await fetch(`/api/users/${_id}`, { method: "GET" });
      const { user } = await response.json();
      //this will set data in userProfile state which you will get from context and use in jsx
      dispatch({ type: "SET_USER", payload: user });
      setProfileLoading(false);
    } catch (error) {
      console.error(error);
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
    loggedinUser.following &&
    loggedinUser.following.some((user) => user._id === _id);

  useEffect(() => {
    getUser();

    // allUsers dependency is required to load data when profile url is directly accessed
    // profileName dependency is required to replace currenct user data to show loggedin user profile
  }, [allUsers, profileName]);

  if (profileLoading) return <p>Loading...</p>;
  return (
    <div>
      <NavBar />
      <p>{`${firstName} ${lastName}`}</p>
      <p>@{username}</p>
      <p>Followers: {followers?.length}</p>
      <p>Following: {following?.length}</p>
      {loggedinUser.username !== username && (
        <button onClick={isFollowing ? handleUnFollowUser : handleFollowUser}>
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default UserProfile;
