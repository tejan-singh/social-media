import React, { useContext, useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const UserProfile = () => {
  const { profileName } = useParams();
  console.log(profileName);
  const {
    appState: {
      allUsers,
      userProfile: {
        _id,
        username,
        firstName,
        lastName,
        followers,
        following,
        profilePic,
        bio,
        portfolio,
      },
      loggedinUser,
    },
    dispatch,
  } = useContext(AppContext);

  const [profileLoading, setProfileLoading] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [userDetails, setUserDetails] = useState({
    bio: bio,
    portfolio: portfolio,
  });
  const [showEditPic, setShowEditPic] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const profileAvatars = [
    "https://i.postimg.cc/T3rpT00b/woman-3.png",
    "https://i.postimg.cc/d1DsZj24/woman-2.png",
    "https://i.postimg.cc/zXTgfqX3/woman-1.png",
    "https://i.postimg.cc/MKJnNgbw/hacker.png",
    "https://i.postimg.cc/k405rYZL/SAVE-20230702-183141.jpg",
    "https://i.postimg.cc/y8ZvsDk5/SAVE-20230702-183147.jpg",
  ];

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setEditProfile(!editProfile);
  };

  const handleSave = async (hasEdited) => {
    const userData = {
      _id,
      username,
      firstName,
      lastName,
      followers,
      following,
      profilePic:profilePicture,
      ...userDetails,
    };
    const response = await fetch("/api/users/edit", {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("encodedToken"),
      },
      body: JSON.stringify({ userData: userData }),
    });
    const { user } = await response.json();
    dispatch({ type: "SET_USER", payload: user });

    if (hasEdited === "bio"){
      setEditProfile(!editProfile);
      return;
    }

    if (hasEdited === "pic"){
      setShowEditPic(!showEditPic)
      return;
    }
    
  };

  const handleCancelEdit = () => {
    setEditProfile(!editProfile);
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
      <img src={profilePic} alt="profile" />
      {!showEditPic && (
        <button onClick={() => setShowEditPic(!showEditPic)}>
          Change picture
        </button>
      )}
      {showEditPic && (
        <section>
        
          {profileAvatars.map((avatar) => (
            <img
              src={avatar}
              alt="avatar"
              onClick={() => setProfilePicture(avatar)}
            />
          ))}
          <button onClick={() => handleSave("pic")}>Save</button>
        </section>
      )}
      {!editProfile && (
        <>
          <p>{bio}</p>
          <p>{portfolio}</p>
          <button onClick={handleEdit}>Edit profile</button>
        </>
      )}

      {editProfile && (
        <>
          <label htmlFor="">Bio:</label>
          <input
            type="text"
            value={userDetails.bio}
            name="bio"
            onChange={handleChange}
          />
          <label htmlFor="">Portfolio</label>
          <input
            type="text"
            value={userDetails.portfolio}
            name="portfolio"
            onChange={handleChange}
          />
          <button onClick={() => handleSave("bio")}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      )}

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
