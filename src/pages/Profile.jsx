import { useProfile } from "../hooks/api";
import Like from "../components/Like";
import { useParams } from "react-router-dom";

function Profile() {
  const { keyword } = useParams();
  console.log("user", keyword);
  const { data, reload } = useProfile(keyword);

  if (!data || !data.data[0]) {
    return <div>Cargando...</div>;
  }

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
