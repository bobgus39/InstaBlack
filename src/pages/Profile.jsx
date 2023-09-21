import { useProfile } from "../hooks/api";
import Like from "../components/Like";
import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";

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
    <div>
      <h1>Publicaciones</h1>
      <ul>
        {posts.data.map((post) => (
          <li key={post.id}>
            <h2>{post.description}</h2>
            <p>Usuario: {post.username}</p>
            <label onDoubleClick={() => handleLike(post.id)}>
              <img
                src={`http://localhost:4000/${post.photo}`}
                alt={`Imagen de ${post.username}`}
              />
            </label>
            <label onClick={() => handleLike(post.id)}>
              <Like />
              {post.numLikes}
            </label>
          </li>
        ))}
      </ul>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Profile;
