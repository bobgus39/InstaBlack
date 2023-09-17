import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Posts from "./Posts";
import User from "./User";
import SearchInput from "./SearchInput";
import Profile from "./Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/">
        <Route index element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="posts" element={<Posts />}></Route>
        <Route path="user" element={<User />}></Route>
        <Route path="search" element={<SearchInput />}></Route>
        <Route path="profile" element={<Profile />}></Route>
      </Route>
    </>
  )
);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
