import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { AuthContext } from "../Context/AuthContext";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const {
    appState: {
      loggedinUser: { username },
    },
  } = useContext(AppContext);
  const {
    authState: { isLoggedIn },
    authDispatch,
  } = useContext(AuthContext);
  const getActiveStyle = ({ isActive }) => ({ color: isActive ? "red" : "" });

  const handleLogout = () => {
    authDispatch({ type: "USER_LOGOUT" });
    //this will delete token from local storage
    localStorage.removeItem("encodedToken");
    localStorage.removeItem("loggedInUserDetails");
  };

  return (
    <nav className={styles["nav-bar"]}>
      {isLoggedIn && (
        <NavLink to={"/"} style={getActiveStyle} className={styles["nav-link"]}>
          Home 
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink
          to="/explore"
          style={getActiveStyle}
          className={styles["nav-link"]}
        >
          Explore 
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink
          to="/bookmarks"
          style={getActiveStyle}
          className={styles["nav-link"]}
        >
          Bookmarks 
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink
          to={`/profile/${username}`}
          style={getActiveStyle}
          className={styles["nav-link"]}
        >
          My Profile 
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink onClick={handleLogout} className={`${styles["nav-link"]} ${styles["logout-btn"]}`}>
          Logout 
        </NavLink>
      )}
    </nav>
  );
};

export default NavBar;
