import Header from "./Header";
import Posts from "./Posts";

import { useUser } from "./userContext";
import { Navigate } from "react-router-dom";

function Home() {
  const [user] = useUser();

  if (!user) return <Navigate to="/login" />;
  return (
    <div>
      <Header />
      <Posts />
    </div>
  );
}

export default Home;
