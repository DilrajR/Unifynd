import './App.css';
import Home from './Home';
import Items from './Sale';
import AddItem from './AddItem';
import AddUser from './AddUser';
import Login from './Login';
import Profile from './Profile';
import { Route, Routes, BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <nav>
          <a href="/">Home</a> | 
          <a href="/Items">Items For Sale</a> | 
          <a href="/Profile">My Profile</a> | 
          <a href="/AddItem">Add Item</a> |
          <a href="/AddUser">Add User</a> |
          <a href="/login">Login</a>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Items" element={<Items />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/AddItem" element={<AddItem />} />
        <Route path="/AddUser" element={<AddUser />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
