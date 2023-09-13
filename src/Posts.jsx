import { useHome } from "./hooks/api";

function Posts() {
  const { data, reload } = useHome();

  if (!data) {
    return <div>Loading...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos.
  }

  return (
    <div>
      <h1>Publicaciones</h1>
      <ul>
        {data.data.map((post) => (
          <li key={post.id}>
            <h2>{post.description}</h2>
            <p>Usuario: {post.username}</p>
            <img
              src={`http://localhost:4000/${post.photo}`}
              alt={`Imagen de ${post.username}`}
            />
            <p>Número de likes: {post.numLikes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
