import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Homepage from "./components/HomePage/Homepage";
import AddItem from "./components/AddPostPage/AddItem";
import AddUser from "./AddUser";
import Login from "./components/LoginPage/Login";
import Signup from "./components/SignupPage/Signup";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/ProfilePage/Profile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/AddItem" element={<AddItem />} />
        <Route path="/AddUser" element={<AddUser />} />
        <Route path="/Home" element={<Homepage />} />
        <Route path="/Nav" element={<Navbar />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();