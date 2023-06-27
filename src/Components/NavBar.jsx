import React, { useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
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
    dispatch,
  } = useContext(AuthContext);
  const getActiveStyle = ({ isActive }) => ({ color: isActive ? "red" : "" });

  const handleLogout = () => {
    dispatch({ type: "USER_LOGOUT" });
  };

  return (
    <nav>
      {isLoggedIn && (
        <NavLink to={"/"} style={getActiveStyle}>
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
