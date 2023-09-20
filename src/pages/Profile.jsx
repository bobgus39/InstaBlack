import { useProfile } from "../hooks/api";
import Like from "../components/Like";

function Profile() {
  //const username = url.pathname.split("/").pop();
  //console.log("username:", username);
  const { data, reload } = useProfile();

  if (!data || !data.data[0]) {
    return <div>Cargando...</div>;
  }

  console.log("user:", data);
  //condicional ternario para que

  return (
    <div>
      <h3>{data.data[0].id}</h3>
      <ul>
        {data.data.map((postUser) => (
          <li key={postUser.id}>
            <h2>{postUser.description}</h2>
            <p>Usuario: {postUser.username}</p>
            <img
              src={`http://localhost:4000/${postUser.photo}`}
              alt={`Imagen de ${postUser.username}`}
            />
            <p>
              <Like /> {postUser.numLikes}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
