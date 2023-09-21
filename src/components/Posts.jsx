import Like from "./Like";
import { useHome } from "../hooks/api";
import { useUser } from "../context/UserContext";
import { useState } from "react";

function Posts() {
  const [token] = useUser(); // Token para la autorización
  const [error, setError] = useState("");
  const { data: posts, reload } = useHome();
  if (!posts) {
    return <div>Loading...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos.
  }

  const handleLike = async (postId) => {
    console.log("postId:", postId);
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

  // Link que envuelva el nombre y con el que puedas ir al perfil, pasando el ID
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
    </div>
  );
}

export default Posts;
