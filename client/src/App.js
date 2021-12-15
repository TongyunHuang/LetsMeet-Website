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
import RequireAuth from "./RequireAuth"

function App() {
  useEffect(() => {
    document.title = "LetsMeet"
 }, []);

  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/friends" element={<RequireAuth><Friends /></RequireAuth>} />
        <Route path="/addpost" element={<RequireAuth><AddPost /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="/profilePost" element={<RequireAuth><ProfilePost /></RequireAuth>} />
        <Route path="/profileEvent" element={<RequireAuth><ProfileEvent /></RequireAuth>} />
        <Route path="/profile/:id" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="/profilePost/:id" element={<RequireAuth><ProfilePost /></RequireAuth>} />
        <Route path="/profileEvent/:id" element={<RequireAuth><ProfileEvent /></RequireAuth>} />
      </Routes>
    </div>
  );
}

export default App;
