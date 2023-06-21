import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
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
      <NavLink to="/profile" style={getActiveStyle}>
        User Profile ||
      </NavLink>
    </nav>
  );
};

export default NavBar;
