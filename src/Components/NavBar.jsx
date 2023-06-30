import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { AuthContext } from "../Context/AuthContext";

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
    localStorage.removeItem('encodedToken')
  };

  return (
    <nav>
      {isLoggedIn && (
        <NavLink to={"/home"} style={getActiveStyle}>
          Home ||
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink to="/explore" style={getActiveStyle}>
          Explore ||
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink to="/bookmarks" style={getActiveStyle}>
          Bookmarks ||
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink to={`/profile/${username}`} style={getActiveStyle}>
          My Profile ||
        </NavLink>
      )}
      {isLoggedIn && <NavLink onClick={handleLogout}>Logout ||</NavLink>}
    </nav>
  );
};

export default NavBar;
