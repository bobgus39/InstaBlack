import { useState } from "react";
import { useSearchUser } from "./hooks/api";

function SearchInput() {
  const [keyword, setKeyword] = useState("");
  const { data: userPosts, reload } = useSearchUser(keyword);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("keyWord:", keyword);

    // Perform any additional logic here if needed, but don't call hooks here.
  };
  console.log("user", userPosts);
  return (
    <div>
      <input
        type="text"
        placeholder="Username del usuario que quieres encontrar"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      {userPosts && userPosts.status != "error" ? (
        <ul>
          {userPosts.data.map((user) => (
            <li key={user.id}>
              <h2>{user.username}</h2>
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
