import SearchInput from "./SearchInput";
import NewPost from "./NewPost";
import Profile from "./Profile";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <div>
        <SearchInput />
        <NewPost />
        <NavLink to={"/profile"}>Perfil</NavLink>
      </div>
    </>
  );
}

export default Header;
