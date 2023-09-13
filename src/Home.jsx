import NewPost from "./NewPost";
import Posts from "./Posts";
import { useUser } from "./UserContext";
import { Navigate } from "react-router-dom";

function Home() {
  const [user] = useUser();
  if (!user) return <Navigate to="/login" />;
  return (
    <div>
      <Posts />
      <NewPost />
    </div>
  );
}

export default Home;
