import { useState } from "react";
import { useSearchUser } from "../hooks/api";
import { Link } from "react-router-dom";

function SearchInput() {
  const [keyword, setKeyword] = useState("");
  const { data: userPosts, reload } = useSearchUser(keyword);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username del usuario que quieres encontrar"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      {userPosts && userPosts.status != "error" && keyword ? (
        <ul>
          {userPosts.data.map((user) => (
            <li key={user.id}>
              <Link to={`/profile/${user.username}`}>
                <h2>{user.username}</h2>
              </Link>
            </li>
          ))}
        </ul>
      ) : !keyword ? (
        "¿A quién queres encontrar?"
      ) : (
        <p>{userPosts.message}</p>
      )}
    </div>
  );
}

export default SearchInput;
