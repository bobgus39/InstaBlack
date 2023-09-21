import { useState } from "react";
import { useProfile } from "../hooks/api";
import { useNavigate } from "react-router-dom";

function SearchInput() {
  const [keyword, setKeyword] = useState("");
  const { data: userPosts, reload } = useProfile(keyword);
  const navigate = useNavigate();

  const handleSearch = (username) => {
    setKeyword(username);
    // Navegar a la página de perfil utilizando la keyword
    navigate(`/profile/${username}`);
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
      {userPosts && userPosts.status !== "error" && keyword ? (
        <ul>
          {userPosts.data.map((user) => (
            <li key={user.id}>
              <button onClick={() => handleSearch(user.username)}>
                <h2>{user.username}</h2>
              </button>
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
