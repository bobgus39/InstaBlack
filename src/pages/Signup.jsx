import { useState } from "react";
import { Navigate } from "react-router-dom";

import "../App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { form } from "./Signup.module.css";
import { Button } from "react-bootstrap";

function Signup() {
  const [user, setUser] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    //errores Hacerlos aquí sin realizar el submit con extension yup o joi
    const data = await res.json();
    if (!res.ok) {
      setError(data?.error || "Error de registro");
    } else {
      setUser(data);
      localStorage.setItem("Usuario", JSON.stringify(data.username));
      console.log(data);
    }
  };

  if (user) return <Navigate to={"/login"} />;
  return (
    <main className="main">
      <form className={form} onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Bartolo23"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="form-label">Email:</label>
          <input
            type="text"
            className="form-control"
            placeholder="blackio34@instaBlack.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="form-label">Contraseña: </label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <Button variant="primary">Registrarse</Button>
        {error && <p className="error">{error}</p>}
      </form>
    </main>
  );
}

export default Signup;
