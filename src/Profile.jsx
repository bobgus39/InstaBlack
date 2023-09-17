import { useProfile } from "./hooks/api";

function Profile() {
  const { data, reload } = useProfile();

  if (!data || !data.data[0]) {
    return <div>Cargando...</div>;
  }

  console.log("user:", data.data);

  return (
    <div>
      <h3>{data.data[0].id}</h3>
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

export default Profile;
