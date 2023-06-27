import { Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";
import Home from "./Pages/Home";
import "./App.css";
import Bookmarks from "./Pages/Bookmarks";
import Explore from "./Pages/Explore";
import Login from "./Pages/Login";
import UserProfile from "./Pages/UserProfile";
import RequiresAuth from "./Components/RequiresAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <RequiresAuth>
              <Home />
            </RequiresAuth>
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
