import Like from "./Like";
import { useHome } from "../hooks/api";
import { useUser } from "../context/UserContext";
import { useState } from "react";
import { postsClass, image } from "./PostsClass.module.css";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { formatDate } from "../helpers/formatDate";
import PostModal from "./PostModal";

function Posts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [token] = useUser(); // Token para la autorización
  const [error, setError] = useState("");
  const { data: posts, reload } = useHome();

  if (!posts) {
    return <div>Loading...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos.
  }

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  const handleLike = async (postId) => {
    if (!token || !postId) {
      return setError("No puedes dar like sin registrarte");
    }
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

  return (
    <div className={postsClass}>
      {error && <p className="error">{error}</p>}
      <NavLink to={`/`}>
        <div>
          <img
            className={image}
            src="data:image/png;base64,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"
            alt="logo instagram"
          ></img>
        </div>
      </NavLink>
      <ul>
        {posts.data.map((post) => (
          <li key={post.id}>
            <NavLink className="nav-link" to={`/profile/${post.username}`}>
              <h4> {post.username}</h4>
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
            <Button variant="primary" onClick={() => openModal(post)}>
              Ver detalles
            </Button>
          </li>
        ))}
      </ul>
      <PostModal
        isOpen={isModalOpen}
        onClose={closeModal}
        post={selectedPost}
      />
    </div>
  );
}

export default Posts;
