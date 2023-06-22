import React, { useContext, useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import {  useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const UserProfile = () => {
  const { profileName } = useParams();

  const {
    appState: {
      allUsers,
      userProfile: {_id, username, firstName, lastName, followers, following },
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
        method: 'POST',
        headers: {
          authorization: localStorage.getItem("encodedToken")
        }
        
      })
      const {followUser} = await response.json() 
      console.log(followUser)
      dispatch({ type: "SET_USER", payload: followUser });

    } catch (error) {
      console.error(error)
    }
  }

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
      <button onClick={handleFollowUser}>Follow</button>
    </div>
  );
};

export default UserProfile;
