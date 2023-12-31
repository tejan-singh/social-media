import React, { useContext, useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import { useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import Header from "../Components/Header";
import Aside from "../Components/Aside";
import Post from "../Components/Post";

import styles from "./UserProfile.module.css";
import Loader from "../Components/Loader";
import ErrorPage from "../Pages/ErrorPage";
const UserProfile = () => {
  const { profileName } = useParams();

  const {
    appState: { allUsers, userProfile, loggedinUser, allPosts },
    dispatch,
    handleFollowUser,
    handleUnFollowUser,
  } = useContext(AppContext);

  const {
    _id,
    username,
    firstName,
    lastName,
    followers,
    following,
    profilePic,
    bio,
    portfolio,
  } = userProfile || {};

  const [profileLoading, setProfileLoading] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [userDetails, setUserDetails] = useState({
    bio: bio,
    portfolio: portfolio,
  });
  const [showEditPic, setShowEditPic] = useState(false);
  const [profilePicture, setProfilePicture] = useState(profilePic);
  const profileAvatars = [
    "https://i.postimg.cc/T3rpT00b/woman-3.png",
    "https://i.postimg.cc/d1DsZj24/woman-2.png",
    "https://i.postimg.cc/zXTgfqX3/woman-1.png",
    "https://i.postimg.cc/MKJnNgbw/hacker.png",
    "https://i.postimg.cc/k405rYZL/SAVE-20230702-183141.jpg",
    "https://i.postimg.cc/y8ZvsDk5/SAVE-20230702-183147.jpg",
  ];

  const [isRequested, setIsRequested] = useState(true);
  const [showErrorPage, setShowErrorPage] = useState(false);

  useEffect(() => {
    setUserDetails(() => ({
      bio: bio,
      portfolio: portfolio,
    }));
  }, [bio, portfolio]);

  const getUser = async () => {
    try {
      // const { _id } = allUsers?.find((user) => user.username === profileName);
      const response = await fetch(`/api/users/${profileName}`, {
        method: "GET",
      });
      const { user } = await response.json();
      if (user) {
        //this will set data in userProfile state which you will get from context and use in jsx
        dispatch({ type: "SET_USER", payload: user });
        setProfileLoading(false);
        setShowErrorPage(false);
      } else {
        setProfileLoading(false);
        setShowErrorPage(true);
      }
    } catch (error) {
      console.error(error);
      setProfileLoading(false);
      setShowErrorPage(true);
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
      profilePic: profilePicture,
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
    dispatch({ type: "SET_LOGGEDIN_USERPROFILE", payload: user });
    // localStorage.setItem("loggedInUserDetails", JSON.stringify(user));

    if (hasEdited === "bio") {
      setEditProfile(!editProfile);
      return;
    }

    if (hasEdited === "pic") {
      setShowEditPic(!showEditPic);
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

  const loggedInUserPosts = allPosts?.filter(
    ({ username }) => username === profileName
  );

  useEffect(() => {
    getUser();

    // allUsers dependency is required to load data when profile url is directly accessed
    // profileName dependency is required to replace currenct user data to show loggedin user profile
  }, [allUsers, profileName]);

  if (profileLoading) return <Loader />;
  if (showErrorPage) return <ErrorPage />;
  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Header />
      </div>

      <div className={styles.navigation}>
        <NavBar />
      </div>

      <div className={styles.main}>
        <img className={styles["profile-pic"]} src={profilePic} alt="profile" />
        <p className={styles.fullname}>{`${firstName} ${lastName}`}</p>
        <p className={styles.username}>@{username}</p>

        {!showEditPic && loggedinUser.username === username && (
          <button onClick={() => setShowEditPic(!showEditPic)}>
            Change picture
          </button>
        )}
        {!editProfile && loggedinUser.username === username && (
          <button onClick={handleEdit}>Edit profile</button>
        )}
        {showEditPic && (
          <section className={styles["popup-box"]}>
            <div className={styles["box"]}>
              <div className={styles.avatars}>
                {profileAvatars.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt="avatar"
                    onClick={() => {
                      setProfilePicture(avatar);
                    }}
                    // this will check if selected rendered image equals selected image and apply selection border to it
                    className={`${styles.profileAvatar} ${
                      avatar === profilePicture ? styles.selected : ""
                    }`}
                  />
                ))}
              </div>
              <button onClick={() => handleSave("pic")}>Save</button>
              <button onClick={() => setShowEditPic(false)}>Cancel</button>
            </div>
          </section>
        )}

        <p>{bio}</p>
        <a href={portfolio}>{portfolio}</a>

        {editProfile && (
          <div className={styles["popup-box"]}>
            <div className={styles.box}>
              <label htmlFor="">Bio:</label>
              <textarea
                type="text"
                value={userDetails.bio}
                name="bio"
                onChange={handleChange}
              />
              <label htmlFor="">Portfolio</label>
              <textarea
                type="text"
                value={userDetails.portfolio}
                name="portfolio"
                onChange={handleChange}
              />
              
              <button onClick={() => handleSave("bio")}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        )}

        <div className={styles["follow-section"]}>
          <p>Followers: {followers?.length}</p>
          <p>Following: {following?.length}</p>
        </div>
        {loggedinUser.username !== username && (
          <button
            onClick={
              isFollowing
                ? () => {
                    isRequested &&
                      handleUnFollowUser(dispatch, _id, setIsRequested);
                  }
                : () => {
                    isRequested &&
                      handleFollowUser(dispatch, _id, setIsRequested);
                  }
            }
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}

        {loggedInUserPosts.map((post) => (
          <Post {...post} key={post._id} fromHomePage />
        ))}
      </div>
      <div className={styles.aside}>
        <Aside />
      </div>
    </div>
  );
};

export default UserProfile;
