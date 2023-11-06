import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Posts from "./components/Posts";
import User from "./User";
import SearchInput from "./components/SearchInput";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import { Footer } from "./components/Footer";

function App() {
  const pathElement = window.location.pathname;

  return (
    <Router className="container">
      <div
        className={
          pathElement === "/login" || pathElement === "/signup"
            ? ""
            : "grid-container"
        }
      >
        {/*pathElement === "/login" ||
        pathElement === "/signup" ||
        pathElement === "/profile/" ? null : (
          <Header className="header"></Header>
        )*/}

        <Routes className="main">
          <Route path="/" element={<Outlet />}>
            <Route index element={<Home />} />
            <Route path="posts" element={<Posts />} />
            <Route path="user" element={<User />} />
            <Route
              path="search"
              element={<SearchInput className="searchInput" />}
            />

            <Route path="profile/:keyword" element={<Profile />} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>

        {/*pathElement === "/login" || pathElement === "/signup" ? null : (
          <SearchInput className="searchInput" />
        )*/}
      </div>
    </Router>
  );
}

export default App;
