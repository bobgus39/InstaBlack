import SearchInput from "./SearchInput";
import NewPost from "./NewPost";

import { NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <div>
        <SearchInput />
        <NewPost />
        <NavLink to={`/profile/${JSON.parse(localStorage.getItem("Usuario"))}`}>
          Perfil
        </NavLink>
      </div>
    </>
  );
}

export default Header;
