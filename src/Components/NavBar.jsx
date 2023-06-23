import React, { useContext} from "react";
import { NavLink, useParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const NavBar = () => {
  const {appState: {loggedinUser:{username}}} = useContext(AppContext)
  const getActiveStyle = ({ isActive }) => ({ color: isActive ? "red" : "" });
  return (
    <nav>
      <NavLink to={"/"} style={getActiveStyle}>
        Home ||
      </NavLink>
      <NavLink to="/explore" style={getActiveStyle}>
        Explore ||
      </NavLink>
      <NavLink to="/bookmarks" style={getActiveStyle}>
        Bookmarks ||
      </NavLink>
      <NavLink to="/login" style={getActiveStyle}>
        Login ||
      </NavLink>
      <NavLink to={`/profile/${username}`} style={getActiveStyle}>
        My Profile ||
      </NavLink>
    </nav>
  );
};

export default NavBar;
