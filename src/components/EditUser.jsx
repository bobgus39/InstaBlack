import React, { useState } from "react";
import { editMain, noEditMain, form } from "./EditUser.module.css";
import { useUser } from "../context/UserContext";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";

export default function EditUser() {
  const pathName = window.location.pathname;
  const pathParts = pathName.split("/");

  const [edit, setEdit] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user] = useUser();

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("username", username);
    formData.append("password", password);

    try {
      const res = await fetch(
        `http://localhost:4000/users/edit?oldUsername=${
          pathParts[pathParts.length - 1]
        }`,
        {
          method: "POST",
          headers: { authorization: user },
          body: formData,
        }
      );

      if (res) {
        setEdit(false);

        return <Navigate to="/login"></Navigate>;
      } else {
        console.error("Error al editar el usuario");
        // Puedes mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error("Error de red", error);
      // Puedes mostrar un mensaje de error de red al usuario
    }
  };

  return (
    <div className={user ? editMain : noEditMain}>
      <label
        onClick={() => setEdit(false)}
        className={edit ? form : noEditMain}
      >
        X
      </label>
      <Button
        variant="primary"
        onClick={handleEdit}
        className={edit ? noEditMain : " "}
      >
        Editar
      </Button>
      <form className={edit ? form : noEditMain} onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Nuevo Avatar:</label>
          <input
            className="form-control"
            type="file"
            accept="image/"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>
        <div>
          <label className="form-label">Nuevo Usuario:</label>
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Nueva Contraseña:</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit">Editar</Button>
      </form>
    </div>
  );
}
