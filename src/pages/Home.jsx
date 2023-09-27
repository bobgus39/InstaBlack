import Posts from "../components/Posts";

import { useUser } from "../context/UserContext";
import { Navigate } from "react-router-dom";

function Home() {
  const [user] = useUser();

  //if (!user) return <Navigate to="/login" />;
  return (
    <div>
      <Posts />
    </div>
  );
}

// si no hay user hacer navigate
export default Home;
