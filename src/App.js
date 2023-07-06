import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Mockman from "mockman-js";
import Home from "./Pages/Home";
import "./App.css";
import Bookmarks from "./Pages/Bookmarks";
import Explore from "./Pages/Explore";
import Login from "./Pages/Login";
import UserProfile from "./Pages/UserProfile";
import RequiresAuth from "./Components/RequiresAuth";
import Signup from "./Pages/Signup";
import Landing from "./Pages/Landing";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            
              <Home />
            
          }
        />
        <Route path="/mockman" element={<Mockman />} />
        <Route
          path="/bookmarks"
          element={
            <RequiresAuth>
              <Bookmarks />
            </RequiresAuth>
          }
        />
        <Route
          path="/explore"
          element={
            <RequiresAuth>
              <Explore />
            </RequiresAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Landing/>}/>

        <Route
          path="/profile/:profileName"
          element={
            <RequiresAuth>
              <UserProfile />
            </RequiresAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
