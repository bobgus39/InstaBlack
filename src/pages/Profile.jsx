import { useProfile } from "../hooks/api";
import Like from "../components/Like";
import { NavLink, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { formatDate } from "../hooks/formatDate";

function Profile() {
  const { keyword } = useParams();
  const [token] = useUser();
  const { data: posts, reload } = useProfile(keyword);
  const [error, setError] = useState("");

  if (!posts || !posts.data[0]) {
    return <div>Cargando...</div>;
  }

  const handleLike = async (postId) => {
    if (!token || !postId)
      return setError("No puedes dar like sin registrarte");
    const res = await fetch(`http://localhost:4000/posts/${postId}/likes`, {
      method: "POST",
      headers: { Authorization: token },
    });
    if (res.ok) {
      setError("");

      // Cargar datos actualizados después de dar like
      const updatedData = await reload(); // Supongo que reload() obtiene los datos actualizados
      if (updatedData) {
        // Actualizar el estado con los datos actualizados
        posts.data = updatedData;
      }
    }
  };

  return (
    <div className="profile">
      <ul>
        {posts.data.map((post) => (
          <li key={post.id}>
            <NavLink className="nav-link" to={`/profile/${post.username}`}>
              <h2> {post.username}</h2>
            </NavLink>
            <label onDoubleClick={() => handleLike(post.id)}>
              <img
                src={`http://localhost:4000/${post.photo}`}
                alt={`Imagen de ${post.username}`}
              />
            </label>
            <label onClick={() => handleLike(post.id)}>
              <Like liked={post.likedByMe} />
              {post.numLikes}{" "}
              <strong>
                {post.numLikes <= 1
                  ? `${
                      post.likedUsernames === null
                        ? "nadie"
                        : post.likedUsernames
                    } le ha dado me gusta`
                  : `${post.likedUsernames.split(",")[0]} y ${
                      post.numLikes - 1
                    } más han dado me gusta`}
              </strong>
            </label>
            <p>
              <NavLink className="nav-link" to={`/profile/${post.username}`}>
                <strong>{post.username}:</strong>
              </NavLink>
              {post.description}
            </p>
            <p>{formatDate(post.createdAt)}</p>
          </li>
        ))}
      </ul>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Profile;
