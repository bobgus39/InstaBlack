import NewPost from "./NewPost";
import Posts from "./Posts";

import { useUser } from "./userContext";
import { NavLink } from "react-router-dom";

function Home() {
  const [user] = useUser();

  if (!user) return <Navigate to="/login" />;
  return (
    <div>
      <NavLink to="/Search">Buscar</NavLink>
      <NewPost />
      <Posts />
    </div>
  );
}

export default Home;
