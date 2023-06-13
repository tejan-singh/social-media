import { Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";
import Home from "./Pages/Home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mockman" element={<Mockman />}/>
      </Routes>
    </div>
  );
}

export default App;
