import { Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";
import Home from "./Pages/Home";
import "./App.css";
import Bookmarks from "./Pages/Bookmarks";
import Explore from "./Pages/Explore";
import Login from "./Pages/Login";
import UserProfile from "./Pages/UserProfile";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";

function App() {
  const {appState: {loggedinUser}} = useContext(AppContext)

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path='/profile/:profileName' element={<UserProfile />} />
        
        {/* <Route path={`/profile/:${loggedinUser ? loggedinUser : ':profileName'}`} element={<UserProfile />} /> */}
      </Routes>
    </div>
  );
}

export default App;
