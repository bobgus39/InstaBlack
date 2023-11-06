import { useProfile } from "../hooks/api";
import Like from "../components/Like";
import { NavLink, useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { formatDate } from "../helpers/formatDate";
import Header from "../components/Header";
import EditUser from "../components/EditUser";

function Profile() {
  const { keyword } = useParams();
  const [token] = useUser();
  const { data: posts, reload } = useProfile(keyword);
  const [error, setError] = useState("");
  const username = JSON.parse(localStorage.getItem("Usuario"));

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
      const updatedData = await reload();
      if (updatedData) {
        // Actualizar el estado con los datos actualizados
        posts.data = updatedData;
      }
    }
  };

  if (!posts) {
    return <div>Cargando...</div>;
  }
  if (!posts.data || posts.data.length === 0) {
    return <div>No posts available</div>;
  }

  return (
    <>
      <Header />
      <div className="profile">
        <ul>
          {posts.data.map((post) => (
            <li key={post.id} className="photoProfileLi">
              <NavLink className="nav-link" to={`/profile/${post.username}`}>
                <h4>
                  <img
                    className="imgProfile"
                    src={`http://localhost:4000/${post.avatar}`}
                    alt={`Imagen de ${post.username}`}
                  />{" "}
                  {post.username}{" "}
                </h4>
              </NavLink>
              {post.username != "bot1Black" ? (
                <label onDoubleClick={() => handleLike(post.id)}>
                  <img
                    src={`http://localhost:4000/${post.photo}`}
                    alt={`Imagen de ${post.username}`}
                  />
                </label>
              ) : (
                <label onDoubleClick={() => handleLike(post.id)}>
                  <img
                    src={`http://localhost:4000/${post.avatar}`}
                    alt={`Imagen de ${post.username}`}
                  />
                </label>
              )}
              <label onClick={() => handleLike(post.id)}>
                <Like liked={post.likedByMe} />{" "}
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
      {username === posts.data[0].username ? <EditUser /> : " "}
    </>
  );
}

export default Profile;
