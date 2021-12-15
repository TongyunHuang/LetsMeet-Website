import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect } from 'react';
import ResponsiveAppBar from "./components/NavBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Friends from "./pages/Friends";
import AddPost from "./pages/AddPost";
import ProfilePost from "./pages/ProfilePost";
import ProfileEvent from "./pages/ProfileEvent";

function App() {
  useEffect(() => {
    document.title = "LetsMeet"
 }, []);

  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profilePost" element={<ProfilePost />} />
        <Route path="/profileEvent" element={<ProfileEvent />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profilePost/:id" element={<ProfilePost />} />
        <Route path="/profileEvent/:id" element={<ProfileEvent />} />
      </Routes>
    </div>
  );
}

export default App;
