import { useState } from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

//hacerlo con una pagina aparte y la home sera la primera pagina

function Login() {
  const [user, setUser] = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState();
  //

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data?.error || "Error al iniciar sesión");
    } else {
      setUser(data.data.token);
      localStorage.setItem(
        "Usuario",
        JSON.stringify(data.data.tokenInfo.username)
      );
    }
  };

  if (user) return <Navigate to="/" />;

  return (
    <>
      <header>
        <h1>INSTABLACK</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="blackio34@instaBlack.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <Button variant="primary" type="submit">
          Entrar
        </Button>
      </form>
      <div>
        <h3>¿No tienes cuenta?</h3>
        <span>
          <NavLink to="/signup">Registrarse</NavLink>
        </span>
        <Outlet></Outlet>
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
}

export default Login;
