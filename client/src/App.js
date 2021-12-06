import "./App.css";
import { Route, Routes } from "react-router-dom";

import ResponsiveAppBar from "./components/NavBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Friends from "./pages/Friends";
import AddPost from "./pages/AddPost";

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/addpost" element={<AddPost />} />
      </Routes>
    </div>
  );
}

export default App;
